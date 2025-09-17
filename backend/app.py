from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os
import random
import string

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/astrochat')

mongo = PyMongo(app)
CORS(app)

# Collections
users = mongo.db.users
chat_sessions = mongo.db.chat_sessions

def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))

def generate_astrology_response(user_message):
    """Generate AI astrology responses"""
    responses = [
        "The stars are aligning beautifully for you today! ✨ Your energy is particularly strong in matters of the heart.",
        "I sense great potential in your future. The planets suggest a period of growth and new opportunities ahead. 🌟",
        "Your zodiac sign indicates you're entering a transformative phase. Embrace the changes coming your way! 🌙",
        "The cosmic energy around you suggests it's time to trust your intuition. What does your heart tell you? 💫",
        "I see abundance flowing into your life soon. Stay open to unexpected blessings from the universe. 🪐",
        "Your birth chart reveals strong creative energies. Now is the perfect time to pursue your artistic passions! 🎨",
        "The moon phases suggest you should focus on self-care and inner reflection this week. 🌙",
        "Mercury is in a favorable position for communication. It's a great time to have important conversations. 💬",
    ]
    return random.choice(responses)

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Check if user already exists
        if users.find_one({'email': email}):
            return jsonify({'error': 'User already exists'}), 400
        
        # Generate verification code
        verification_code = generate_verification_code()
        
        # Hash password
        password_hash = generate_password_hash(password)
        
        # Create user
        user_data = {
            'email': email,
            'password_hash': password_hash,
            'verification_code': verification_code,
            'is_verified': False,
            'created_at': datetime.datetime.utcnow()
        }
        
        result = users.insert_one(user_data)
        
        # In production, send email with verification code
        # For demo, return the code (remove in production)
        return jsonify({
            'message': 'User registered successfully',
            'verification_code': verification_code,  # Remove in production
            'user_id': str(result.inserted_id)
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user
        user = users.find_one({'email': email})
        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        if not user.get('is_verified', False):
            # Generate new verification code
            verification_code = generate_verification_code()
            users.update_one(
                {'_id': user['_id']},
                {'$set': {'verification_code': verification_code}}
            )
            return jsonify({
                'error': 'Email not verified',
                'verification_code': verification_code  # Remove in production
            }), 403
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': str(user['_id']),
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user_id': str(user['_id'])
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/verify', methods=['POST'])
def verify_email():
    try:
        data = request.get_json()
        email = data.get('email')
        code = data.get('code')
        
        if not email or not code:
            return jsonify({'error': 'Email and verification code are required'}), 400
        
        # Find user and verify code
        user = users.find_one({'email': email, 'verification_code': code})
        if not user:
            return jsonify({'error': 'Invalid verification code'}), 400
        
        # Update user as verified
        users.update_one(
            {'_id': user['_id']},
            {'$set': {'is_verified': True, 'verification_code': None}}
        )
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': str(user['_id']),
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'Email verified successfully',
            'token': token,
            'user_id': str(user['_id'])
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get token from header
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token provided'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            # Decode token
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = payload['user_id']
            
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        data = request.get_json()
        message = data.get('message')
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Generate AI response
        ai_response = generate_astrology_response(message)
        
        # Save chat session
        chat_data = {
            'user_id': user_id,
            'user_message': message,
            'ai_response': ai_response,
            'timestamp': datetime.datetime.utcnow()
        }
        
        chat_sessions.insert_one(chat_data)
        
        return jsonify({
            'response': ai_response,
            'timestamp': datetime.datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat/history', methods=['GET'])
def chat_history():
    try:
        # Get token from header
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'No token provided'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            # Decode token
            payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            user_id = payload['user_id']
            
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        # Get chat history
        history = list(chat_sessions.find(
            {'user_id': user_id},
            {'_id': 0}
        ).sort('timestamp', 1))
        
        return jsonify({'history': history}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.datetime.utcnow().isoformat()}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
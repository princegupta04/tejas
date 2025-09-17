from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime
import os
import random
import string
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

CORS(app)

# In-memory storage for development (use MongoDB/DB in production)
otp_storage = {}
users_storage = {}
chat_sessions_storage = []

def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))

def send_sms_otp(mobile, otp):
    """Mock SMS service - replace with actual SMS API integration like Twilio"""
    print(f"SMS sent to {mobile}: Your AstroChat verification code is {otp}")
    # In production, integrate with SMS service:
    # - Twilio: client.messages.create(body=f"Your code is {otp}", from_="+1234567890", to=mobile)
    # - AWS SNS, Firebase, etc.
    return True

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

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    try:
        data = request.get_json()
        mobile = data.get('mobile')
        
        if not mobile:
            return jsonify({'error': 'Mobile number is required'}), 400
        
        # Validate mobile number format
        if not mobile.isdigit() or len(mobile) != 10:
            return jsonify({'error': 'Invalid mobile number format'}), 400
        
        # Generate OTP
        otp = generate_verification_code()
        
        # Store OTP with expiration (5 minutes)
        otp_storage[mobile] = {
            'otp': otp,
            'expires_at': time.time() + 300,  # 5 minutes
            'attempts': 0
        }
        
        # Send SMS (mock implementation)
        send_sms_otp(mobile, otp)
        
        return jsonify({
            'message': 'OTP sent successfully',
            'otp': otp  # Remove in production
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    try:
        data = request.get_json()
        mobile = data.get('mobile')
        code = data.get('code')
        
        if not mobile or not code:
            return jsonify({'error': 'Mobile number and OTP are required'}), 400
        
        # Check if OTP exists and is valid
        if mobile not in otp_storage:
            return jsonify({'error': 'OTP not found or expired'}), 400
        
        stored_otp_data = otp_storage[mobile]
        
        # Check expiration
        if time.time() > stored_otp_data['expires_at']:
            del otp_storage[mobile]
            return jsonify({'error': 'OTP has expired'}), 400
        
        # Check OTP
        if stored_otp_data['otp'] != code:
            stored_otp_data['attempts'] += 1
            if stored_otp_data['attempts'] >= 3:
                del otp_storage[mobile]
                return jsonify({'error': 'Too many failed attempts. Please request a new OTP'}), 400
            return jsonify({'error': 'Invalid OTP'}), 400
        
        # OTP verified successfully
        del otp_storage[mobile]
        
        # Find or create user
        user_id = f"user_{mobile}"
        if user_id not in users_storage:
            # Create new user
            users_storage[user_id] = {
                'user_id': user_id,
                'mobile': mobile,
                'is_verified': True,
                'profile_complete': False,
                'created_at': datetime.datetime.utcnow().isoformat()
            }
        else:
            # Update existing user
            users_storage[user_id]['is_verified'] = True
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user_id,
            'mobile': mobile,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'OTP verified successfully',
            'token': token,
            'user_id': user_id,
            'profile_complete': users_storage[user_id].get('profile_complete', False)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/profile', methods=['POST'])
def save_profile():
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
        name = data.get('name')
        birth_date = data.get('birthDate')
        birth_time = data.get('birthTime')
        birth_place = data.get('birthPlace')
        
        if not all([name, birth_date, birth_time, birth_place]):
            return jsonify({'error': 'All profile fields are required'}), 400
        
        # Update user profile
        if user_id in users_storage:
            users_storage[user_id].update({
                'name': name,
                'birth_date': birth_date,
                'birth_time': birth_time,
                'birth_place': birth_place,
                'profile_complete': True,
                'updated_at': datetime.datetime.utcnow().isoformat()
            })
        
        return jsonify({
            'message': 'Profile saved successfully'
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
            'timestamp': datetime.datetime.utcnow().isoformat()
        }
        
        chat_sessions_storage.append(chat_data)
        
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
        
        # Get chat history for user
        user_history = [session for session in chat_sessions_storage if session['user_id'] == user_id]
        
        return jsonify({'history': user_history}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'timestamp': datetime.datetime.utcnow().isoformat()}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
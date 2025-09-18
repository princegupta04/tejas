from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import motor.motor_asyncio
import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import random
import string
from google.oauth2 import id_token
from google.auth.transport import requests
from twilio.rest import Client

# Load environment variables
load_dotenv()

# Twilio configuration
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# Google OAuth configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

app = FastAPI(title="AstroChat API", description="Astrology Chat Bot Backend API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
from urllib.parse import quote_plus
mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
if "@" in mongo_uri:
    # If there's authentication info, we need to escape it
    prefix = mongo_uri[:mongo_uri.find("://") + 3]
    rest = mongo_uri[len(prefix):]
    if "@" in rest:
        auth = rest[:rest.find("@")]
        if ":" in auth:
            username, password = auth.split(":")
            escaped_uri = f"{prefix}{quote_plus(username)}:{quote_plus(password)}@{rest[rest.find('@')+1:]}"
        else:
            escaped_uri = mongo_uri
    else:
        escaped_uri = mongo_uri
else:
    escaped_uri = mongo_uri

client = motor.motor_asyncio.AsyncIOMotorClient(escaped_uri)
database = client.astrochat

# Collections
users_collection = database.users
chat_sessions_collection = database.chat_sessions

# Security
SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Pydantic models
class PhoneNumber(BaseModel):
    phone: str

class OTPVerification(BaseModel):
    phone: str
    otp: str

class GoogleAuth(BaseModel):
    token: str

class ChatMessage(BaseModel):
    message: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str

def generate_otp():
    """Generate a 6-digit OTP"""
    return ''.join(random.choices(string.digits, k=6))

def send_otp(phone_number: str, otp: str):
    """Send OTP via Twilio"""
    try:
        message = twilio_client.messages.create(
            body=f"Your OTP for Humara Pandit is: {otp}",
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )
        return True
    except Exception as e:
        print(f"Error sending OTP: {e}")
        return False

def verify_google_token(token: str):
    """Verify Google OAuth token"""
    try:
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID)
        
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')
        
        return idinfo
    except Exception as e:
        print(f"Error verifying Google token: {e}")
        return None

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    
    user = await users_collection.find_one({"_id": user_id})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return user

def generate_astrology_response(user_message: str) -> str:
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

@app.get("/")
async def root():
    return {"message": "AstroChat API is running!", "timestamp": datetime.datetime.utcnow()}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.datetime.utcnow()}

@app.post("/api/send-otp")
async def send_otp_handler(phone_data: PhoneNumber):
    # Validate phone number format (you might want to add more validation)
    if not phone_data.phone or len(phone_data.phone) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid phone number"
        )

    # Generate OTP
    otp = generate_otp()
    
    # Store OTP in database with expiration
    await users_collection.update_one(
        {"phone": phone_data.phone},
        {
            "$set": {
                "phone": phone_data.phone,
                "otp": otp,
                "otp_created_at": datetime.utcnow(),
                "is_verified": False
            }
        },
        upsert=True
    )
    
    # Send OTP via Twilio
    if not send_otp(phone_data.phone, otp):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send OTP"
        )
    
    return {"message": "OTP sent successfully"}

@app.post("/api/verify-otp")
async def verify_otp_handler(verification: OTPVerification):
    # Find user with OTP
    user = await users_collection.find_one({
        "phone": verification.phone,
        "otp": verification.otp
    })
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP"
        )
    
    # Check OTP expiration (5 minutes)
    otp_created_at = user.get("otp_created_at")
    if not otp_created_at or (datetime.utcnow() - otp_created_at).total_seconds() > 300:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP expired"
        )
    
    # Update user as verified
    await users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {
                "is_verified": True,
                "otp": None,
                "otp_created_at": None
            }
        }
    )
    
    # Create access token
    access_token = create_access_token(
        data={"user_id": str(user["_id"]), "phone": verification.phone}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(user["_id"]),
        "message": "Phone number verified successfully"
    }

@app.post("/api/google-auth")
async def google_auth_handler(auth_data: GoogleAuth):
    # Verify Google token
    google_user = verify_google_token(auth_data.token)
    if not google_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token"
        )
    
    # Find or create user
    user = await users_collection.find_one({"google_id": google_user['sub']})
    
    if not user:
        # Create new user
        user_doc = {
            "google_id": google_user['sub'],
            "email": google_user.get('email'),
            "name": google_user.get('name'),
            "picture": google_user.get('picture'),
            "is_verified": True,
            "created_at": datetime.utcnow()
        }
        result = await users_collection.insert_one(user_doc)
        user_id = str(result.inserted_id)
    else:
        user_id = str(user["_id"])
    
    # Create access token
    access_token = create_access_token(
        data={"user_id": user_id, "google_id": google_user['sub']}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user_id
    }

@app.post("/api/chat")
async def chat(message: ChatMessage, current_user: dict = Depends(get_current_user)):
    if not message.message:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message is required"
        )
    
    # Generate AI response
    ai_response = generate_astrology_response(message.message)
    
    # Save chat session
    chat_doc = {
        "user_id": str(current_user["_id"]),
        "user_message": message.message,
        "ai_response": ai_response,
        "timestamp": datetime.datetime.utcnow()
    }
    
    await chat_sessions_collection.insert_one(chat_doc)
    
    return {
        "response": ai_response,
        "timestamp": datetime.datetime.utcnow()
    }

@app.get("/api/chat/history")
async def chat_history(current_user: dict = Depends(get_current_user)):
    # Get chat history
    cursor = chat_sessions_collection.find(
        {"user_id": str(current_user["_id"])}
    ).sort("timestamp", 1)
    
    history = []
    async for session in cursor:
        session["_id"] = str(session["_id"])  # Convert ObjectId to string
        history.append(session)
    
    return {"history": history}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
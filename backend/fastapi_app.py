from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import motor.motor_asyncio
from passlib.context import CryptContext
import jwt
import datetime
import os
import random
import string

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
MONGO_URL = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
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
class UserRegister(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class EmailVerification(BaseModel):
    email: EmailStr
    code: str

class ChatMessage(BaseModel):
    message: str

class Token(BaseModel):
    access_token: str
    token_type: str

def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[datetime.timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
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

@app.post("/api/register")
async def register(user: UserRegister):
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
    # Generate verification code
    verification_code = generate_verification_code()
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create user document
    user_doc = {
        "email": user.email,
        "password_hash": hashed_password,
        "verification_code": verification_code,
        "is_verified": False,
        "created_at": datetime.datetime.utcnow()
    }
    
    result = await users_collection.insert_one(user_doc)
    
    return {
        "message": "User registered successfully",
        "verification_code": verification_code,  # Remove in production
        "user_id": str(result.inserted_id)
    }

@app.post("/api/login")
async def login(user: UserLogin):
    # Find user
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    if not db_user.get("is_verified", False):
        # Generate new verification code
        verification_code = generate_verification_code()
        await users_collection.update_one(
            {"_id": db_user["_id"]},
            {"$set": {"verification_code": verification_code}}
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified",
            headers={"verification_code": verification_code}  # Remove in production
        )
    
    # Create access token
    access_token = create_access_token(
        data={"user_id": str(db_user["_id"]), "email": user.email}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(db_user["_id"])
    }

@app.post("/api/verify")
async def verify_email(verification: EmailVerification):
    # Find user and verify code
    user = await users_collection.find_one({
        "email": verification.email,
        "verification_code": verification.code
    })
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification code"
        )
    
    # Update user as verified
    await users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"is_verified": True, "verification_code": None}}
    )
    
    # Create access token
    access_token = create_access_token(
        data={"user_id": str(user["_id"]), "email": verification.email}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": str(user["_id"]),
        "message": "Email verified successfully"
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
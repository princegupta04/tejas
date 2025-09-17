# AstroChat - Astrology Chat Bot Application

A comprehensive astrology chat bot application built with React Native Expo frontend and Python backend (Flask/FastAPI) with MongoDB database.

## Features

- **Welcome Screen**: Beautiful introduction to the app
- **Get Started Screen**: Feature showcase and registration options
- **Login/Signup Screen**: User authentication with email and password
- **Email Verification**: 6-digit code verification system
- **Chat Bot Screen**: Interactive AI astrologer chat interface
- **Responsive Design**: Optimized for mobile devices
- **Custom Styling**: Beautiful UI with Poppins font and cosmic theme

## Tech Stack

### Frontend
- **React Native Expo**: Cross-platform mobile development
- **React Navigation**: Stack navigation between screens
- **Custom Styling**: Consistent design system with global styles

### Backend Options
- **Flask**: Lightweight Python web framework
- **FastAPI**: Modern, fast Python API framework (alternative)
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Secure password storage with bcrypt

### Database
- **MongoDB**: NoSQL database for user data and chat sessions

## Project Structure

```
tejas/
├── src/
│   ├── screens/
│   │   ├── WelcomeScreen.js
│   │   ├── GetStartedScreen.js
│   │   ├── LoginScreen.js
│   │   ├── VerifyScreen.js
│   │   └── ChatBotScreen.js
│   ├── styles/
│   │   └── globalStyles.js
│   ├── components/
│   └── services/
├── backend/
│   ├── app.py (Flask version)
│   ├── fastapi_app.py (FastAPI version)
│   ├── requirements.txt
│   └── fastapi-requirements.txt
├── assets/
├── App.js
├── package.json
└── README.md
```

## Design System

### Colors
- **Background**: `#F9F3E5` (Warm cream)
- **Primary Blue**: `#4285F4` (App blue)
- **Text**: `#333333` (Dark gray)
- **White**: `#FFFFFF`
- **Gray**: `#666666`
- **Light Gray**: `#E0E0E0`

### Typography
- **Font Family**: Poppins
- **Title**: 700 weight, 35px size, 40px line height
- **Subtitle**: 600 weight, 20px size, 26px line height
- **Body**: 400 weight, 16px size, 22px line height
- **Button**: 600 weight, 18px size, 24px line height

## Installation & Setup

### Frontend (React Native Expo)

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on specific platforms:
```bash
npm run android  # Android
npm run ios      # iOS (macOS required)
npm run web      # Web browser
```

### Backend Setup

#### Option 1: Flask Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set environment variables:
```bash
export MONGO_URI="mongodb://localhost:27017/astrochat"
```

5. Run Flask server:
```bash
python app.py
```

#### Option 2: FastAPI Backend

1. Install FastAPI dependencies:
```bash
pip install -r fastapi-requirements.txt
```

2. Run FastAPI server:
```bash
python fastapi_app.py
```

Or using uvicorn directly:
```bash
uvicorn fastapi_app:app --host 0.0.0.0 --port 8000 --reload
```

### Database Setup

1. Install MongoDB:
   - Download from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas cloud service

2. Start MongoDB service:
```bash
mongod
```

3. The application will automatically create the required collections:
   - `users`: User accounts and authentication data
   - `chat_sessions`: Chat history and AI responses

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/verify` - Email verification

### Chat
- `POST /api/chat` - Send message to AI astrologer
- `GET /api/chat/history` - Get chat history

### Health
- `GET /health` - Health check endpoint

## Features Description

### Welcome Screen
- Cosmic-themed landing page
- App logo and branding
- "Get Started" call-to-action button

### Get Started Screen
- Feature showcase cards
- Benefits of using the app
- Options to create account or sign in

### Login Screen
- Email and password authentication
- Toggle between login and signup modes
- Form validation and error handling
- Forgot password option

### Verify Screen
- 6-digit email verification code input
- Auto-focus between input fields
- Resend code functionality with timer
- Masked email display for privacy

### Chat Bot Screen
- Real-time chat interface
- AI astrologer responses
- Message history
- Typing indicators
- Professional chat UI design

## AI Astrology Features

The chat bot provides:
- Daily horoscope insights
- Birth chart interpretations
- Cosmic guidance and advice
- Personality analysis
- Compatibility readings
- Spiritual guidance

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Email verification system
- Input validation and sanitization
- CORS protection
- Secure API endpoints

## Development

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add navigation route in `App.js`
3. Update navigation flow as needed

### Styling Guidelines
- Use global styles from `src/styles/globalStyles.js`
- Follow consistent color scheme
- Maintain Poppins font family
- Use responsive design principles

### Backend Extensions
- Add new API endpoints in respective backend files
- Update database models as needed
- Implement additional authentication methods
- Add real AI integration (OpenAI, etc.)

## Production Deployment

### Frontend
- Build for production: `expo build:android` or `expo build:ios`
- Deploy to app stores or web hosting

### Backend
- Use production-grade WSGI server (Gunicorn for Flask)
- Set environment variables securely
- Use production MongoDB instance
- Implement proper logging and monitoring

### Environment Variables
```
MONGO_URI=mongodb://localhost:27017/astrochat
SECRET_KEY=your-production-secret-key
JWT_SECRET=your-jwt-secret-key
EMAIL_SERVICE_API_KEY=your-email-service-key
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
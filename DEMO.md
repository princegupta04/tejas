# AstroChat Demo & Testing Guide

This guide helps you test the complete AstroChat application locally.

## Quick Start

### 1. Frontend Setup (React Native Expo)

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on web browser
npm run web

# For mobile testing
npm run android  # Android emulator
npm run ios      # iOS simulator (macOS only)
```

### 2. Backend Setup

#### Option A: Flask Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start MongoDB (make sure it's installed)
mongod

# Run Flask server
python app.py
```

#### Option B: FastAPI Backend

```bash
cd backend

# Install FastAPI dependencies
pip install -r fastapi-requirements.txt

# Run FastAPI server
python fastapi_app.py
# OR
uvicorn fastapi_app:app --host 0.0.0.0 --port 8000 --reload
```

## Testing the Application Flow

### 1. Welcome Screen
- Opens automatically when app starts
- Shows cosmic theme with #F9F3E5 background
- Displays AstroChat branding with 🔮 icon
- Click "Get Started" to proceed

### 2. Get Started Screen
- Shows 4 feature cards with benefits
- Two options: "Create Account" or "I already have an account"
- Both lead to Login screen with different modes

### 3. Login/Signup Screen
- Toggle between login and signup modes
- Form validation:
  - Email format validation
  - Password minimum 6 characters
  - All fields required
- Test with any email/password combination

### 4. Email Verification Screen
- Shows masked email address
- 6-digit code input (auto-focuses next field)
- For demo: any 6-digit code works (e.g., 123456)
- Resend code functionality with 30-second timer

### 5. Chat Bot Screen
- Interactive chat interface with AI astrologer
- Type any message to get cosmic responses
- Features:
  - Message history
  - Typing indicators
  - Timestamp display
  - Responsive design

## API Testing

### Using the Backend APIs

#### Register User
```bash
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Verify Email
```bash
curl -X POST http://localhost:5000/api/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "code": "123456"}'
```

#### Chat with AI
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"message": "What does my horoscope say today?"}'
```

## Demo Data

### Test User Credentials
- Email: test@astrochat.com
- Password: astro123
- Verification Code: 123456 (any 6-digit code works)

### Sample Chat Messages to Try
- "What's my horoscope for today?"
- "Tell me about my birth chart"
- "Am I compatible with a Leo?"
- "What do the stars say about my future?"
- "I need cosmic guidance"

## Expected AI Responses

The chat bot randomly selects from these cosmic responses:
- "The stars are aligning beautifully for you today! ✨"
- "I sense great potential in your future. 🌟"
- "Your zodiac sign indicates transformation ahead. 🌙"
- "Trust your intuition - the cosmos guide you. 💫"
- "Abundance flows into your life soon. 🪐"
- "Creative energies are strong right now. 🎨"
- "Focus on self-care this week. 🌙"
- "Great time for important conversations. 💬"

## Design Verification

### Colors Used
- Background: #F9F3E5 ✓
- Primary Blue: #4285F4 ✓
- Text: #333333 ✓
- White: #FFFFFF ✓
- Gray: #666666 ✓

### Typography (Poppins Font)
- Title: 700 weight, 35px, 40px line-height ✓
- Subtitle: 600 weight, 20px, 26px line-height ✓
- Body: 400 weight, 16px, 22px line-height ✓
- Button: 600 weight, 18px, 24px line-height ✓

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Web dependencies missing**
   ```bash
   npx expo install react-dom react-native-web
   ```

3. **MongoDB connection error**
   - Ensure MongoDB is running: `mongod`
   - Check connection string in environment

4. **Backend port conflicts**
   - Flask runs on port 5000
   - FastAPI runs on port 8000
   - Ensure ports are available

### Performance Testing

1. **Navigation Flow**: Test smooth transitions between screens
2. **Form Validation**: Try invalid inputs to test error handling
3. **Chat Responsiveness**: Send multiple messages quickly
4. **Memory Usage**: Monitor during extended chat sessions

## Production Checklist

- [ ] Remove demo verification codes from API responses
- [ ] Implement real email service integration
- [ ] Add proper logging and monitoring
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Add rate limiting for APIs
- [ ] Implement proper error handling
- [ ] Add analytics tracking
- [ ] Set up CI/CD pipeline
- [ ] Add automated testing

## Screenshots

To capture app screenshots for documentation:
1. Run `npm run web`
2. Open browser developer tools
3. Set mobile device viewport
4. Navigate through each screen
5. Take screenshots of each step

## Support

For issues or questions:
1. Check this troubleshooting guide
2. Review the main README.md
3. Check console logs for error details
4. Test API endpoints individually
5. Verify MongoDB connection
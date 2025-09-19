# Humara Pandit Backend

This is the backend server for the Humara Pandit application, built with FastAPI and MongoDB.

## Tech Stack

- FastAPI (v0.111.0) - Modern, fast web framework for building APIs
- MongoDB (via motor v3.3.1) - NoSQL Database
- Python 3.13+
- Authentication: JWT, Google OAuth, and Twilio for OTP

## Prerequisites

- Python 3.13 or higher
- MongoDB installed and running
- Virtual environment (recommended)

## Setup and Installation

1. Create and activate a virtual environment:
```bash
# Create virtual environment
python3 -m venv ../.venv

# Activate virtual environment
source ../.venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r fastapi-requirements.txt
```

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URL=your_mongodb_url
DB_NAME=your_database_name

# JWT Configuration
SECRET_KEY=your_secret_key
ALGORITHM=HS256

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Twilio Configuration (for OTP)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_VERIFY_SERVICE_SID=your_verify_service_sid
```

## Running the Server

1. Make sure you're in the backend directory:
```bash
cd backend
```

2. Activate the virtual environment (if not already activated):
```bash
source ../.venv/bin/activate
```

3. Start the server:
```bash
uvicorn fastapi_app:app --host 0.0.0.0 --port 8000 --reload
```

The server will be available at `http://0.0.0.0:8000`

## API Documentation

Once the server is running, you can access:
- Interactive API documentation: `http://localhost:8000/docs`
- Alternative API documentation: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /auth/google` - Google OAuth authentication
- `POST /auth/phone` - Phone number authentication (sends OTP)
- `POST /auth/verify` - Verify phone OTP
- `GET /auth/status` - Check authentication status

### User Management
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update user profile
- `DELETE /users/me` - Delete user account

## Dependencies

Key dependencies include:
- fastapi==0.111.0
- uvicorn==0.30.0
- python-multipart==0.0.9
- passlib[bcrypt]==1.7.4
- python-dotenv==1.0.1
- motor==3.3.1
- pymongo==4.7.2
- PyJWT==2.8.0
- google-auth==2.35.0
- google-auth-oauthlib==1.2.1
- twilio==9.2.3

## Development

- The server uses hot-reloading in development mode
- API documentation is automatically generated
- MongoDB connection is handled asynchronously using motor

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Security

- JWT authentication
- Password hashing using bcrypt
- CORS middleware enabled
- Environment variables for sensitive data
- Google OAuth2 integration
- Phone number verification via Twilio

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

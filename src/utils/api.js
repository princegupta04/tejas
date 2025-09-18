import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8000'; // Development API URL
// TODO: Change to your production API URL when deploying

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const handleApiError = (error) => {
  if (error instanceof ApiError) {
    Alert.alert('Error', error.message);
  } else {
    Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    console.error('API Error:', error);
  }
};

export const googleAuth = async (accessToken) => {
  try {
    const response = await fetch(`${API_URL}/google-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.detail || 'Google authentication failed', response.status);
    }

    // Store the authentication token
    await AsyncStorage.setItem('authToken', data.access_token);
    await AsyncStorage.setItem('userId', data.user_id);
    return data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const sendOTP = async (phoneNumber) => {
  try {
    const response = await fetch(`${API_URL}/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: phoneNumber }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.detail || 'Failed to send OTP', response.status);
    }

    return data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await fetch(`${API_URL}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: phoneNumber, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.detail || 'Invalid OTP', response.status);
    }

    // Store the authentication token
    await AsyncStorage.setItem('authToken', data.access_token);
    await AsyncStorage.setItem('userId', data.user_id);
    return data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    const userId = await AsyncStorage.getItem('userId');
    return { isAuthenticated: !!authToken, userId };
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { isAuthenticated: false, userId: null };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userInfo');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

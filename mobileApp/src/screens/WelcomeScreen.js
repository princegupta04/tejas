import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../styles/globalStyles';
import { welcomeStyles } from '../styles/screenStyles';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';
import { makeRedirectUri } from 'expo-auth-session';
import { checkAuthStatus, googleAuth } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize WebBrowser for authentication
WebBrowser.maybeCompleteAuthSession();

// Configure the redirect URI with proxy for Google authentication
const redirectUri = makeRedirectUri({
  useProxy: true,
});

// For debugging purposes
if (__DEV__) {
  console.log('Redirect URI:', redirectUri);
}

/**
 * WelcomeScreen Component
 * 
 * This component serves as the entry point of the application, providing users
 * with options to sign in either through mobile number or Google authentication.
 */
const WelcomeScreen = () => {
  // Navigation and state management
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configure Google Authentication
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '853100623123-nl5set8finfaid2q1pqvste94i6hj6c4.apps.googleusercontent.com',
    iosClientId: '853100623123-nl5set8finfaid2q1pqvste94i6hj6c4.apps.googleusercontent.com',
    webClientId: '853100623123-nl5set8finfaid2q1pqvste94i6hj6c4.apps.googleusercontent.com',
    responseType: 'token',
    scopes: ['openid', 'profile', 'email'],
    redirectUri,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    console.log('➡️ Checking auth status...');
    try {
      const { isAuthenticated } = await checkAuthStatus();
      if (isAuthenticated) {
        console.log('✅ Already authenticated, navigating to ChatBot');
        navigation.replace('ChatBot');
      } else {
        console.log('ℹ️ Not authenticated yet');
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      console.log('✅ Google response received:', response);
      handleSignInResponse(response.authentication.accessToken);
    } else if (response?.type === 'error') {
      console.error('❌ Google Auth Error:', response.error);
      Alert.alert(
        'Authentication Error',
        response.error?.message || 'Failed to authenticate with Google'
      );
    }
  }, [response]);

  const handleSignInResponse = async (accessToken) => {
    console.log('✅ Step 1: Received Access Token:', accessToken);
    setLoading(true);

    try {
      if (!accessToken) throw new Error('No access token received');

      // Get user info from Google
      console.log('➡️ Step 2: Fetching Google user info...');
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error(
          'Failed to get user info: ' + userInfoResponse.statusText
        );
      }

      const user = await userInfoResponse.json();
      console.log('✅ Step 3: Google User Info:', user);

      if (!user?.email) {
        throw new Error('No user email received');
      }

      await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      setUserInfo(user);

      // Authenticate with backend
      console.log('➡️ Step 4: Authenticating with backend...');
      const authResult = await googleAuth(accessToken);

      if (!authResult?.access_token) {
        throw new Error('Backend authentication failed');
      }

      await AsyncStorage.setItem('accessToken', authResult.access_token);
      console.log('✅ Step 5: Backend Token Saved:', authResult.access_token);

      // Navigate to ChatBot
      console.log('➡️ Step 6: Navigating to ChatBot...');
      navigation.replace('ChatBot');
    } catch (error) {
      console.error('❌ Google auth error:', error.message);
      Alert.alert(
        'Authentication Failed',
        error.message || 'Unable to sign in with Google. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    console.log('➡️ Navigating to Mobile Login...');
    navigation.navigate('Login');
  };

  const signWithGoogle = async () => {
    console.log('➡️ Step 0: Prompting Google login...');
    setLoading(true);
    try {
      await promptAsync({ useProxy: true }); // ✅ Must also set here
    } catch (error) {
      console.error('❌ Failed to start Google login:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#FB9E3A', '#FBBF5D', '#FCEF91']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[globalStyles.container, welcomeStyles.container]}
    >
      <View style={welcomeStyles.content}>
        <View style={welcomeStyles.logoContainer}>
          <Image
            source={require('../../assets/pandit.png')}
            style={welcomeStyles.logoImage}
          />
          <Text style={[welcomeStyles.headingText]}>Welcome to</Text>
          <Text style={[welcomeStyles.headingText]}>Humara Pandit</Text>
        </View>

        <TouchableOpacity
          style={[globalStyles.button, welcomeStyles.getStartedButton]}
          onPress={handleGetStarted}
        >
          <Text style={globalStyles.buttonText}>Login with mobile</Text>
        </TouchableOpacity>

        <View style={welcomeStyles.dividerContainer}>
          <View style={welcomeStyles.dividerLine} />
          <Text style={welcomeStyles.dividerText}>Or</Text>
          <View style={welcomeStyles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[welcomeStyles.googleButton, loading && welcomeStyles.disabledButton]}
          onPress={signWithGoogle}
          disabled={loading}
        >
          {loading ? (
            <View style={welcomeStyles.loadingContainer}>
              <ActivityIndicator color="#4D1E00" />
              <Text style={[welcomeStyles.googleButtonText, welcomeStyles.loadingText]}>
                Signing in...
              </Text>
            </View>
          ) : (
            <>
              <Image
                source={require('../../assets/google-icon.png')}
                style={welcomeStyles.googleIcon}
              />
              <Text style={welcomeStyles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;

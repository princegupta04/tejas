import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { googleAuth, checkAuthStatus } from '../utils/api';

// ✅ Must call this once
WebBrowser.maybeCompleteAuthSession();

// ✅ Redirect URI with proxy (Google accepts it)
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
});

console.log('Redirect URI:', redirectUri);

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '853100623123-nl5set8finfaid2q1pqvste94i6hj6c4.apps.googleusercontent.com',
    iosClientId:
      '853100623123-nl5set8finfaid2q1pqvste94i6hj6c4.apps.googleusercontent.com',
    webClientId:
      '853100623123-nl5set8finfaid2q1pqvste94i6hj6c4.apps.googleusercontent.com',
    responseType: 'token',
    scopes: ['openid', 'profile', 'email'],
    redirectUri, // ✅ Using Expo Proxy
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
      style={[globalStyles.container, styles.container]}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/pandit.png')}
            style={styles.logoImage}
          />
          <Text style={[styles.headingText]}>Welcome to</Text>
          <Text style={[styles.headingText]}>Humara Pandit</Text>
        </View>

        <TouchableOpacity
          style={[globalStyles.button, styles.getStartedButton]}
          onPress={handleGetStarted}
        >
          <Text style={globalStyles.buttonText}>Login with mobile</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[styles.googleButton, loading && styles.disabledButton]}
          onPress={signWithGoogle}
          disabled={loading}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#4D1E00" />
              <Text style={[styles.googleButtonText, styles.loadingText]}>
                Signing in...
              </Text>
            </View>
          ) : (
            <>
              <Image
                source={require('../../assets/google-icon.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoImage: {
    borderRadius: 153,
    width: 306,
    height: 306,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  getStartedButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#4D1E00',
  },
  headingText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: '#4B1E01',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4B1E01',
  },
  dividerText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#4B1E01',
    paddingHorizontal: 10,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
});

export default WelcomeScreen;

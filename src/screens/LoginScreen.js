import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const isSignupMode = route.params?.mode === 'signup';

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to verify screen with email
      navigation.navigate('Verify', { email });
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSwitchMode = () => {
    navigation.setParams({ mode: isSignupMode ? 'login' : 'signup' });
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[globalStyles.title, styles.title]}>
            {isSignupMode ? 'Create Account' : 'Welcome Back'}
          </Text>
          <Text style={[globalStyles.body, styles.subtitle]}>
            {isSignupMode 
              ? 'Join AstroChat to discover your cosmic destiny' 
              : 'Sign in to continue your astrological journey'
            }
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={globalStyles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          
          <TextInput
            style={globalStyles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete={isSignupMode ? "new-password" : "current-password"}
          />

          <TouchableOpacity 
            style={[globalStyles.button, styles.submitButton, loading && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading 
                ? 'Loading...' 
                : isSignupMode 
                  ? 'Create Account' 
                  : 'Sign In'
              }
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={[globalStyles.body, styles.switchText]}>
            {isSignupMode ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={handleSwitchMode}>
            <Text style={[globalStyles.body, styles.switchLink]}>
              {isSignupMode ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>

        {!isSignupMode && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[globalStyles.body, styles.forgotPasswordText]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    backgroundColor: colors.background, // maintain app background color
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
  form: {
    marginBottom: 30,
  },
  submitButton: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#4D1E00', // match button color with WelcomeScreen
    borderRadius: 25,
  },
  disabledButton: {
    opacity: 0.6,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginRight: 5,
  },
  switchLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
});

export default LoginScreen;
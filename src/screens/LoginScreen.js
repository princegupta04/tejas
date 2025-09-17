import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { isValidMobile, formatMobile, cleanMobile } from '../utils/validation';

const LoginScreen = ({ navigation, route }) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSendOTP = async () => {
    if (!mobile) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (!isValidMobile(mobile)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    
    try {
      const cleanNumber = cleanMobile(mobile);
      
      // Call backend API to send OTP
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: cleanNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to verify screen with mobile number
        navigation.navigate('Verify', { mobile: cleanNumber });
        Alert.alert('OTP Sent', 'Please check your mobile for the verification code');
      } else {
        Alert.alert('Error', data.error || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[globalStyles.title, styles.title]}>
            Welcome to AstroChat
          </Text>
          <Text style={[globalStyles.body, styles.subtitle]}>
            Enter your mobile number to get started with your cosmic journey
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={globalStyles.input}
            placeholder="Mobile Number (10 digits)"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            maxLength={10}
            autoCompleteType="tel"
          />

          <TouchableOpacity 
            style={[globalStyles.button, styles.submitButton, loading && styles.disabledButton]} 
            onPress={handleSendOTP}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[globalStyles.body, styles.infoText]}>
            We'll send a 6-digit verification code to your mobile number
          </Text>
        </View>
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
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default LoginScreen;
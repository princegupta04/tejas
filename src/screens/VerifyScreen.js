import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { maskMobile } from '../utils/validation';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const mobile = route.params?.mobile || '';

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = `input${index + 1}`;
      // In a real implementation, you'd use refs to focus the next input
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    
    try {
      // Call backend API to verify OTP
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mobile: mobile,
          code: verificationCode 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token for later use (in a real app, use secure storage)
        // For now, navigate to profile details screen
        navigation.navigate('ProfileDetails', { mobile: mobile, token: data.token });
      } else {
        Alert.alert('Error', data.error || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(30);
    
    try {
      // Call backend API to resend OTP
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: mobile }),
      });

      if (response.ok) {
        Alert.alert('OTP Sent', 'A new verification code has been sent to your mobile.');
      } else {
        Alert.alert('Error', 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to resend OTP. Please try again.');
    }
    
    // Restart timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const maskedMobile = maskMobile(mobile);

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.icon}>📱</Text>
          <Text style={[globalStyles.title, styles.title]}>
            Verify Your Mobile
          </Text>
          <Text style={[globalStyles.body, styles.subtitle]}>
            We've sent a 6-digit verification code to{'\n'}
            <Text style={styles.mobile}>{maskedMobile}</Text>
          </Text>
        </View>

        <View style={styles.codeContainer}>
          <Text style={[globalStyles.body, styles.codeLabel]}>
            Enter verification code
          </Text>
          
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[globalStyles.button, styles.verifyButton, loading && styles.disabledButton]} 
          onPress={handleVerify}
          disabled={loading}
        >
          <Text style={globalStyles.buttonText}>
            {loading ? 'Verifying...' : 'Verify Mobile'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={[globalStyles.body, styles.resendText]}>
            Didn't receive the code?
          </Text>
          
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={[globalStyles.body, styles.resendLink]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[globalStyles.body, styles.timerText]}>
              Resend in {resendTimer}s
            </Text>
          )}
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
  email: {
    fontWeight: '600',
    color: colors.primary,
  },
  mobile: {
    fontWeight: '600',
    color: colors.primary,
  },
  codeContainer: {
    marginBottom: 40,
  },
  codeLabel: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 10,
    fontSize: 24,
    fontWeight: '600',
    backgroundColor: colors.white,
    color: colors.text,
  },
  verifyButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    opacity: 0.6,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    marginBottom: 5,
  },
  resendLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  timerText: {
    color: colors.gray,
  },
});

export default VerifyScreen;
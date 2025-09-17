import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const phone = route.params?.phone || '';

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
      // You can implement ref-based focus if needed
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.navigate('ChatBot');
    } catch (error) {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(30);
    
    // Simulate resend API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    Alert.alert('Success', 'A new verification code has been sent to your mobile number.');
    
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

  const maskedPhone = phone.replace(/(\d{2})(\d{6})(\d{2})/, '$1******$3');

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
            <Text style={styles.phone}>{maskedPhone}</Text>
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
            {loading ? 'Verifying...' : 'Verify Code'}
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
    backgroundColor: colors.background,
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
  phone: {
    fontWeight: '600',
    color: '#4D1E00',
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
    backgroundColor: '#4D1E00',
    borderRadius: 25,
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
    color: '#4D1E00',
    fontWeight: '600',
  },
  timerText: {
    color: colors.gray,
  },
});

export default VerifyScreen;
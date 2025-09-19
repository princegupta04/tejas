import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { verifyStyles } from '../styles/screenStyles';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  
  const inputRefs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];

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
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // If a digit is entered and there is a next input, focus it
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }

    // If digit is deleted and there is a previous input, focus it
    if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');

    if (verificationCode.length !== 4) {
      Alert.alert('Error', 'Please enter the complete 4-digit code');
      return;
    }

    setLoading(true);

    try {
                  // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigation.navigate('SuccessVerify');
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

    await new Promise(resolve => setTimeout(resolve, 1000));
    Alert.alert('Success', 'A new verification code has been sent to your mobile number.');

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

 return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={verifyStyles.container}
    >
      <ScrollView 
        contentContainerStyle={verifyStyles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Yellow top section */}
        <View style={verifyStyles.topSection}>
          <Text style={{ fontSize: 40 }}></Text>
        </View>

        {/* White floating card */}
        <View style={verifyStyles.card}>
          <Text style={verifyStyles.title}>Verify Your Phone Number</Text>
          <Text style={verifyStyles.subtitle}>
            Enter the 4-digit code sent to your mobile
          </Text>

          <View style={verifyStyles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={verifyStyles.codeInput}
                value={digit}
                onChangeText={(value) => handleCodeChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
                textAlign="center"
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && index > 0 && !digit) {
                    inputRefs[index - 1].current.focus();
                  }
                }}
              />
            ))}
          </View>

          {/* Resend link */}
          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text style={verifyStyles.resendLink}>
              {canResend ? 'RESEND NEW CODE' : `Resend in ${resendTimer}s`}
            </Text>
          </TouchableOpacity>

          {/* Verify button */}
          <TouchableOpacity
            style={[verifyStyles.button, loading && verifyStyles.disabledButton]}
            onPress={handleVerify}
            disabled={loading}
          >
            <Text style={verifyStyles.buttonText}>
              {loading ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Footer text */}
        <Text style={verifyStyles.footer}>
          By providing my phone number, I hereby agree and accept the{' '}
          <Text style={verifyStyles.link}>Terms of Service</Text> and{' '}
          <Text style={verifyStyles.link}>Privacy Policy</Text> in use of our app
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyScreen;

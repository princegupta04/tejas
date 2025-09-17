import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '', '']);
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
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Yellow top section */}
        <View style={styles.topSection}>
          <Text style={{ fontSize: 40 }}></Text>
        </View>

        {/* White floating card */}
        <View style={styles.card}>
          <Text style={styles.title}>Verify Your Phone Number</Text>
          <Text style={styles.subtitle}>
            Enter the 4-digit code sent to your mobile
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

          {/* Resend link */}
          <TouchableOpacity onPress={handleResend} disabled={!canResend}>
            <Text style={styles.resendLink}>
              {canResend ? 'RESEND NEW CODE' : `Resend in ${resendTimer}s`}
            </Text>
          </TouchableOpacity>

          {/* Verify button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleVerify}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Footer text */}
        <Text style={styles.footer}>
          By providing my phone number, I hereby agree and accept the{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text> in use of our app
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7EF', // Creamy background
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  topSection: {
    backgroundColor: '#FFD580', // Yellow header
    width: '100%',
    height: 420,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0, // background
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 25,
    borderRadius: 20,
    marginTop: -100, // pull over yellow section
    zIndex: 1, // floating above yellow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6, // Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E6E6E6',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    backgroundColor: '#FBF6EF',
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resendLink: {
    textAlign: 'center',
    color: '#4D1E00',
    fontWeight: '600',
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4D1E00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginTop: 20,
    lineHeight: 18,
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 30,
  },
  link: {
    color: '#4D1E00',
    fontWeight: '600',
  },
});

export default VerifyScreen;

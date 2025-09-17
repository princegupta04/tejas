import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone.match(/^\d{10}$/)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Verify', { phone });
    }, 1200);
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[globalStyles.title, styles.title]}>Mobile Login / Sign Up</Text>
          <Text style={[globalStyles.body, styles.subtitle]}>Enter your mobile number to continue</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={globalStyles.input}
            placeholder="Mobile Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <TouchableOpacity
            style={[globalStyles.button, styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSendOtp}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
          </TouchableOpacity>
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
    backgroundColor: '#4D1E00',
    borderRadius: 25,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default LoginScreen;
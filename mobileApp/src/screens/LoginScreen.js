import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { loginStyles } from '../styles/screenStyles';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (!phone.match(/^\d{10}$/)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Verify', { phone });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={loginStyles.container}
    >
      <ScrollView 
        contentContainerStyle={loginStyles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Icon/Image */}
        <View style={loginStyles.topSection}>
          <Image
            source={require('../../assets/lock-icon.png')}
            style={loginStyles.icon}
            resizeMode="contain"
          />
        </View>

        {/* Card Section */}
        <View style={loginStyles.card}>
          <Text style={loginStyles.title}>Log in to continue your spiritual journey</Text>
          <Text style={loginStyles.subtitle}>
            Add your phone number. We’ll send you a Verification code
          </Text>

          <TextInput
            style={loginStyles.input}
            placeholder="Enter Your Phone Number"
            placeholderTextColor="#B8B8B8"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            style={[loginStyles.button, loading && loginStyles.disabledButton]}
            onPress={handleSendOtp}
            disabled={loading}
          >
            <Text style={loginStyles.buttonText}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;


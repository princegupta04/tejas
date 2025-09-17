import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';

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
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Icon/Image */}
        <View style={styles.topSection}>
          <Image
            source={require('../../assets/lock-icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        {/* Card Section */}
        <View style={styles.card}>
          <Text style={styles.title}>Log in to continue your spiritual journey</Text>
          <Text style={styles.subtitle}>
            Add your phone number. We’ll send you a Verification code
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Your Phone Number"
            placeholderTextColor="#B8B8B8"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleSendOtp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7EF', // Light cream background
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  topSection: {
    backgroundColor: '#FFD580',
    width: '100%',
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  icon: {
    width: 400,
    height: 400,
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 25,
    borderRadius: 16,
    marginTop: -40, // Pull up into the yellow section
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingHorizontal: 15,
    backgroundColor: '#FBF6EF',
    fontSize: 16,
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4D1E00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});


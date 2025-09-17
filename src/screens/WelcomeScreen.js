import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const WelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('GetStarted');
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🔮</Text>
          <Text style={[globalStyles.title, styles.appName]}>AstroChat</Text>
          <Text style={[globalStyles.subtitle, styles.tagline]}>
            Your Personal Astrology Guide
          </Text>
        </View>
        
        <View style={styles.welcomeTextContainer}>
          <Text style={[globalStyles.body, styles.welcomeText]}>
            Discover your cosmic destiny with personalized astrology readings and chat with our AI astrologer
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[globalStyles.button, styles.getStartedButton]} 
          onPress={handleGetStarted}
        >
          <Text style={globalStyles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  appName: {
    marginBottom: 10,
  },
  tagline: {
    textAlign: 'center',
    opacity: 0.8,
  },
  welcomeTextContainer: {
    marginBottom: 60,
  },
  welcomeText: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.7,
  },
  getStartedButton: {
    width: '100%',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
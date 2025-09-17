import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const GetStartedScreen = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate('Login', { mode: 'signup' });
  };

  const handleLogin = () => {
    navigation.navigate('Login', { mode: 'login' });
  };

  const features = [
    {
      icon: '⭐',
      title: 'Daily Horoscope',
      description: 'Get personalized daily insights based on your zodiac sign'
    },
    {
      icon: '🔮',
      title: 'AI Astrologer Chat',
      description: 'Chat with our AI astrologer for instant guidance and advice'
    },
    {
      icon: '🌙',
      title: 'Birth Chart Reading',
      description: 'Discover your personality traits through detailed birth chart analysis'
    },
    {
      icon: '💫',
      title: 'Compatibility Check',
      description: 'Find out how compatible you are with friends and partners'
    }
  ];

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={[globalStyles.title, styles.title]}>
            Welcome to AstroChat
          </Text>
          <Text style={[globalStyles.body, styles.subtitle]}>
            Unlock the mysteries of the universe
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureText}>
                <Text style={[globalStyles.subtitle, styles.featureTitle]}>
                  {feature.title}
                </Text>
                <Text style={[globalStyles.body, styles.featureDescription]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[globalStyles.button, styles.primaryButton, { backgroundColor: '#4D1E00' }]}
            onPress={handleSignUp}
          >
            <Text style={globalStyles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.secondaryButton]} 
            onPress={handleLogin}
          >
            <Text style={[globalStyles.buttonText, styles.secondaryButtonText]}>
              I already have an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
  primaryButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});

export default GetStartedScreen;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles, colors } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };
  const signWithGoogle = () => {
    // Implement Google Sign-In logic here
    alert('Google Sign-In is not implemented yet.');
  }

  return (
    <LinearGradient
      colors={["#FB9E3A", "#FBBF5D", "#FCEF91"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[globalStyles.container, styles.container]}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/pandit.png')} style={styles.logoImage} />
          <Text style={[styles.headingText]}>
            Welcome to
          </Text>
          <Text style={[styles.headingText]}> 
             Humara Pandit
          </Text>
        </View>

        <TouchableOpacity 
          style={[globalStyles.button, styles.getStartedButton]} 
          onPress={handleGetStarted}
        >
          <Text style={globalStyles.buttonText}>Login with mobile</Text>
        </TouchableOpacity>
      
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Or</Text>
        <View style={styles.dividerLine} />
      </View>

          <TouchableOpacity 
          style={styles.googleButton} 
          onPress={signWithGoogle}
        >
          <Image 
            source={require('../../assets/google-icon.png')} 
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
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
  logoImage: {
    borderRadius: 153,
    width: 306,
    height: 306,
    marginBottom: 20,
    resizeMode: 'contain',
    opacity: 1,
    alignSelf: 'center', // center horizontally
  },
  appName: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontStyle: 'bold',
    fontSize: 35,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'center',
    color: colors.primary,
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
    backgroundColor: '#4D1E00', // button background color
  },
  headingText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: '#4B1E01', // text color only
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#4B1E01',
  },
  dividerText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#4B1E01',
    paddingHorizontal: 10,
    fontWeight: '500',
  },
});

export default WelcomeScreen;
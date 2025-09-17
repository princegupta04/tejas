import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { globalStyles, colors } from '../styles/globalStyles';

const succesVerify = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('ChatBot');
        }, 3000);
        
        return () => clearTimeout(timer); // Cleanup the timer
    }, [navigation]);

  return (
    <LinearGradient
      colors={["#FB9E3A", "#FBBF5D", "#FCEF91"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[globalStyles.container, styles.container]}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/verify.png')} style={styles.logoImage} />

        <Text style={[styles.tagline, styles.welcomeText]}>
           Mobile  Verification has Successfully done.
          </Text>
        </View>
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
});

export default succesVerify;
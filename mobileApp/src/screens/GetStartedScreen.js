import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';
import { getStartedStyles } from '../styles/screenStyles';

const GetStartedScreen = ({ navigation }) => {
  const handleClick = () => {
    navigation.navigate('ChatBot');
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
      <ScrollView contentContainerStyle={getStartedStyles.container}>
        <View style={getStartedStyles.header}>
          <Text style={[getStartedStyles.headingText]}>
            Welcome to
          </Text>
          <Text style={[getStartedStyles.headingText]}>
            Tejas
          </Text>
          <Text style={[globalStyles.body, getStartedStyles.subtitle]}>
            Unlock the mysteries of the universe
          </Text>
        </View>

        <View style={getStartedStyles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={getStartedStyles.featureCard}>
              <Text style={getStartedStyles.featureIcon}>{feature.icon}</Text>
              <View style={getStartedStyles.featureText}>
                <Text style={[globalStyles.subtitle, getStartedStyles.featureTitle]}>
                  {feature.title}
                </Text>
                <Text style={[globalStyles.body, getStartedStyles.featureDescription]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={getStartedStyles.buttonContainer}>
          <TouchableOpacity 
            style={[globalStyles.button, getStartedStyles.primaryButton, { backgroundColor: '#4D1E00' }]}
            onPress={handleClick}
          >
            <Text style={globalStyles.buttonText}>Chat With Tejas</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </View>
  );
};

export default GetStartedScreen;
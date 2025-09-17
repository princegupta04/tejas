import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const ProfileDetailsScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { mobile, token } = route.params || {};

  const handleSubmit = async () => {
    if (!name || !birthDate || !birthTime || !birthPlace) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      // Call backend API to save profile details
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          birthDate,
          birthTime,
          birthPlace,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to dashboard/chat screen
        navigation.navigate('ChatBot', { 
          userProfile: { name, birthDate, birthTime, birthPlace },
          token 
        });
      } else {
        Alert.alert('Error', data.error || 'Failed to save profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[globalStyles.title, styles.title]}>
            Complete Your Profile
          </Text>
          <Text style={[globalStyles.body, styles.subtitle]}>
            Help us create your personalized astrological profile
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={[globalStyles.body, styles.label]}>Full Name</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={[globalStyles.body, styles.label]}>Date of Birth</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="DD/MM/YYYY"
            value={birthDate}
            onChangeText={setBirthDate}
            keyboardType="numeric"
            maxLength={10}
          />

          <Text style={[globalStyles.body, styles.label]}>Time of Birth</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="HH:MM AM/PM"
            value={birthTime}
            onChangeText={setBirthTime}
          />

          <Text style={[globalStyles.body, styles.label]}>Place of Birth</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="City, State/Country"
            value={birthPlace}
            onChangeText={setBirthPlace}
            autoCapitalize="words"
          />

          <TouchableOpacity 
            style={[globalStyles.button, styles.submitButton, loading && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading ? 'Saving...' : 'Complete Profile'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[globalStyles.body, styles.infoText]}>
            This information helps us provide accurate astrological insights tailored to you
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
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
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  form: {
    marginBottom: 30,
  },
  label: {
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: '500',
    color: colors.text,
  },
  submitButton: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#4D1E00',
    borderRadius: 25,
  },
  disabledButton: {
    opacity: 0.6,
  },
  infoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  infoText: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ProfileDetailsScreen;
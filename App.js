import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import LoginScreen from './src/screens/LoginScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import ChatBotScreen from './src/screens/ChatBotScreen';
import { colors } from './src/styles/globalStyles';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />
        <Stack.Screen name="ChatBot" component={ChatBotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

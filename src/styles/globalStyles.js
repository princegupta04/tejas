import { StyleSheet } from 'react-native';

export const colors = {
  background: '#FB9E3A', // Use a solid color for fallback/background
  primary: '#4285F4', // App blue
  text: '#333333',
  white: '#FFFFFF',
  gray: '#666666',
  lightGray: '#E0E0E0',
};

export const typography = {
  title: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 40,
    color: colors.primary,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
    color: colors.text,
  },
  body: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
  },
  button: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: colors.white,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: typography.title,
  subtitle: typography.subtitle,
  body: typography.body,
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: typography.button,
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    ...typography.body,
  },
});
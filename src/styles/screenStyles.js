import { StyleSheet } from 'react-native';
import { colors } from './globalStyles';

// Welcome Screen Styles
export const welcomeStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  // Logo section styling
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoImage: {
    borderRadius: 153,
    width: 306,
    height: 306,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  // Button styling
  getStartedButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#4D1E00',
  },
  // Typography
  headingText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: '#4B1E01',
  },
  // Google Sign-in button styling
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
    shadowOffset: { width: 0, height: 2 },
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
  // Divider styling
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
  disabledButton: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
});

// Login Screen Styles
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7EF', // Light cream background
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  // Top yellow section
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
  // Main card styling
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 25,
    borderRadius: 16,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  // Typography
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
  // Input field styling
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
  // Button styling
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

// Verify Screen Styles
export const verifyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF7EF',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  // Top section styling
  topSection: {
    backgroundColor: '#FFD580',
    width: '100%',
    height: 420,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  // Card styling
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 25,
    borderRadius: 20,
    marginTop: -100,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  // OTP input styling
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E6E6E6',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    backgroundColor: '#FBF6EF',
    color: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  // Typography
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  resendLink: {
    textAlign: 'center',
    color: '#4D1E00',
    fontWeight: '600',
    marginBottom: 20,
    fontSize: 14,
  },
  // Button styling
  button: {
    backgroundColor: '#4D1E00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  // Footer styling
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginTop: 20,
    lineHeight: 18,
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 30,
  },
  link: {
    color: '#4D1E00',
    fontWeight: '600',
  },
});

// Chat Bot Screen Styles
export const chatBotStyles = StyleSheet.create({
  // Header styling
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.primary,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 5,
  },
  // Title section styling
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
    flexShrink: 1,
    maxWidth: '35%',
  },
  // Online status styling
  onlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2ECC71',
    marginRight: 5,
  },
  onlineText: {
    fontSize: 14,
    color: colors.gray,
  },
  // Credits button styling
  creditsButton: {
    backgroundColor: '#4D1E00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 3,
    flexShrink: 0,
  },
  creditsText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  buyCreditsButton: {
    backgroundColor: '#4D1E00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexShrink: 0,
  },
  buyCreditsText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  // Messages list styling
  messagesList: {
    flex: 1,
    backgroundColor: colors.white,
  },
  messagesContainer: {
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  // Message bubble styling
  botMessage: {
    justifyContent: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
    overflow: 'hidden',
  },
  botAvatarImage: {
    width: '100%',
    height: '100%',
  },
  messageContent: {
    backgroundColor: '#fB9E3A',
    maxWidth: '75%',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  botMessageContent: {
    backgroundColor: '#FEE2AD',
    borderBottomLeftRadius: 5,
  },
  userMessageContent: {
    backgroundColor: '#F5FOCD',
    borderBottomRightRadius: 5,
    marginLeft: 'auto',
  },
  // Message text styling
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  botMessageText: {
    color: colors.text,
  },
  userMessageText: {
    color: colors.white,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
  },
  botTimestamp: {
    color: colors.gray,
  },
  userTimestamp: {
    color: colors.white,
    opacity: 0.8,
    textAlign: 'right',
  },
  // Input container styling
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray,
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});

// Get Started Screen Styles
export const getStartedStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  // Header section styling
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
  // Features section styling
  featuresContainer: {
    marginTop: -20,  
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
  // Button container styling
  buttonContainer: {
    marginTop: -45,
  },
  primaryButton: {
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: -25,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  // Typography
  headingText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: '#4B1E01',
  },
});

// Success Verify Screen Styles
export const successVerifyStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  // Logo section styling
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
    alignSelf: 'center',
  },
  // Typography
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
  // Button styling
  getStartedButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#4D1E00',
  },
  headingText: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 35,
    lineHeight: 40,
    textAlign: 'center',
    color: '#4B1E01',
  },
});

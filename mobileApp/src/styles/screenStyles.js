import { StyleSheet } from 'react-native';
import { colors } from './globalStyles';

// About Screen Styles
export const aboutStyles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#FDF6EC",
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Poppins",
    fontSize: 22,
    fontWeight: "700",
    color: "#4B1E01",
  },
  profileWrapper: {
    marginTop: 8,
    marginBottom: 10,
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#4D1E00",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    resizeMode: "cover",
  },
  aboutBox: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "#FFF5E4",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  aboutText: {
    fontFamily: "Poppins",
    fontSize: 15,
    lineHeight: 24,
    color: "#4B1E01",
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#4D1E00",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "Poppins",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

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
  container: {
    flex: 1,
    backgroundColor: "#FFF9ED",
  },
  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "green",
    marginRight: 5,
  },
  onlineText: {
    fontSize: 14,
    color: "#444",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  creditsBox: {
    backgroundColor: "#4E2C18",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
  },
  creditsText: {
    color: "#fff",
    fontWeight: "600",
  },
  buyCredits: {
    backgroundColor: "#4E2C18",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  buyCreditsText: {
    color: "#fff",
    fontWeight: "600",
  },

  // CHAT
  messagesContainer: {
    padding: 15,
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    maxWidth: "80%",
  },
  botMessage: {
    alignSelf: "flex-start",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  botAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8,
  },
  messageBubble: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  botMessageBubble: {
    backgroundColor: "#FFE7B3",
    borderBottomLeftRadius: 5,
  },
  userMessageBubble: {
    backgroundColor: "#FFF4D0",
    borderBottomRightRadius: 5,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  botMessageText: {
    color: "#222",
  },
  userMessageText: {
    color: "#222",
  },

  // INPUT
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#4E2C18",
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  // FOOTER
  footerNote: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FFD580",
    marginBottom: 20,
    borderRadius: 40
  },
  footerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
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

// Purchase Credits Modal Styles
export const creditModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#FFF5E4",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconCircle: {
    backgroundColor: "#FFD580",
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    color: "#4B1E01",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#4B1E01",
    marginBottom: 20,
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  option: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginVertical: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB84D",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionHighlight: {
    width: "100%",
    borderRadius: 12,
    padding: 15,
    marginVertical: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B1E01",
  },
  highlightOptionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4B1E01",
  },
  bestValue: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#4D1E00',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  bestValueText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cancelBtn: {
    backgroundColor: "#4D1E00",
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cancelText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  footerNote: {
    textAlign: "center",
    fontSize: 10,
    color: "#4B1E01",
    marginTop: 15,
    opacity: 0.8,
    paddingHorizontal: 5
  },
  firstFooterNote: {
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  }
});

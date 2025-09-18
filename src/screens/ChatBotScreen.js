import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Image
} from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

const ChatBotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Welcome to AstroChat! 🔮 I\'m your personal AI astrologer. I can help you with horoscopes, birth chart readings, and cosmic guidance. What would you like to explore today?',
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const botResponses = [
    "The stars are aligning beautifully for you today! ✨ Your energy is particularly strong in matters of the heart.",
    "I sense great potential in your future. The planets suggest a period of growth and new opportunities ahead. 🌟",
    "Your zodiac sign indicates you're entering a transformative phase. Embrace the changes coming your way! 🌙",
    "The cosmic energy around you suggests it's time to trust your intuition. What does your heart tell you? 💫",
    "I see abundance flowing into your life soon. Stay open to unexpected blessings from the universe. 🪐",
    "Your birth chart reveals strong creative energies. Now is the perfect time to pursue your artistic passions! 🎨",
    "The moon phases suggest you should focus on self-care and inner reflection this week. 🌙",
    "Mercury is in a favorable position for communication. It's a great time to have important conversations. 💬",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isBot ? styles.botMessage : styles.userMessage
    ]}>
      {item.isBot && (
        <View style={styles.botAvatar}>
          <Image 
            source={require('../../assets/bot-icon.png')} 
            style={styles.botAvatarImage} 
            resizeMode="cover"
          />
        </View>
      )}
      <View style={[
        styles.messageContent,
        item.isBot ? styles.botMessageContent : styles.userMessageContent
      ]}>
        <Text style={[
          styles.messageText,
          item.isBot ? styles.botMessageText : styles.userMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp,
          item.isBot ? styles.botTimestamp : styles.userTimestamp
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.botMessage]}>
      <View style={styles.botAvatar}>
        <Text style={styles.botAvatarText}>🔮</Text>
      </View>
      <View style={[styles.messageContent, styles.botMessageContent, styles.typingContainer]}>
        <Text style={styles.typingText}>AstroBot is typing...</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Chat With Tejas</Text>
            <View style={styles.creditsButton}>
              <Text style={styles.creditsText}>⭐ 51</Text>
            </View>
            <TouchableOpacity style={styles.buyCreditsButton}>
              <Text style={styles.buyCreditsText}>+ Buy Credits</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.onlineContainer}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        ListFooterComponent={isTyping ? renderTypingIndicator : null}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about your horoscope, birth chart, or cosmic guidance..."
          placeholderTextColor={colors.gray}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isTyping}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: colors.white,
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
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
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
    maxWidth: '75%',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  botMessageContent: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 5,
  },
  userMessageContent: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 5,
    marginLeft: 'auto',
  },
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
  typingContainer: {
    backgroundColor: colors.lightGray,
  },
  typingText: {
    color: colors.gray,
    fontStyle: 'italic',
  },
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

export default ChatBotScreen;
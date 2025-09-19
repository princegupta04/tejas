import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors } from '../styles/globalStyles';
import { chatBotStyles } from '../styles/screenStyles';

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
      chatBotStyles.messageContainer,
      item.isBot ? chatBotStyles.botMessage : chatBotStyles.userMessage
    ]}>
      {item.isBot && (
        <View style={chatBotStyles.botAvatar}>
          <Image 
            source={require('../../assets/bot-icon.png')} 
            style={chatBotStyles.botAvatarImage} 
            resizeMode="cover"
          />
        </View>
      )}
      <View style={[
        chatBotStyles.messageContent,
        item.isBot ? chatBotStyles.botMessageContent : chatBotStyles.userMessageContent
      ]}>
        <Text style={[
          chatBotStyles.messageText,
          item.isBot ? chatBotStyles.botMessageText : chatBotStyles.userMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={[
          chatBotStyles.timestamp,
          item.isBot ? chatBotStyles.botTimestamp : chatBotStyles.userTimestamp
        ]}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[chatBotStyles.messageContainer, chatBotStyles.botMessage]}>
      <View style={[chatBotStyles.messageContent, chatBotStyles.botMessageContent, chatBotStyles.typingContainer]}>
        <Text style={chatBotStyles.typingText}>AstroBot is typing...</Text>
      </View>
    </View>
  );

  return (
    <View style={chatBotStyles.container}>
      <View style={chatBotStyles.header}>
        <TouchableOpacity 
          style={chatBotStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={chatBotStyles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={chatBotStyles.headerInfo}>
          <View style={chatBotStyles.titleRow}>
            <Text style={chatBotStyles.headerTitle}>Chat With Tejas</Text>
            <View style={chatBotStyles.creditsButton}>
              <Text style={chatBotStyles.creditsText}>⭐ 51</Text>
            </View>
            <TouchableOpacity style={chatBotStyles.buyCreditsButton}>
              <Text style={chatBotStyles.buyCreditsText}>+ Buy Credits</Text>
            </TouchableOpacity>
          </View>
          <View style={chatBotStyles.onlineContainer}>
            <View style={chatBotStyles.onlineDot} />
            <Text style={chatBotStyles.onlineText}>Online</Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={chatBotStyles.messagesList}
        contentContainerStyle={chatBotStyles.messagesContainer}
        ListFooterComponent={isTyping ? renderTypingIndicator : null}
      />

      <View style={chatBotStyles.inputContainer}>
        <TextInput
          style={chatBotStyles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask Tejas about your birth chart ."
          placeholderTextColor={colors.gray}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[chatBotStyles.sendButton, !inputText.trim() && chatBotStyles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isTyping}
        >
          <Text style={chatBotStyles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBotScreen;
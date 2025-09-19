import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { chatBotStyles } from "../styles/screenStyles";
import PurchaseCreditsModal from '../screens/PurchaseCreditsModal';


const ChatBotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Namaste 🙏 I am Tejas, your AI-powered astrologer. Ask me anything about your horoscope, kundli, or life path!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot reply
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "Your career path shows strong opportunities in leadership roles. The coming months favor learning new skills and bold steps in your profession 🌟",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        chatBotStyles.messageContainer,
        item.isBot ? chatBotStyles.botMessage : chatBotStyles.userMessage,
      ]}
    >
      {item.isBot && (
        <Image
          source={require("../../assets/bot-icon.png")}
          style={chatBotStyles.botAvatar}
        />
      )}
      <View
        style={[
          chatBotStyles.messageBubble,
          item.isBot
            ? chatBotStyles.botMessageBubble
            : chatBotStyles.userMessageBubble,
        ]}
      >
        <Text
          style={[
            chatBotStyles.messageText,
            item.isBot
              ? chatBotStyles.botMessageText
              : chatBotStyles.userMessageText,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={chatBotStyles.container}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#FFD580", "#FFB84D"]}
        style={chatBotStyles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={chatBotStyles.backButton}
        >
          <Text style={chatBotStyles.backText}>←</Text>
        </TouchableOpacity>
        <View style={chatBotStyles.headerCenter}>
          <Text style={chatBotStyles.headerTitle}>Chat With Tejas</Text>
          <View style={chatBotStyles.onlineRow}>
            <View style={chatBotStyles.onlineDot} />
            <Text style={chatBotStyles.onlineText}>Online</Text>
          </View>
        </View>
        <View style={chatBotStyles.headerRight}>
          <View style={chatBotStyles.creditsBox}>
            <Text style={chatBotStyles.creditsText}>⭐ 51</Text>
          </View>
          <TouchableOpacity
            style={chatBotStyles.buyCredits}
            onPress={() => {
              console.log('Opening modal...');
              setShowModal(true);
            }}
          >
            <Text style={chatBotStyles.buyCreditsText}>+ Buy Credits</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* CHAT */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={chatBotStyles.messagesContainer}
      />

      {/* INPUT */}
      <View style={chatBotStyles.inputRow}>
        <TextInput
          style={chatBotStyles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask Tejas about your birth chart"
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={chatBotStyles.sendButton}
          onPress={sendMessage}
          disabled={!inputText.trim() || isTyping}
        >
          <Text style={chatBotStyles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER CREDITS */}
      <View style={chatBotStyles.footerNote}>
        <Text style={chatBotStyles.footerText}>
          1 Credit = 1 Question ~ Each Query costs 1 credit
        </Text>
      </View>
      
      <PurchaseCreditsModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default ChatBotScreen;

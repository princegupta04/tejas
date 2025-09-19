import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { aboutStyles } from "../styles/screenStyles";

const AboutTejas = ({ navigation }) => {
  return (
    <View style={aboutStyles.container}>
      {/* Header Gradient */}
      <LinearGradient
        colors={["#FB9E3A", "#FBBF5D"]}
        style={aboutStyles.header}
      >
        <Text style={aboutStyles.headerText}>About Tejas</Text>
      </LinearGradient>

      {/* Profile Circle */}
      <View style={aboutStyles.profileWrapper}>
        <View style={aboutStyles.profileCircle}>
          <Image
            source={require("../../assets/pandit.png")}
            style={aboutStyles.profileImage}
          />
        </View>
      </View>

      {/* About Box */}
      <View style={aboutStyles.aboutBox}>
        <Text style={aboutStyles.aboutText}>
          Tejas is your AI-powered astrologer, crafted with the depth of Vedic
          astrology and the clarity of modern technology. With years of
          accumulated wisdom encoded into its design, Tejas guides you like an
          experienced astrologer—interpreting your horoscope, revealing hidden
          patterns in your kundli, and helping you understand the influence of
          celestial events on your life. Every interaction is designed to feel
          personal, insightful, and trustworthy, giving you practical and
          positive guidance whenever you seek answers.
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={aboutStyles.button}
        onPress={() => navigation.navigate("ChatBot")}
      >
        <Text style={aboutStyles.buttonText}>Chat with Tejas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutTejas;

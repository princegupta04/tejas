import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import  {creditModalStyles}  from "../styles/screenStyles";
import { Image } from "react-native";



const PurchaseCreditsModal = ({ visible, onClose }) => {
    console.log('Rendering PurchaseCreditsModal, visible:', visible);
  const creditOptions = [
    { credits: 10, price: "Rs.99" },
    { credits: 25, price: "Rs.199 (Best Value)", highlight: true },
    { credits: 50, price: "Rs.349" },
    { credits: 100, price: "Rs.599" },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={creditModalStyles.overlay}>
        <View style={creditModalStyles.modalBox}>
          {/* Icon */}
          <View style={creditModalStyles.iconCircle}>
            <Text style={creditModalStyles.iconText}>
                <Image style={{ width: 75, height: 70 }} source={require("../../assets/bag.png")} />
            </Text>
          </View>

          {/* Title */}
          <Text style={creditModalStyles.title}>Purchase Credits</Text>
          <Text style={creditModalStyles.subtitle}>
            Choose a credit package to continue using astrology services
          </Text>

          {/* Options */}
          {creditOptions.map((item, idx) =>
            item.highlight ? (
              <View key={idx} style={{ position: 'relative', width: '100%', alignItems: 'center' }}>
                <View style={creditModalStyles.bestValue}>
                  <Text style={creditModalStyles.bestValueText}>Best Value</Text>
                </View>
                <LinearGradient
                  colors={["#FFD580", "#FFB84D"]}
                  style={creditModalStyles.optionHighlight}
                >
                  <Text style={creditModalStyles.highlightOptionText}>
                    {item.credits} Credits - {item.price}
                  </Text>
                </LinearGradient>
              </View>
            ) : (
              <TouchableOpacity key={idx} style={creditModalStyles.option}>
                <Text style={creditModalStyles.optionText}>
                  {item.credits} Credits - {item.price}
                </Text>
              </TouchableOpacity>
            )
          )}

          {/* Cancel */}
          <TouchableOpacity style={creditModalStyles.cancelBtn} onPress={onClose}>
            <Text style={creditModalStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          {/* Footer Notes */}
          <View style={{ width: '100%', paddingHorizontal: 10 }}>
            <Text style={[creditModalStyles.footerNote, creditModalStyles.firstFooterNote]} numberOfLines={1} ellipsizeMode="tail">
              Secure Payments via Cashfree • All prices in Indian Rupees
            </Text>
            <Text style={creditModalStyles.footerNote}>
              1 Credit = 1 Question • No expiry on unused credits
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PurchaseCreditsModal;
 
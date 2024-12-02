import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

type MessageInputProps = {};

const MessageInput: React.FC<MessageInputProps> = ({}) => {
  return (
    <View style={styles.messageInputContainer}>
      <TextInput placeholder="Text your message" style={styles.inputBox} />
      <View style={styles.sendBtn}>
        <Ionicons name="send" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageInputContainer: {
    position: "absolute",
    padding: 8,
    width: "100%",
    backgroundColor: "#222529",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBox: {
    flex: 0.98,
    borderRadius: 12,
    backgroundColor: "black",
    height: 40,
  },
  sendBtn: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessageInput;

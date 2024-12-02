import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

type MessageInputProps = {};

const MessageInput: React.FC<MessageInputProps> = ({}) => {
  return (
    <View style={styles.messageInputContainer}>
      <TextInput
        placeholderTextColor={`#b9bbbe`}
        placeholder="Message # 😇 | tribe-chat"
        style={styles.inputBox}
      />
      <TouchableOpacity style={styles.sendBtn}>
        <Ionicons name="send" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  messageInputContainer: {
    position: "fixed",
    padding: 8,
    width: "100%",
    backgroundColor: "#222529",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBox: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "black",
    height: 40,
    fontSize: 16,
    color: "#b9bbbe",
    paddingLeft: 8,
  },
  sendBtn: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});

export default MessageInput;

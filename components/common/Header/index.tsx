import React, { ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Avatar from "@/components/common/Avatar";
import Ionicons from "@expo/vector-icons/Ionicons";

type HeaderProps = {
  title: string;
  onBackPress?: () => void;
  avatarUrl?: string;
  leftText?: string;
  rightIcon?: () => ReactNode;
};

const Header: React.FC<HeaderProps> = ({ title, rightIcon }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      {rightIcon && rightIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2c2f33",
    padding: 10,
  },
  leftIconButton: {
    marginRight: 10,
  },
  rightIconButton: {
    marginLeft: 10,
  },
  iconText: {
    color: "#ffffff",
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default Header;

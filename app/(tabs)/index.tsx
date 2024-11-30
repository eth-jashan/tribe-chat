import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  return <SafeAreaView></SafeAreaView>;
};

const styles = StyleSheet.create({
  messageItem: {},
});
export default HomeScreen;

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
interface HeaderProps {}
export default function Header({}: HeaderProps) {
  return <View style={{ width, padding: 12 }}></View>;
}

const styles = StyleSheet.create({});

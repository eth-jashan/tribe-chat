import AvatarStoryList from "@/components/HomeScreenComponents/AvatarStoryList";
import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { allMessages, participantsData } from "../dummyData";
import ParticipantList from "@/components/HomeScreenComponents/ParticipantList";
import VerticalMessageList from "@/components/HomeScreenComponents/VerticalMessageList";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  return <VerticalMessageList onMessagePress={() => {}} data={allMessages} />;
};

const styles = StyleSheet.create({
  messageItem: {},
});
export default HomeScreen;

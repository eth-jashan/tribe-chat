import AvatarStoryList from "@/components/HomeScreenComponents/AvatarStoryList";
import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { participantsData } from "../../dummyData";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  return (
    <SafeAreaView style={{}}>
      <AvatarStoryList onAvatarPress={() => {}} data={participantsData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageItem: {},
});
export default HomeScreen;

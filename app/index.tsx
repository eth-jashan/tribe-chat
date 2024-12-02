import AvatarStoryList from "@/components/HomeScreenComponents/AvatarStoryList";
import React, { useRef } from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { allMessages, participantsData } from "../dummyData";
import ParticipantList from "@/components/HomeScreenComponents/ParticipantList";
import VerticalMessageList from "@/components/HomeScreenComponents/VerticalMessageList";
import { Modalize } from "react-native-modalize";
import Header from "@/components/common/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const modalizeMessageRef = useRef<Modalize>(null);

  const onOpenMessageLongPress = () => {
    modalizeMessageRef.current?.open();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="#tribe-chat"
        rightIcon={() => <FontAwesome name="group" size={20} color="white" />}
      />
      <VerticalMessageList
        onLongMessagePress={() => onOpenMessageLongPress()}
        onMessagePress={() => {}}
      />

      <Modalize modalHeight={height * 0.2} ref={modalizeMessageRef}>
        <View style={{ flex: 1, backgroundColor: "#2c2f33" }}></View>
      </Modalize>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2c2f33", // Makes the notch area background color dark
  },
});
export default HomeScreen;

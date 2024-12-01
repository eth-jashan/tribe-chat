import AvatarStoryList from "@/components/HomeScreenComponents/AvatarStoryList";
import React, { useRef } from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { allMessages, participantsData } from "../dummyData";
import ParticipantList from "@/components/HomeScreenComponents/ParticipantList";
import VerticalMessageList from "@/components/HomeScreenComponents/VerticalMessageList";
import { Modalize } from "react-native-modalize";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <View>
      <VerticalMessageList
        onLongMessagePress={() => {
          onOpen();
        }}
        onMessagePress={() => {}}
        data={allMessages}
      />
      <Modalize modalHeight={height * 0.2} ref={modalizeRef}>
        <View style={{ flex: 1, backgroundColor: "#2c2f33" }}></View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  messageItem: {},
});
export default HomeScreen;

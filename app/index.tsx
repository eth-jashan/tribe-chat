import AvatarStoryList from "@/components/HomeScreenComponents/AvatarStoryList";
import React, { useRef, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { allMessages, participantsData } from "../dummyData";
import ParticipantList from "@/components/HomeScreenComponents/ParticipantList";
import VerticalMessageList from "@/components/HomeScreenComponents/VerticalMessageList";
import { Modalize } from "react-native-modalize";
import Header from "@/components/common/Header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MessageInput from "@/components/common/MessageInput";
import ReactionParticipantList from "@/components/HomeScreenComponents/ReactionParticipantList";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const modalizeMessageRef = useRef<Modalize>(null);
  const modalizeParticipantRef = useRef<Modalize>(null);
  const [currentOpenedMessage, setOpenedMessage] = useState(false);

  const onOpenMessageLongPress = (message) => {
    modalizeMessageRef.current?.open();
    setOpenedMessage(message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="#tribe-chat"
        rightIcon={() => (
          <FontAwesome
            onPress={() => {
              modalizeParticipantRef.current?.open();
            }}
            name="group"
            size={20}
            color="white"
          />
        )}
      />
      <VerticalMessageList
        onLongMessagePress={() => {}}
        onMessagePress={(message) => onOpenMessageLongPress(message)}
      />
      <MessageInput />
      <Modalize modalHeight={height * 0.9} ref={modalizeParticipantRef}>
        <ParticipantList
          onParticipantPress={() => console.log("Participant Pressed !!!!!!")}
        />
      </Modalize>
      <Modalize modalHeight={height * 0.3} ref={modalizeMessageRef}>
        <ReactionParticipantList reactions={currentOpenedMessage?.reactions} />
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

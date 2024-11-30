import Avatar from "@/components/common/Avatar";
import { Participant } from "@/constants/commonTypes";
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

type VerticalParticipantListProps = {
  data: Array<Participant>;
  onParticipantPress: (item: Participant) => void;
};

type ParticipantData = {
  uuid: string;
  name: string;
  bio?: string;
  avatarUrl: string;
};

const ParticipantList: React.FC<VerticalParticipantListProps> = ({
  data,
  onParticipantPress,
}) => {
  const renderParticipantItem = ({ item }: { item: Participant }) => (
    <TouchableOpacity
      style={styles.participantContainer}
      onPress={() => onParticipantPress(item)}
    >
      <Avatar uri={item.avatarUrl} style={styles.avatar} />
      <View style={styles.participantContent}>
        <Text style={styles.participantName}>{item.name}</Text>
        {item.bio && <Text style={styles.participantBio}>{item.bio}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderParticipantItem}
        keyExtractor={(item) => item.uuid}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  participantContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  participantContent: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  participantBio: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});

export default ParticipantList;

// Usage Example
// <VerticalParticipantList data={participants} onParticipantPress={(item) => console.log('Pressed on:', item)} />
// 'participants' should be an array of participant objects like the provided example.

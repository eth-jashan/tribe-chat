import Avatar from "@/components/common/Avatar";
import { useParticipantStore } from "@/store/useProfileStore";
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

type VerticalParticipantListProps = {
  reactions: Array<{
    uuid: string;
    participantUuid: string;
    value: string;
  }>;
};

const ReactionParticipantList: React.FC<VerticalParticipantListProps> = ({
  reactions,
}) => {
  const { participants } = useParticipantStore();

  const renderParticipantItem = ({
    item,
  }: {
    item: {
      uuid: string;
      participantUuid: string;
      value: string;
    };
  }) => {
    const currentParticipant = participants.filter(
      (x) => x.uuid === item.participantUuid
    );
    return (
      <TouchableOpacity style={styles.participantContainer}>
        <Avatar uri={currentParticipant[0].avatarUrl} style={styles.avatar} />
        <View style={styles.participantContent}>
          <Text style={styles.participantName}>
            {currentParticipant[0].name}
          </Text>
          {item.value && (
            <Text style={styles.participantBio}>{item.value}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reactions}
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

export default ReactionParticipantList;

// Usage Example
// <VerticalParticipantList data={participants} onParticipantPress={(item) => console.log('Pressed on:', item)} />
// 'participants' should be an array of participant objects like the provided example.

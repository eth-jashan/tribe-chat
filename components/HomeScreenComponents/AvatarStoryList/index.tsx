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

type AvatarStoryListProps = {
  data: Array<Participant>;
  onAvatarPress: (item: Participant) => void;
};

const AvatarStoryList: React.FC<AvatarStoryListProps> = ({
  data,
  onAvatarPress,
}) => {
  const renderItem = ({ item }: { item: Participant }) => (
    <TouchableOpacity
      style={styles.avatarContainer}
      onPress={() => onAvatarPress(item)}
    >
      <Avatar uri={item.avatarUrl} style={styles.avatar} />
      <Text style={styles.name}>{item.name?.split(" ")[0]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    // borderWidth: 2,
    // borderColor: "#d62976", // Instagram-like gradient border color
  },
  name: { fontSize: 14, marginTop: "1%", fontWeight: "500", color: "black" },
});

export default AvatarStoryList;

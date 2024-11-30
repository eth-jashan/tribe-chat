import Avatar from "@/components/common/Avatar";
import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";

type AvatarStoryListProps = {
  data: Array<{ id: string; avatarUrl: string }>;
  onAvatarPress: (item: { id: string; avatarUrl: string }) => void;
};

const AvatarStoryList: React.FC<AvatarStoryListProps> = ({
  data,
  onAvatarPress,
}) => {
  const renderItem = ({
    item,
  }: {
    item: { id: string; avatarUrl: string };
  }) => (
    <TouchableOpacity
      style={styles.avatarContainer}
      onPress={() => onAvatarPress(item)}
    >
      <Avatar uri={item.avatarUrl} style={styles.avatar} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    borderWidth: 2,
    borderColor: "#d62976", // Instagram-like gradient border color
  },
});

export default AvatarStoryList;

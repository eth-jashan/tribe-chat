import React from "react";
import { Image, StyleSheet } from "react-native";

type AvatarProps = {
  uri: string;
  style?: object;
};

const Avatar: React.FC<AvatarProps> = ({ uri, style }) => {
  return <Image source={{ uri }} style={[styles.avatar, style]} />;
};

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Avatar;

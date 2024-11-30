import React from "react";
import { View, LayoutChangeEvent } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import AnimatedGradient from "./AnimatedGradient";
// import AnimatedGradient from "./AnimatedGradient";

interface GradientMaskProps {
  children: React.ReactNode;
  scrollY: Animated.SharedValue<number>;
  layout: { height: number };
}

export default function GradientMask({
  children,
  scrollY,
  layout,
}: GradientMaskProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value }],
  }));

  return (
    <MaskedView
      renderToHardwareTextureAndroid
      maskElement={
        <View
          renderToHardwareTextureAndroid
          onLayout={(event: LayoutChangeEvent) =>
            (layout.height = event.nativeEvent.layout.height)
          }
          style={{ backgroundColor: "transparent" }}
        >
          {children}
        </View>
      }
    >
      <View style={{ height: layout.height }}>
        {children}
        <AnimatedGradient animatedStyle={animatedStyle} />
      </View>
    </MaskedView>
  );
}

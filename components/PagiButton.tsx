import { Pressable, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";

interface Props {
  currentIndex: SharedValue<number>;
  length: number;
  flatListRef: any;
  setOnboard: (value: boolean) => void;
}
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button: React.FC<Props> = ({
  currentIndex,
  length,
  flatListRef,
  setOnboard,
}) => {
  const router = useRouter();

  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width:
        currentIndex.value === length - 1 ? withSpring(140) : withSpring(60),
      height: 60,
    };
  }, [currentIndex, length]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      setOnboard(false);
      router.replace("/(tabs)/settings");
      return;
    } else {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, []);

  return (
    <AnimatedPressable style={[styles.container, rnBtnStyle]} onPress={onPress}>
      <Animated.Text style={[styles.textStyle, rnTextStyle]}>
        START
      </Animated.Text>
      <Animated.Image
        source={require("../assets/images/icons/rightArrow.png")}
        style={[styles.imageStyle, imageAnimatedStyle]}
      />
    </AnimatedPressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    boxShadow:
      "2px 2px 2px rgba(0, 0, 0, 1), inset 2px 2px 2px rgba(255, 255, 255, .25)",
    backgroundColor: colors.dark.background,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  textStyle: {
    color: colors.dark.text,
    position: "absolute",
    fontFamily: "ComfortaaBold",
    fontSize: 16,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
});

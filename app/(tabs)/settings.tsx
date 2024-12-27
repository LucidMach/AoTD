import TimeButton from "@/components/TimeButton";
import { colors } from "@/constants/Colors";
import React from "react";
import { View, Text, Image } from "react-native";

const Settings: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: colors.dark.background,
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: colors.dark.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/icons/adaptive-icon.png")}
          style={{ width: 256, height: 256 }}
          resizeMode="contain"
        />

        <Text
          style={{
            color: colors.dark.text,
            textAlign: "center",
            fontFamily: "JustAnotherHand",
            fontSize: 40,
            letterSpacing: 5,
          }}
        >
          Daily Adventures
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <TimeButton title="Morning Alert" />
        <TimeButton title="Evening Alert" />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          built with ❤️
        </Text>
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          ©2025 lucidmach
        </Text>
      </View>
    </View>
  );
};

export default Settings;

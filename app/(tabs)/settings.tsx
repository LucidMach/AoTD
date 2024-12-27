import TimeButton from "@/components/TimeButton";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/Colors";
import useNotifications from "@/hooks/useNotifications";

import React from "react";
import { View, Text, Image } from "react-native";

const Settings: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: colors.dark.background,
        flex: 1,
      }}
    >
      <TopBar />
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
          <TimeButton
            title="Morning Alert"
            notificationTitle="Choose your #AoTD"
            notificationBody="Adventure of the Day is waiting for you"
          />
          <TimeButton
            title="Evening Alert"
            notificationTitle="Reflect on your #AoTD"
            notificationBody="so what was the most memorable part of your day?"
          />
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
    </View>
  );
};

export default Settings;

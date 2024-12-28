import TimeButton from "@/components/TimeButton";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";
import schedulePushNotification from "@/hooks/schedulePushNotification";

import React, { useState } from "react";
import { View, Text, Image } from "react-native";

const Settings: React.FC = () => {
  const [morningTime, setMorningTime] = useState<Date>();
  const [eveningTime, setEveningTime] = useState<Date>();

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
            time={morningTime}
            setTime={setMorningTime}
            scheduler={async (selectedDate: Date) => {
              await schedulePushNotification(
                selectedDate,
                eveningTime || new Date()
              );
            }}
          />
          <TimeButton
            title="Evening Alert"
            time={eveningTime}
            setTime={setEveningTime}
            scheduler={async (selectedDate: Date) => {
              await schedulePushNotification(
                morningTime || new Date(),
                selectedDate
              );
            }}
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

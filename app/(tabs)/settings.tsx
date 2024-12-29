import TimeButton from "@/components/TimeButton";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";
import schedulePushNotification from "@/hooks/schedulePushNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

const Settings: React.FC = () => {
  const [morningTime, setMorningTime] = useState<Date>();
  const [eveningTime, setEveningTime] = useState<Date>();

  // get the morning time from async storage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("morningTime");
        if (value !== null) {
          setMorningTime(new Date(parseInt(value)));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  // get the evening time from async storage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("eveningTime");
        if (value !== null) {
          setEveningTime(new Date(parseInt(value)));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  // Store the morning time in async storage
  useEffect(() => {
    const storeData = async (value: Date) => {
      try {
        await AsyncStorage.setItem("morningTime", value.getTime().toString());
      } catch (e) {
        console.log(e);
      }
    };

    morningTime && storeData(morningTime);
  }, [morningTime]);

  // Store the evening time in async storage
  useEffect(() => {
    const storeData = async (value: Date) => {
      try {
        await AsyncStorage.setItem("eveningTime", value.getTime().toString());
      } catch (e) {
        console.log(e);
      }
    };

    eveningTime && storeData(eveningTime);
  }, [eveningTime]);

  return (
    <SafeAreaView
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
            }}
          >
            #AoTD
          </Text>
          <Text
            style={{
              color: colors.dark.textTint,
              textAlign: "center",
              fontFamily: "JustAnotherHand",
              fontSize: 24,
              letterSpacing: 2,
            }}
          >
            Adventure Of The Day
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
    </SafeAreaView>
  );
};

export default Settings;

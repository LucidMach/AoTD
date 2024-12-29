import OnBoard from "@/components/OnBoard";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";

import { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function HomeScreen() {
  const [onboard, setOnboard] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("onboard");
        if (value !== null) {
          setOnboard(value === "true" ? true : false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const storeData = async (value: boolean) => {
      try {
        await AsyncStorage.setItem("onboard", value.toString());
      } catch (e) {
        console.log(e);
      }
    };

    storeData(onboard);
  }, [onboard]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.dark.background,
      }}
    >
      {onboard && (
        <Modal>
          <OnBoard setOnboard={setOnboard} />
        </Modal>
      )}
      <TopBar />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ color: colors.dark.text, fontFamily: "JustAnotherHand" }}
        >
          #AoTD
        </Text>
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          Log
        </Text>
      </View>
      <View
        style={{
          backgroundColor: colors.dark.background,
          flexDirection: "row",
          paddingHorizontal: 16,
          marginHorizontal: 16,
          width: "90%",
          justifyContent: "space-between",
          paddingVertical: 8,
          borderRadius: 100,
          boxShadow:
            "2px 2px 2px rgba(0, 0, 0, 1), inset 2px 2px 2px rgba(255, 255, 255, .25)",
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            color: colors.dark.text,
            fontFamily: "ComfortaaBold",
          }}
        >
          Today
        </Text>
        <TouchableOpacity onPress={() => router.push("/prompt")}>
          <Text
            style={{
              marginHorizontal: 8,
              color: colors.dark.textTint,
              fontFamily: "ComfortaaBold",
            }}
          >
            _______________________________________
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

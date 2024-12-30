import OnBoard from "@/components/OnBoard";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";
import adventure from "@/interfaces/adventure";
import fetchOnboardData from "@/hooks/fetchOnboardData";
import loadAdventuresData from "@/hooks/fetchAdventuresData";

import { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function HomeScreen() {
  const [onboard, setOnboard] = useState<boolean>(true);
  const [adventures, setAdventures] = useState<adventure[]>([]);
  const [aotd, setAotd] = useState<adventure>();

  useEffect(() => {
    const getData = async () => {
      await fetchOnboardData(setOnboard);
      const data = await loadAdventuresData(setAdventures, adventures);
      console.log(data);
    };

    // get some data from asyncStorage
    getData();
  }, []);

  useEffect(() => {
    // set AoTD
    adventures.forEach((adventure) => {
      const adventureDay = new Date(adventure.timestamp).getDate();
      const today = new Date().getDate();
      if (today === adventureDay) {
        setAotd(adventure);
      }
    });
  }, [adventures]);

  // store onboard status on asyncStorage
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
          <FlatList
            data={adventures}
            renderItem={({ item }) => {
              return (
                <Text style={{ color: colors.dark.text }}>
                  {item.adventure}
                </Text>
              );
            }}
          />
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
        {aotd ? (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => router.push("/reflect")}
          >
            <Text
              style={{
                textAlign: "center",
                marginHorizontal: 8,
                color: colors.dark.textTint,
                fontFamily: "ComfortaaBold",
              }}
            >
              {aotd.adventure}
            </Text>
          </TouchableOpacity>
        ) : (
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
        )}
      </View>
    </SafeAreaView>
  );
}

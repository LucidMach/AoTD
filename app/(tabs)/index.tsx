import OnBoard from "@/components/OnBoard";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";
import adventure from "@/interfaces/adventure";
import loadOnboardData from "@/hooks/loadOnboardData";
import loadAdventuresData from "@/hooks/loadAdventuresData";

import { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import memory from "@/interfaces/memory";
import loadMemoriesData from "@/hooks/loadMemoriesData";
import { SCREEN_WIDTH } from "@/constants/screenDims";

export default function HomeScreen() {
  const [onboard, setOnboard] = useState<boolean>(true);
  const [adventures, setAdventures] = useState<adventure[]>([]);
  const [aotd, setAotd] = useState<adventure>();
  const [memories, setMemories] = useState<memory[]>([]);

  useEffect(() => {
    const getData = async () => {
      // to clean memoriesV
      // await AsyncStorage.setItem("memories", JSON.stringify([]));

      // to clean adventures
      // await AsyncStorage.setItem("adventures", JSON.stringify([]));

      await loadOnboardData(setOnboard);
      const adventureData = await loadAdventuresData(setAdventures, adventures);
      const memoryData = await loadMemoriesData(setMemories, memories);

      console.log(adventureData);
      console.log(memoryData);
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
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <TopBar />
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: colors.dark.text,
              fontSize: 24,
              fontFamily: "ComfortaaRegular",
            }}
          >
            log of memories
          </Text>
          <Text
            style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
          >
            all your memories logged will appear here
          </Text>
          <FlatList
            style={{ margin: 16, width: SCREEN_WIDTH, flexGrow: 0 }}
            data={memories}
            renderItem={({ item }) => {
              const day = new Date(item.timestamp);
              return (
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={{ color: colors.dark.text }}>
                    {day.getDate()} / {day.getMonth()} / {day.getFullYear()}
                  </Text>
                  <Text style={{ color: colors.dark.textTint }}>
                    {item.memory}
                  </Text>
                </View>
              );
            }}
          />
        </View>
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

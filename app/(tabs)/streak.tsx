import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Streak() {
  const [streak, setStreak] = useState<number>(0);
  const [streakFreeze, setStreakFreeze] = useState<number>(0);

  const rules = [
    {
      number: 1,
      title: "increase streak",
      desc: "log your most memorable thing for the day",
    },
    {
      number: 2,
      title: "earn streak freezes",
      desc: "complete your daily adventure",
    },
    {
      number: 3,
      title: "loose streak",
      desc: "if you run out of streak freezes and still do nothing, your streak resets",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("streak");
        if (value !== null) {
          setStreak(parseInt(value));
        }
      } catch (e) {
        console.log(e);
      }
      try {
        const value = await AsyncStorage.getItem("streakFreeze");
        if (value !== null) {
          setStreak(parseInt(value));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.dark.background,
      }}
    >
      <TopBar />
      <View
        style={{
          flex: 1,
          gap: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../assets/images/icons/streak.png")} />
          <Text
            style={{
              color: colors.dark.background,
              fontSize: 48,
              fontFamily: "ComfortaaBold",
              position: "absolute",
              top: 48,
            }}
          >
            {streak}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: colors.dark.text,
              fontFamily: "JustAnotherHand",
              fontSize: 48,
            }}
          >
            rules
          </Text>
          <FlatList
            style={{ flexGrow: 0 }}
            data={rules}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 32,
                  marginVertical: 8,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    color: colors.dark.text,
                    fontFamily: "ComfortaaRegular",
                  }}
                >
                  {item.number}. {item.title}
                </Text>
                <Text
                  style={{
                    color: colors.dark.textTint,
                    fontFamily: "ComfortaaRegular",
                  }}
                >
                  {item.desc}
                </Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 100,
            gap: 8,
            paddingHorizontal: 32,
            paddingVertical: 8,
            boxShadow:
              "2px 2px 2px rgba(0, 0, 0, 1), inset 2px 2px 2px rgba(255, 255, 255, .25)",
          }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/images/icons/freeze.png")}
          />
          <Text
            style={{
              color: colors.dark.text,
              fontFamily: "ComfortaaRegular",
            }}
          >
            streak freezes: {streakFreeze}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

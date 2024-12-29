import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Streak() {
  const [streak, setStreak] = useState<number>(0);

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
    };

    getData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.dark.background,
      }}
    >
      <TopBar />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          rules
        </Text>
      </View>
    </SafeAreaView>
  );
}

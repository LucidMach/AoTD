import TopBar from "@/components/TopBar";
import { colors } from "@/constants/Colors";
import { View, Text } from "react-native";

export default function Streak() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.dark.background,
      }}
    >
      <TopBar />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ color: colors.dark.text, fontFamily: "JustAnotherHand" }}
        >
          streak
        </Text>
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          rules
        </Text>
      </View>
    </View>
  );
}

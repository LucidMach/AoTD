import { colors } from "@/constants/Colors";
import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.dark.background,
      }}
    >
      <Text style={{ color: colors.dark.text, fontFamily: "JustAnotherHand" }}>
        Hi
      </Text>
      <Text style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}>
        Hi
      </Text>
    </View>
  );
}

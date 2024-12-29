import { colors } from "@/constants/colors";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReflectScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.dark.background,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ color: colors.dark.text, fontFamily: "JustAnotherHand" }}
        >
          #AoTD
        </Text>
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          Reflect
        </Text>
      </View>
    </SafeAreaView>
  );
}

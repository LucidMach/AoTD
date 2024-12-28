import OnBoard from "@/components/OnBoard";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";
import { useState } from "react";
import { View, Text, Modal } from "react-native";

export default function HomeScreen() {
  const [onboard, setOnboard] = useState<boolean>(true);

  return (
    <View
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
    </View>
  );
}

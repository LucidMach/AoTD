import OnBoard from "@/components/OnBoard";
import { colors } from "@/constants/Colors";
import { useState } from "react";
import { View, Text, Modal } from "react-native";

export default function HomeScreen() {
  const [onboard, setOnboard] = useState<boolean>(true);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.dark.background,
      }}
    >
      {/* <Text style={{ color: colors.dark.text, fontFamily: "JustAnotherHand" }}>
        Hi
      </Text>
      <Text style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}>
        Hi
      </Text> */}
      {onboard && (
        <Modal>
          <OnBoard setOnboard={setOnboard} />
        </Modal>
      )}
    </View>
  );
}

import { colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import SVG, { Path } from "react-native-svg";

const TopBar: React.FC = () => {
  const [streak, setStreak] = useState(0);
  const router = useRouter();

  return (
    <View
      style={{
        justifyContent: "space-between",
        width: "100%",
        top: 60,
        backgroundColor: colors.dark.background,
        paddingHorizontal: 16,
        alignItems: "center",
        position: "fixed",
        zIndex: 100,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: colors.dark.background,
          padding: 8,
          borderRadius: 100,
          boxShadow:
            "2px 2px 2px rgba(0, 0, 0, 1), inset 2px 2px 2px rgba(255, 255, 255, .25)",
        }}
        onPress={() => router.push("/(tabs)")}
      >
        <SVG width="24" height="24" viewBox="0 0 24 24" fill={colors.dark.text}>
          <Path
            d="m3.3 15.4c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.85c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6.55c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.3c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7.75c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
            fill-rule="nonzero"
          />
        </SVG>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: colors.dark.background,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 100,
          boxShadow:
            "2px 2px 2px rgba(0, 0, 0, 1), inset 2px 2px 2px rgba(255, 255, 255, .25)",
        }}
        onPress={() => router.push("/(tabs)/streak")}
      >
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          streak: {streak}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: colors.dark.background,
          padding: 8,
          borderRadius: 100,
          boxShadow:
            "2px 2px 2px rgba(0, 0, 0, 1), inset 2px 2px 2px rgba(255, 255, 255, .25)",
        }}
        onPress={() => router.push("/(tabs)/settings")}
      >
        <SVG width="20" height="20" viewBox="0 0 24 24" fill={colors.dark.text}>
          <Path d="M24 13.616v-3.232c-1.651-.587-2.693-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.749-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.743-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 3.384c-2.762 0-5-2.239-5-5s2.238-5 5-5 5 2.239 5 5-2.238 5-5 5zm3-5c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3z" />
        </SVG>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

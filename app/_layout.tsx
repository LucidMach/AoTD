import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    JustAnotherHand: require("../assets/fonts/JustAnotherHand-Regular.ttf"),
    ComfortaaLight: require("../assets/fonts/Comfortaa-Light.ttf"),
    ComfortaaRegular: require("../assets/fonts/Comfortaa-Regular.ttf"),
    ComfortaaMedium: require("../assets/fonts/Comfortaa-Medium.ttf"),
    ComfortaaSemiBold: require("../assets/fonts/Comfortaa-SemiBold.ttf"),
    ComfortaaBold: require("../assets/fonts/Comfortaa-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

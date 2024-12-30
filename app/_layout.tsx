import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import * as Notifications from "expo-notifications";

import { db } from "@/db/client";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

function useLoadAssets() {
  const [hasLoadedFonts, loadingFontsError] = useFonts({
    JustAnotherHand: require("../assets/fonts/JustAnotherHand-Regular.ttf"),
    ComfortaaLight: require("../assets/fonts/Comfortaa-Light.ttf"),
    ComfortaaRegular: require("../assets/fonts/Comfortaa-Regular.ttf"),
    ComfortaaMedium: require("../assets/fonts/Comfortaa-Medium.ttf"),
    ComfortaaSemiBold: require("../assets/fonts/Comfortaa-SemiBold.ttf"),
    ComfortaaBold: require("../assets/fonts/Comfortaa-Bold.ttf"),
  });

  const { success: hasRunMigrations, error: runningMigrationError } =
    useMigrations(db, migrations);

  useEffect(() => {
    if (loadingFontsError) throw loadingFontsError;
    if (runningMigrationError) throw runningMigrationError;
  }, [loadingFontsError, runningMigrationError]);

  useEffect(() => {
    if (hasLoadedFonts && hasRunMigrations) {
      SplashScreen.hideAsync();
    }
  }, [hasLoadedFonts, hasRunMigrations]);

  return { isLoaded: hasLoadedFonts && hasRunMigrations };
}

export default function RootLayout() {
  useNotificationObserver();

  const { isLoaded } = useLoadAssets();
  if (!isLoaded) return null;

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="prompt" options={{ headerShown: false }} />
        <Stack.Screen name="reflect" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

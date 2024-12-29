import { colors } from "@/constants/colors";
import { qoutes } from "@/constants/qoutes";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PromptScreen() {
  const backgroundImages = [
    require("@/assets/images/evening/0.jpg"),
    require("@/assets/images/evening/2.jpg"),
    require("@/assets/images/evening/3.jpg"),
    require("@/assets/images/evening/4.jpg"),
    require("@/assets/images/evening/5.jpg"),
  ];
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  }, []);

  // Randomize quote
  const randomTip = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * qoutes.length);
    return qoutes[randomIndex];
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ImageBackground
          source={randomImage}
          style={styles.image}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <Text style={styles.text}>How did your adventure go?</Text>
            <Text style={styles.aotd}>this is the previous adventure</Text>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => router.replace("/reflect")}
            >
              <Text style={styles.aotd}>Sucess</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => router.replace("/reflect")}
            >
              <Text style={styles.aotd}>[SKIP]</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newcontainer}>
            <Text style={styles.smalltext}>tip: {randomTip}</Text>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullcontainer: {
    flexDirection: "column",
  },
  container: {
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    boxShadow:
      "2px 2px 2px rgba(0, 0, 0, 0.21), inset 2px 2px 2px rgba(255, 255, 255, .25)",
    backgroundColor: "rgba(0, 0, 0, 0.26)",
    alignItems: "center",
    justifyContent: "center",
  },
  newcontainer: {
    flexDirection: "column",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    boxShadow:
      "2px 2px 2px rgba(0, 0, 0, 0.21), inset 2px 2px 2px rgba(255, 255, 255, .25)",
    backgroundColor: "rgba(0, 0, 0, 0.26)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  smalltext: {
    fontFamily: "ComfertaaLight",
    color: colors.dark.text,
    opacity: 0.7,
    fontSize: 12,
    textShadowColor: "black",
    textShadowRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: colors.dark.text,
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "JustAnotherHand",
  },
  aotd: {
    color: "white",
    opacity: 0.8,
    fontSize: 30,
    textShadowColor: "black",
    textShadowRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "JustAnotherHand",
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#00B972",
    padding: 20,
    borderRadius: 10,
  },
  button2: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});

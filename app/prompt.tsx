import { colors } from "@/constants/colors";
import { qoutes } from "@/constants/qoutes";
import adventure from "@/interfaces/adventure";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PromptScreen() {
  const [pageNO, setPageNo] = useState<number>(0);
  const [adventure, setAdventure] = useState<string>();

  // store adventure in async storage
  useEffect(() => {
    const storeData = async () => {
      if (adventure) {
        try {
          const data = await AsyncStorage.getItem("adventures");

          if (data) {
            const timestamp = new Date().getTime();
            const adventures: adventure[] = JSON.parse(data);
            await AsyncStorage.setItem(
              "adventures",
              JSON.stringify([...adventures, { timestamp, adventure }])
            );
          } else {
            const adventureItem: adventure = {
              timestamp: new Date().getTime(),
              adventure,
            };
            await AsyncStorage.setItem(
              "adventures",
              JSON.stringify([adventureItem])
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    storeData();
  }, [adventure]);

  const backgroundImages = [
    require("@/assets/images/morning/0.jpg"),
    require("@/assets/images/morning/2.jpg"),
    require("@/assets/images/morning/3.jpg"),
    require("@/assets/images/morning/4.jpg"),
    require("@/assets/images/morning/5.jpg"),
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
            <Text style={styles.text}>What is your adventure today?</Text>
            <TextInput
              onSubmitEditing={(event) => {
                setAdventure(event.nativeEvent.text);
                router.push("/");
              }}
              style={{
                fontFamily: "ComfertaaLight",
                color: colors.dark.text,
                borderBottomWidth: 1,
                borderColor: colors.dark.text,
                width: 300,
                marginBottom: 8,
                textAlign: "center",
              }}
            />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  newcontainer: {
    flexDirection: "column",
    paddingHorizontal: 24,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    boxShadow:
      "2px 2px 2px rgba(0, 0, 0, 0.21), inset 2px 2px 2px rgba(255, 255, 255, .25)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
});
function useMigrations(db: any, migrations: any): { success: any; error: any } {
  throw new Error("Function not implemented.");
}

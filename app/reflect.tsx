import MemoryInput from "@/components/MemoryInput";
import { colors } from "@/constants/colors";
import { qoutes } from "@/constants/qoutes";
import { SCREEN_WIDTH } from "@/constants/screenDims";
import loadAdventuresData from "@/hooks/loadAdventuresData";
import loadMemoriesData from "@/hooks/loadMemoriesData";
import adventure from "@/interfaces/adventure";
import memory from "@/interfaces/memory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

// todo update adventures when aotd get updated
export default function PromptScreen() {
  const [pageNO, setPageNo] = useState<number>(0);
  const [adventures, setAdventures] = useState<adventure[]>([]); // for AoTD
  const [aotd, setAotd] = useState<adventure>();

  const [memory, setMemory] = useState<string>();

  // store adventure in async storage
  useEffect(() => {
    const storeData = async () => {
      if (memory) {
        try {
          const data = await AsyncStorage.getItem("memories");

          const timestamp = new Date().getTime();
          const newMemory: memory = {
            timestamp,
            memory,
          };

          if (data) {
            const memories: memory[] = JSON.parse(data);

            await AsyncStorage.setItem(
              "memories",
              JSON.stringify([...memories, newMemory])
            );
          } else {
            await AsyncStorage.setItem("memories", JSON.stringify([newMemory]));
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    storeData();
  }, [memory]);

  useEffect(() => {
    const getData = async () => {
      await loadAdventuresData(setAdventures, adventures);
    };

    // get some data from asyncStorage
    getData();
  }, []);

  useEffect(() => {
    // set AoTD
    adventures.forEach((adventure) => {
      const adventureDay = new Date(adventure.timestamp).getDate();
      const today = new Date().getDate();
      if (today === adventureDay) {
        setAotd(adventure);
      }
    });
  }, [adventures]);

  const backgroundImages = [
    require("@/assets/images/evening/0.jpg"),
    require("@/assets/images/evening/2.jpg"),
    require("@/assets/images/evening/3.jpg"),
    require("@/assets/images/evening/4.jpg"),
    require("@/assets/images/evening/5.jpg"),
  ];

  const today = useMemo(() => {
    if (aotd) {
      const datetime = new Date(aotd.timestamp);  
      
      return datetime;
    }
  }, [aotd]);
 

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
    <View
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
            {pageNO === 0 ? (
              <View>
                <Text
                  style={{
                    color: colors.dark.text,
                    fontSize: 42,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontFamily: "JustAnotherHand",
                    margin: -8,
                  }}
                >
                  How did your adventure go?
                </Text>
                <Text
                  style={{
                    color: colors.dark.text,
                    opacity: 0.8,
                    fontSize: 16,
                    textShadowColor: "black",
                    textShadowRadius: 10,
                    textAlign: "center",
                  }}
                >
                  [{aotd?.adventure}]
                </Text>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#00B972",
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                    marginTop: 8,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    aotd &&
                      setAotd((aotd) => {
                        if (aotd)
                          return {
                            timestamp: aotd?.timestamp,
                            completed: true,
                            adventure: aotd?.adventure,
                          };
                      });
                    setPageNo(1);
                  }}
                >
                  <Text
                    style={{
                      color: colors.dark.text,
                      fontSize: 16,
                      fontFamily: "ComfortaaLight",
                      textShadowColor: "black",
                      textShadowRadius: 10,
                      textAlign: "center",
                    }}
                  >
                    success
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    padding: 8,
                  }}
                  onPress={() => setPageNo(1)}
                >
                  <Text
                    style={{
                      color: colors.dark.text,
                      opacity: 0.8,
                      fontSize: 20,
                      textShadowColor: "black",
                      textShadowRadius: 10,
                      textAlign: "center",
                      fontFamily: "JustAnotherHand",
                    }}
                  >
                    [skip]
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: colors.dark.text,
                    opacity: 0.8,
                    fontSize: 16,
                    textShadowColor: "black",
                    textShadowRadius: 10,
                    textAlign: "center",
                  }}
                >
                  {today!.getDate()}/{today!.getMonth()+1}/{today!.getFullYear()}
                </Text>
                <Text
                  style={{
                    color: colors.dark.text,
                    fontSize: 42,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontFamily: "JustAnotherHand",
                    margin: -8,
                  }}
                >
                  the most memorable thing today..?
                </Text>
                <Text
                  style={{
                    color: colors.dark.text,
                    opacity: 0.8,
                    fontSize: 16,
                    textShadowColor: "black",
                    textShadowRadius: 10,
                    textAlign: "center",
                  }}
                >
                  [{aotd?.adventure}]
                </Text>
                <TextInput
                  onSubmitEditing={(event) => {
                    console.log(event.nativeEvent.text);
                    setMemory(event.nativeEvent.text);
                    router.push("/");
                  }}
                  style={{
                    fontFamily: "ComfertaaLight",
                    color: colors.dark.text,
                    borderBottomWidth: 1,
                    borderColor: colors.dark.text,
                    minWidth: SCREEN_WIDTH,
                    marginBottom: 8,
                    textAlign: "center",
                  }}
                />
              </View>
            )}
          </View>
          <View style={styles.newcontainer}>
            <Text style={styles.smalltext}>tip: {randomTip}</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullcontainer: {
    flexDirection: "column",
  },
  container: {
    flexDirection: "column",
    paddingHorizontal: 32,
    paddingTop: 24,
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
});

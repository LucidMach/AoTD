import OnBoard from "@/components/OnBoard";
import TopBar from "@/components/TopBar";
import { colors } from "@/constants/colors";

import { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity,StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

export default function HomeScreen() {
  const [onboard, setOnboard] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("onboard");
        if (value !== null) {
          setOnboard(value === "true" ? true : false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);
  

  useEffect(() => {
    const storeData = async (value: boolean) => {
      try {
        await AsyncStorage.setItem("onboard", value.toString());
      } catch (e) {
        console.log(e);
      }
    };

    storeData(onboard);
  }, [onboard]);

  return (
    <SafeAreaView
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
        <TouchableOpacity style={styles.button} onPress={() => router.push('./prompt')}  />
      </View>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    width: 200,
    height: 50,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});
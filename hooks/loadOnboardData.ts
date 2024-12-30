import AsyncStorage from "@react-native-async-storage/async-storage";

async function loadOnboardData(
  setOnboard: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const value = await AsyncStorage.getItem("onboard");
    if (value !== null) {
      setOnboard(value === "true" ? true : false);
    }
  } catch (e) {
    console.log({ onboard: e });
  }
}

export default loadOnboardData;

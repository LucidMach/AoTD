import adventure from "@/interfaces/adventure";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function loadAdventuresData(
  setAdventures: React.Dispatch<React.SetStateAction<adventure[]>>,
  adventures: adventure[]
) {
  try {
    const data = await AsyncStorage.getItem("adventures");
    if (data) {
      setAdventures(JSON.parse(data));
      return adventures;
    }
  } catch (e) {
    console.log({ adventures: e });
  }
}

export default loadAdventuresData;

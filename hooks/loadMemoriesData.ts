import memory from "@/interfaces/memory";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function loadMemoriesData(
  setMemories: React.Dispatch<React.SetStateAction<memory[]>>,
  memories: memory[]
) {
  try {
    const data = await AsyncStorage.getItem("memories");
    if (data) {
      setMemories(JSON.parse(data));
      return memories;
    }
  } catch (e) {
    console.log({ memories: e });
  }
}

export default loadMemoriesData;

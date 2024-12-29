import { colors } from "@/constants/colors";
import { useMemo } from "react";
import { View, Text, ImageBackground,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PromptScreen() {
  const backgroundImages = [require("@/assets/images/morning/0.jpg"),
   
    require("@/assets/images/morning/2.jpg"),
    require("@/assets/images/morning/3.jpg"),
    require("@/assets/images/morning/4.jpg"),
    require("@/assets/images/morning/5.jpg"),

     ];
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
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
        <Text
          style={{ color: colors.dark.text, fontFamily: "JustAnotherHand" }}
        >
          #AoTD
        </Text>
        <Text
          style={{ color: colors.dark.text, fontFamily: "ComfortaaRegular" }}
        >
          Prompt
        </Text>
      </ImageBackground>
        
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:'100%',
    
  
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

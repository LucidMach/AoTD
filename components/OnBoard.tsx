import { useCallback } from "react";
import {
  ImageURISource,
  StyleSheet,
  SafeAreaView,
  View,
  ViewToken,
} from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import ListItem from "./ListItem";
import PaginationElement from "./PaginationElement";
import Button from "./PagiButton";
import { colors } from "@/constants/colors";

const pages = [
  {
    text: "gamify your life",
    image: require("../assets/images/game.png"),
  },
  {
    text: "choose one main task for the day...",
    image: require("../assets/images/wakeup.png"),
  },
  {
    text: "something that you really want to do",
    image: require("../assets/images/dreams.png"),
  },
  {
    text: "reflect on the most memorable moment of the day",
    image: require("../assets/images/sleep.png"),
  },
];

interface Props {
  setOnboard: (value: boolean) => void;
}

const OnBoard: React.FC<Props> = ({ setOnboard }) => {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    []
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: { text: string; image: ImageURISource };
      index: number;
    }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.bottomContainer}>
        <PaginationElement length={pages.length} x={x} />
        <Button
          currentIndex={flatListIndex}
          length={pages.length}
          flatListRef={flatListRef}
          setOnboard={setOnboard}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.background,
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default OnBoard;

import type { PropsWithChildren, ReactElement } from "react";
import { Image, Pressable, View, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/themes/useColorScheme";
import { ThemedText } from "../ThemedText";
import { Check, Plus } from "lucide-react-native";

const HEADER_HEIGHT = 250;
const FADE_SCROLL_DISTANCE = 200;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  handleSheetToggle: () => void;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  handleSheetToggle,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, FADE_SCROLL_DISTANCE],
        [1, 0],
        "clamp",
      ),
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, FADE_SCROLL_DISTANCE],
        [1, 0],
        "clamp",
      ),
    };
  });

  const headerBaseStyle: ViewStyle = {
    height: HEADER_HEIGHT,
    position: "relative",
    backgroundColor: headerBackgroundColor[colorScheme],
  };

  return (
    <ThemedView className="flex-1">
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View style={[headerBaseStyle, headerAnimatedStyle]}>
          {headerImage}
        </Animated.View>
        <ThemedView className="flex-1 mt-16 px-8 py-10 gap-4">
          {children}
        </ThemedView>

        <Animated.View
          style={[imageAnimatedStyle]}
          className="absolute flex-1 bg-white h-28 w-28 top-[220px] left-8 rounded-xl overflow-hidden shadow-md"
        >
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-full h-full rounded-xl scale-[0.95]"
          />
        </Animated.View>

        <Animated.View
          style={[buttonAnimatedStyle]}
          className="absolute top-[270px] right-4"
        >
          <Pressable
            className="bg-white/10 px-4 py-2 rounded-md flex-row items-center justify-center gap-2"
            onPress={handleSheetToggle}
          >
            <Plus color={colorScheme === "dark" ? "white" : "black"} />
            <ThemedText>Add</ThemedText>
          </Pressable>
        </Animated.View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

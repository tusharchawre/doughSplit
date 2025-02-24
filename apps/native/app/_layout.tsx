import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import "@/global.css";
import { SessionProvider } from "@/context/ctx";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <SessionProvider>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaView className="flex-1 bg-black">
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SessionProvider>
  );
}

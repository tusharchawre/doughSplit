import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

import "@/global.css";
import { SessionProvider } from "@/context/ctx";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SafeAreaView className="flex-1 bg-black">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SessionProvider>
  );
}

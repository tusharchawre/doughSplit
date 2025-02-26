import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView, Text } from "react-native";
import "@/global.css";
import { SessionProvider } from "@/context/ctx";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSearchParams } from "expo-router/build/hooks";

export default function RootLayout() {
  return (
    <SessionProvider>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaView className="flex-1 bg-black">
          <Stack
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              animation: "slide_from_right",
              headerTintColor: "#ffffff",
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="group/[id]"
              options={{
                headerShown: true,
                headerBackButtonDisplayMode: "minimal",
                headerTransparent: true,
                headerTitle: "",
                gestureEnabled: true,
              }}
            />
          </Stack>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SessionProvider>
  );
}

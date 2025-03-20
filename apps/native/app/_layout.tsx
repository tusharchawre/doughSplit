import { Stack } from "expo-router";
import { Pressable, SafeAreaView, useColorScheme } from "react-native";
import "@/global.css";
import { SessionProvider } from "@/context/ctx";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView className="flex-1">
          <BottomSheetModalProvider>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <SafeAreaView className="flex-1 bg-black">
                <Stack
                  screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    animation: "slide_from_right",
                    headerTintColor: "#ffffff",
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
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

                  <Stack.Screen
                    name="group/txn/[id]"
                    options={{
                      headerRight: () => {
                        return (
                          <Pressable className="text-white">
                            <ThemedText>Delete</ThemedText>
                          </Pressable>
                        );
                      },
                      headerShown: true,
                      headerBackButtonDisplayMode: "minimal",
                      headerTransparent: true,
                      headerTitle: "",
                      gestureEnabled: true,
                    }}
                  />
                </Stack>
                <StatusBar style="auto" />
              </SafeAreaView>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SessionProvider>
  );
}

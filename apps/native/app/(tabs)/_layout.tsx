import { SafeAreaView, useColorScheme } from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import { ChartSpline, Circle, User, Users } from "lucide-react-native";
import { AuthGuard } from "@/components/auth-guard";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GroupSheet } from "@/components/groupSheet";
import  { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function TabLayout() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const colorScheme = useColorScheme();

  return (
    <AuthGuard>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaView className="flex-1 bg-black">
          <Header bottomSheetRef={bottomSheetRef} />
          <Tabs
            screenOptions={{
              tabBarActiveTintColor:
                colorScheme === "dark" ? "#fff" : "#0a7ea4",
              tabBarInactiveTintColor:
                colorScheme === "dark" ? "#ffffff80" : "#687076",
              tabBarStyle: {
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
                borderColor: colorScheme === "dark" ? "#333" : "#ccc",
              },
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Groups",
                tabBarIcon: ({ color }) => (
                  <Users height={20} width={20} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="friends"
              options={{
                title: "Friends",
                tabBarIcon: ({ color }) => (
                  <User height={20} width={20} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="activity"
              options={{
                title: "Activity",
                tabBarIcon: ({ color }) => (
                  <ChartSpline height={20} width={20} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="account"
              options={{
                title: "Account",
                tabBarIcon: ({ color }) => (
                  <Circle height={20} width={20} color={color} />
                ),
              }}
            />
          </Tabs>
        </SafeAreaView>
        <GroupSheet bottomSheetRef={bottomSheetRef} />
      </GestureHandlerRootView>
    </AuthGuard>
  );
}

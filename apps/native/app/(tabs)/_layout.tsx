import { SafeAreaView, View } from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import { ChartSpline, Circle, User, Users } from "lucide-react-native";
import { AuthGuard } from "@/components/auth-guard";
import { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GroupSheet } from "@/components/groupSheet";
import BottomSheet from "@gorhom/bottom-sheet";

export default function TabLayout() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [open, setOpen] = useState(false);

  return (
    <AuthGuard>
      <GestureHandlerRootView className="flex-1">
        <SafeAreaView className="flex-1 bg-black">
          <Header
            open={open}
            setOpen={setOpen}
            bottomSheetRef={bottomSheetRef}
          />
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: "white",
              tabBarStyle: {
                backgroundColor: "#000000",
                borderColor: "black",
                borderRadius: 10,
              },
              tabBarInactiveTintColor: "#ffffff80",
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
        {open && <GroupSheet bottomSheetRef={bottomSheetRef} />}
      </GestureHandlerRootView>
    </AuthGuard>
  );
}

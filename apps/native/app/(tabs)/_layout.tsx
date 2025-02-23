import { SafeAreaView, View } from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/Header";
import { ChartSpline, Circle, User, Users } from "lucide-react-native";
import { AuthGuard } from "@/components/auth-guard";

export default function TabLayout() {
  return (
    <AuthGuard>
    <View className="flex-1 bg-black">
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#ffffff10",
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
    </View>

    </AuthGuard>
  );
}

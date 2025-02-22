import { View } from "react-native";
import { Tabs } from "expo-router";
import Header from "../../components/Header";

export default function TabLayout() {
  return (
    <View className="flex-1 bg-black">
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "black",
            borderTopColor: "#ffffff1a",
          },
          tabBarInactiveTintColor: "#ffffff80",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Groups",
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: "Friends",
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            title: "Activity",
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
          }}
        />
      </Tabs>
    </View>
  );
}

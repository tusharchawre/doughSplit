import { Tabs } from "expo-router";
import { Svg, Path } from "react-native-svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "black", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Groups"
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
  );
}

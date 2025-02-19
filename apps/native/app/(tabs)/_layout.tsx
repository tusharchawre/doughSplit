import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
    <Tabs.Screen
        name="index"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

    <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
    
    <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

    <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      
    </Tabs>
  );
}

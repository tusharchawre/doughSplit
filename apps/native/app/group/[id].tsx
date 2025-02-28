import { Image, useColorScheme, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getUser } from "@/hooks/getUser";
import { getTxnByGroupId } from "@/hooks/getTxnByGroupId";
import ParallaxScrollView from "@/components/Views/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TxnScreen } from "@/components/groups/txnScreen";
import { AboutScreen } from "@/components/groups/aboutScreen";

export default function Route() {
  const params = useLocalSearchParams<{
    id: string;
  }>();

  const Tab = createMaterialTopTabNavigator();

  const groupId = params.id;

  const user = getUser();

  const group = user?.group.find((group) => group.id === groupId);

  const txn = getTxnByGroupId(groupId);

  const colorScheme = useColorScheme();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1740600379671-46903506e162?q=80&w=1595&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-full h-full"
        />
      }
      groupIcon={
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-full h-full rounded-xl scale-[0.95]"
        />
      }
    >
      <ThemedView>
        <ThemedText type="defaultSemiBold">{group?.groupName}</ThemedText>
        <ThemedText type="subtitle">{group?.groupDescription}</ThemedText>
      </ThemedView>
      <View className="h-[80vh]">
      <Tab.Navigator
        screenOptions={{
         
          swipeEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: "#ffffff80",
          },
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          },
        }}
      >
        <Tab.Screen name="Transactions" component={TxnScreen}     initialParams={{groupId: groupId , userId: user?.id}}
 />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
      </View>
    </ParallaxScrollView>
  );
}



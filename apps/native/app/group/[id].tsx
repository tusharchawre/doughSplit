import { Image, Pressable, useColorScheme, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "@/hooks/getUser";
import { getTxnByGroupId } from "@/hooks/getTxnByGroupId";
import ParallaxScrollView from "@/components/Views/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TxnScreen } from "@/components/groups/txnScreen";
import { AboutScreen } from "@/components/groups/aboutScreen";
import { useCallback, useRef, useState } from "react";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TxnSheet } from "@/components/txnSheet";
import { Plus } from "lucide-react-native";

export default function Route() {
  const params = useLocalSearchParams<{
    id: string;
  }>();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const Tab = createMaterialTopTabNavigator();
  const groupId = params.id;
  const { data: user, refetch, isPending } = useUser();
  const group = user?.group.find((group) => group.id === groupId);
  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleSheetToggle = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <View className="flex-1">
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
            <Tab.Screen
              name="Transactions"
              component={TxnScreen}
              initialParams={{ groupId: groupId, userId: user?.id }}
            />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </View>
      </ParallaxScrollView>

      <View className="absolute  flex-1 bg-white h-28 w-28 top-[220px] left-8 rounded-xl overflow-hidden shadow-md">
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-full h-full rounded-xl scale-[0.95]"
        />
      </View>

      <View className="absolute top-[270px] right-4">
        <Pressable
          className={`${isSheetOpen ? "bg-white/20" : "bg-white/10"} px-4 py-2 rounded-md flex-row items-center justify-center gap-2`}
          onPress={handleSheetToggle}
        >
          <Plus color={colorScheme === "dark" ? "white" : "black"} />
          <ThemedText>Add</ThemedText>
        </Pressable>
      </View>

      <TxnSheet bottomSheetRef={bottomSheetRef} />
    </View>
  );
}

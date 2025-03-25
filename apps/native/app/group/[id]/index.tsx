import { ActivityIndicator, Image, useColorScheme, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useUser } from "@/hooks/getUser";
import ParallaxScrollView from "@/components/Views/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TxnScreen } from "@/components/groups/txnScreen";
import { AboutScreen } from "@/components/groups/aboutScreen";
import { useCallback, useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TxnSheet } from "@/components/txnSheet";
import { useGroupById } from "@/hooks/getGroupById";
import { Transaction } from "@/hooks/getTxnByGroupId";

export default function Route() {
  const params = useLocalSearchParams<{
    id: string;
    extractedData?: any;
  }>();
  const Tab = createMaterialTopTabNavigator();
  const groupId = params.id;
  const { data: user, refetch, isPending } = useUser();
  const [txnData, setTxnData] = useState<{
    txnName: string;
    amount: string;
    desc: string;
  }>();
  const { data: group, isPending: grpPending } = useGroupById(groupId);
  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (params.extractedData) {
      try {
        const parsedData = JSON.parse(params.extractedData);
        console.log("Extracted Data (Parsed):", parsedData);

        // Additional logging for each property
        console.log("Transaction Name:", parsedData.txnName);
        console.log("Description:", parsedData.desc);
        console.log("Amount:", parsedData.amount);

        setTxnData({
          txnName: parsedData.txnName,
          desc: parsedData.desc,
          amount: parsedData.amount,
        });

        bottomSheetRef.current?.present();
      } catch (error) {
        console.error("Error parsing extracted data:", error);
      }
    } else {
      console.log("No extracted data found");
    }
  }, [params.extractedData]);

  const handleSheetToggle = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  if (isPending || grpPending) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="small" color="#ffffff" />
      </ThemedView>
    );
  }

  if (!group) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText className="text-center">
          This Group Doesnt Exist yet.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <View className="flex-1">
      <ParallaxScrollView
        handleSheetToggle={handleSheetToggle}
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
        <ThemedView className="ml-2">
          <ThemedText type="defaultSemiBold">{group?.groupName}</ThemedText>
          <ThemedText type="subtitle" className="mt-2">
            {group?.groupDescription}
          </ThemedText>
        </ThemedView>
        <Tab.Navigator
          style={{ flex: 1, height: 600 }}
          screenOptions={{
            swipeEnabled: true,
            lazy: true,
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
          <Tab.Screen
            name="About"
            component={AboutScreen}
            initialParams={{ groupId: groupId, userId: user?.id }}
          />
        </Tab.Navigator>
      </ParallaxScrollView>
      <TxnSheet
        extractedTxnData={txnData}
        groupId={groupId}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  );
}

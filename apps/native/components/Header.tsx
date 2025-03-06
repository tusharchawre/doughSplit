import { Text, View } from "react-native";
import { Plus, Search } from "lucide-react-native";
import { useCallback } from "react";
import {  BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface HeaderProps {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}

export default function Header({  bottomSheetRef }: HeaderProps) {

  const openBottomSheet = useCallback(() => {
      bottomSheetRef.current?.present();
  }, []);

  return (
    <ThemedView className="flex mt-12 flex-row items-center justify-between px-4 py-4">
      <ThemedView className="">
        <ThemedText
          type="title"
          className="text-white mb-2 font-semibold text-3xl"
        >
          DoughSplit
        </ThemedText>
        <ThemedText type="subtitle">
          You are owed
          <Text className="text-[#ADFFB1BF]"> ₹500.64</Text>
        </ThemedText>
      </ThemedView>

      <View className="w-fit h-12 bg-white/15 rounded-xl flex flex-row items-center justify-around px-3 py-3 gap-4">
        <Search height={20} width={20} color="white" />
        <View className="w-[1px] h-full bg-white"></View>
        <Plus height={20} width={20} color="white" onPress={openBottomSheet} />
      </View>
    </ThemedView>
  );
}

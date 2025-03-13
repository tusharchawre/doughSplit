import { Text, View } from "react-native";
import { Plus, Search } from "lucide-react-native";
import { useCallback } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useUser } from "@/hooks/getUser";
import { useTxnByGroupId } from "@/hooks/getTxnByGroupId";

interface HeaderProps {
  bottomSheetRef: React.RefObject<BottomSheetModalMethods>;
}

export default function Header({ bottomSheetRef }: HeaderProps) {
  const {data: user} = useUser()
  const groups = user?.group
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  let balance = 0


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
              {balance > 0 ? "You lent" : "You burrowed"}
              <Text
                className={
                  balance > 0
                    ? "dark:text-[#ADFFB1BF] text-[#51ff20]"
                    : "dark:text-[#FF9A9A] text-[#FF5757]"
                }
              >
                {" "}
                ₹{balance < 0 ? ((balance * -1).toFixed(2)) : balance.toFixed(2)}
              </Text>
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

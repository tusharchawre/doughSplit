import { Text, View } from "react-native";
import { Plus, Search } from "lucide-react-native";

export default function Header() {
  return (
    <View className="flex bg-black p-6  w-full flex-row justify-between">
      <View className="h-16">
        <Text className="text-3xl mb-1 font-semibold text-white/90">
          DoughSplit
        </Text>
        <Text className="text-[#FFFFFFBF] font-light text-xl">
          Overall you are owed <Text className="text-[#ADFFB1BF]">₹500.64</Text>
        </Text>
      </View>

      <View className="w-20 h-9 rounded-md bg-white/15 flex flex-row gap-2 justify-center items-center p-1">
        <Search color="white" strokeWidth={1.5} size={20} />
        <View className="h-full w-[1px] bg-white/40" />
        <Plus color="white" strokeWidth={1.5} size={20} />
      </View>
    </View>
  );
}

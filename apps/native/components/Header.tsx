import { Text, View, SafeAreaView } from "react-native";
import { Plus, Search } from "lucide-react-native";

export default function Header() {
  return (
    <SafeAreaView className="flex flex-row items-center justify-between px-4 py-8">
      <View className="">
        <Text className="text-white mb-2 font-semibold text-3xl">
          DoughSplit
        </Text>
        <Text className="text-white/70 text-lg">
          You are owed
          <Text className="text-[#ADFFB1BF]"> ₹500.64</Text>
        </Text>
      </View>

      <View className="w-fit h-12 bg-white/15 rounded-xl flex flex-row items-center justify-around px-3 py-3 gap-4">
      <Search height={20} width={20} color="white" />
      <View className="w-[1px] h-full bg-white"></View>
      <Plus height={20} width={20} color="white" />

      </View>
    </SafeAreaView>
  );
}

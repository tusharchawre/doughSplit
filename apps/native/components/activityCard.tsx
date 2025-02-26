import { getUser } from "@/hooks/getUser";
import { getUserById } from "@/hooks/getUserById";
import { Image, Text, View } from "react-native";

interface ActivityCardProps {
  id: number;
  txnName: string;
  description: string | null;
  date: string;
  groupId: string;
  paidById: string;
  amount: number;
  currency: "INR" | string;
  settledStatus: "PENDING" | "COMPLETED";
}

export const ActivityCard = ({
  txnName,
  paidById,
  description,
  amount,
  date,
}: ActivityCardProps) => {
  const paidByUser = getUserById(paidById);

  return (
    <View className="w-full h-28 bg-white/[0.05]">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-20 h-20 rounded-lg m-4"
        />

        <View className="w-full flex-wrap">
          <Text className="text-white w-full text-xl font-semibold flex-wrap line-clamp-2">
            {paidByUser?.username} added "{txnName}" in {}
          </Text>
          <Text className="text-white/70 text-lg">
            You are owed
            <Text className="text-[#ADFFB1BF]">{amount}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

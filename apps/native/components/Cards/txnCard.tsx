import { Transaction } from "@/hooks/getTxnByGroupId";
import { Image, Pressable, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { formatDistanceToNow } from "date-fns";

interface TxnCard extends Transaction {
  userId: string;
}

export const TxnCard = ({
  id,
  txnName,
  description,
  date,
  paidById,
  amount,
  currency = "INR",
  settledStatus = "PENDING",
  userId,
  participants,
}: TxnCard) => {
  const isPayer = paidById === userId;

  const amountPerPerson =
    Math.round((amount / participants.length) * 100) / 100;

  const relativeDate = formatDistanceToNow(new Date(date), { addSuffix: true });

  return (
    <Pressable key={id} className="w-full my-1">
      <View className="w-full h-24 bg-white/[0.08] rounded-xl my-2">
        <View className="flex flex-row items-center w-full h-full">
          <View className="flex flex-row w-full justify-between items-center">
            <View className="flex flex-row gap-2 items-center">
              <Image
                source={{
                  uri: "https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                className="w-16 h-16 rounded-lg m-4"
              />
              <View className="flex justify-center gap-1">
                <ThemedText className="text-white text-xl font-semibold">
                  {txnName}
                </ThemedText>
                <ThemedText style={{fontSize: 12}} type="subtitle" className="text-white/50 text-xs">
                  {relativeDate}
                </ThemedText>
              </View>
            </View>

            <View className="flex items-end pr-4">
              <ThemedText type="subtitle" className="text-white/70 text-lg">
                {isPayer ? "You are lent" : "You borrowed"}
              </ThemedText>
              <Text
                className={
                  isPayer
                    ? "dark:text-[#ADFFB1BF] text-[#51ff20]"
                    : "dark:text-[#ff8800] text-[#ff8800]"
                }
              >
                ₹ {amountPerPerson}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

import { Transaction } from "@/hooks/getTxnByGroupId";
import { ThemedView } from "../ThemedView";
import { FlatListComponent, Image, Pressable, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { getUser } from "@/hooks/getUser";

interface TxnCard extends Transaction {
    userId: string
}

export const TxnCard = ({
  id,
  txnName,
  description,
  date,
  paidBy,
  amount,
  currency = "INR",
  settledStatus = "PENDING",
  userId,
  participants
}: TxnCard) => {

    const owe = paidBy != userId ? true : false



  return (
    <Pressable key={id} className="w-full my-1">
      <View className="w-full h-28 bg-white/[0.08] rounded-xl my-2">
        <View className="flex flex-row items-center">
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-20 h-20 rounded-lg m-4"
          />

          <View>
            <ThemedText className="text-white text-xl font-semibold">
              {txnName}
            </ThemedText>
           {owe ?  (<ThemedText type="subtitle" className="text-white/70 text-lg">
              You are owed
              <Text className="dark:text-[#ADFFB1BF] text-[#51ff20]">
                {" "}
                ₹500.64
              </Text>
            </ThemedText>): (
                <ThemedText type="subtitle" className="text-white/70 text-lg">
                You lent
                <Text className="dark:text-[#ff8800] text-[#ff8800]">
                  {" "}
                  ₹ {Math.round(amount / participants.length * 100)/100}
                </Text>
              </ThemedText>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

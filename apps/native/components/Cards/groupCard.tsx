import { Image, Text, View, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useGroupById } from "@/hooks/getGroupById";
import { useTxnByGroupId } from "@/hooks/getTxnByGroupId";
import { useUser } from "@/hooks/getUser";

interface GroupCardProps {
  id: string;
  groupName: string;
  groupDescription: string;
  onPress: () => void;
  amount?: number;
}

export const GroupCard = ({
  id,
  groupDescription,
  groupName,
  onPress,
  amount = 0,
}: GroupCardProps) => {
  const { data: user } = useUser();

  const { data: txns } = useTxnByGroupId(id);

  const getBalance = () => {
    let balance = 0;
    txns?.map((txn) => {
      if (txn.settledStatus != "COMPLETED") {
        const amount = txn.amount;
        const paidById = txn.paidById;
        const participants = txn.participants.length;

        if (paidById === user?.id) {
          balance = balance + amount / participants;
        } else {
          balance = balance - amount / participants;
        }
      }
    });
    return balance;
  };

  const balance: number = getBalance();

  return (
    <Pressable onPress={onPress}>
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
              {groupName}
            </ThemedText>
            {balance != 0 ? (
              <ThemedText type="subtitle" className="mt-1">
                {balance >= 0 ? "You lent" : "You burrowed"}
                <Text
                  className={
                    balance >= 0
                      ? "dark:text-[#ADFFB1BF] text-[#51ff20]"
                      : "dark:text-[#FF9A9A] text-[#FF5757]"
                  }
                >
                  {" "}
                  ₹
                  {balance < 0 ? (balance * -1).toFixed(2) : balance.toFixed(2)}
                </Text>
              </ThemedText>
            ) : (
              <ThemedText type="subtitle" className="mt-1">
                You are settled up.
              </ThemedText>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

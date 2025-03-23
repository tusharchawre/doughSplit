import { Image, Text, View, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { useGroupById } from "@/hooks/getGroupById";
import { useTxnByGroupId } from "@/hooks/getTxnByGroupId";
import { useUser } from "@/hooks/getUser";
import { useOwedInGroup } from "@/hooks/getOwedinGrp";

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
  const { data: balances } = useOwedInGroup(id);

  const getBalance = () => {
    let netBalance = 0;
    balances?.map((balance: any) => {
      netBalance += balance.balance;
    });

    return netBalance;
  };

  const netBalance: number = getBalance();

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
            {netBalance != 0 ? (
              <ThemedText type="subtitle" className="mt-1">
                {netBalance >= 0 ? "You lent" : "You burrowed"}
                <Text
                  className={
                    netBalance >= 0
                      ? "dark:text-[#ADFFB1BF] text-[#51ff20]"
                      : "dark:text-[#FF9A9A] text-[#FF5757]"
                  }
                >
                  {" "}
                  ₹
                  {netBalance < 0
                    ? (netBalance * -1).toFixed(2)
                    : netBalance.toFixed(2)}
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

import { ActivityCard } from "@/components/activityCard";
import { getUser } from "@/hooks/getUser";
import { Text, View } from "react-native";

export default function Activity() {
  const user = getUser();

  const transactions = user?.involvedIn;

  if (!transactions || transactions.length === 0) {
    return (
      <View className="bg-black text-white flex-1">
        <Text className="text-white text-xl">
          There are no transactions here.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full bg-black px-4">
      <Text className="text-white text-2xl mb-4">Activity</Text>
      {transactions.map((txn) => (
        <ActivityCard
          key={txn.id}
          id={txn.id}
          txnName={txn.txnName}
          description={txn.description}
          amount={txn.amount}
          date={txn.date}
          groupId={txn.groupId}
          paidById={txn.paidById}
          currency={txn.currency}
          settledStatus={txn.settledStatus}
        />
      ))}
    </View>
  );
}

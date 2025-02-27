import { ActivityCard } from "@/components/activityCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
    <ThemedView className="flex-1 bg-black px-4">
      <ThemedText type="subtitle" className="text-white text-2xl mb-4">Activity</ThemedText>
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
    </ThemedView>
  );
}

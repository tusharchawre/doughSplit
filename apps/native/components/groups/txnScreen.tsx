import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Transaction, useTxnByGroupId } from "@/hooks/getTxnByGroupId";
import { TxnCard } from "../Cards/txnCard";
import { ScrollView, View } from "react-native";


export function TxnScreen({ route }: { route: any }) {
  const { groupId, userId } = route.params;
  const { data: txns, refetch } = useTxnByGroupId(groupId);

  if (!txns) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>There are no transactions.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView 
        className="my-4 w-full" 
        contentContainerStyle={{ paddingBottom: 20 }}
        nestedScrollEnabled={true}
      >
        {txns.map((txn) => (
          <TxnCard
            key={txn.id}
            id={txn.id}
            txnName={txn.txnName}
            description={txn.description}
            date={txn.date}
            paidById={txn.paidById}
            amount={txn.amount}
            currency={txn.currency}
            settledStatus={txn.settledStatus}
            userId={userId}
            participants={txn.participants}
          />
        ))}
      </ScrollView>
    </View>
  );
}
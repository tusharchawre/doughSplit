import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { getTxnByGroupId } from "@/hooks/getTxnByGroupId";
import { TxnCard } from "../Cards/txnCard";

export function TxnScreen({ route }: { route: any }) {
  const { groupId, userId } = route.params;

  const txns = getTxnByGroupId(groupId);

  return (
    <ThemedView className="my-4">
      {txns.map((txn) => (
        <TxnCard
          key={txn.id}
          id={txn.id}
          txnName={txn.txnName}
          description={txn.description}
          date={txn.date}
          paidBy={txn.paidBy}
          amount={txn.amount}
          currency={txn.currency}
          settledStatus={txn.settledStatus}
          userId={userId}
          participants={txn.participants}
        />
      ))}
    </ThemedView>
  );
}

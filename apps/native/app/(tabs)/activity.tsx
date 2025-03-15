import { FadeInView } from "@/components/animations/FadeInView";
import { ActivityCard } from "@/components/Cards/activityCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/hooks/getUser";
import { ScrollView, Text, View } from "react-native";

export default function Activity() {
  const { data: user } = useUser();
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
      <ThemedText type="defaultSemiBold" className="my-4">
        Activity
      </ThemedText>
      <ScrollView>
        {transactions.map((txn, index) => (
          <FadeInView
            key={txn.id}
            delay={index * 100}
            duration={400}
            className="mb-4 w-full"
          >
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
              participants={txn.participants.length}
            />
          </FadeInView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

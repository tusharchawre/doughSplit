import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useTxnByGroupId } from "@/hooks/getTxnByGroupId";
import { TxnCard } from "../Cards/txnCard";
import {
  Animated,
  Dimensions,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import { useCallback, useState, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FadeInView } from "../animations/FadeInView";

const { width } = Dimensions.get("window");

export function TxnScreen({ route }: { route: any }) {
  const { groupId, userId } = route.params;
  const { data: txns, refetch, isLoading } = useTxnByGroupId(groupId);
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [refetch]);

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </ThemedView>
    );
  }

  if (!txns || txns.length === 0) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <MaterialCommunityIcons
          name="cash-remove"
          size={64}
          color="rgba(255,255,255,0.5)"
        />
        <ThemedText className="text-center text-xl mt-4 mb-2">
          No Transactions Yet
        </ThemedText>
        <ThemedText className="text-center text-white/60 px-8">
          When group members add expenses, they'll appear here.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Animated.ScrollView
        style={{ flex: 1 }}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingTop: 10,
          paddingHorizontal: 4,
          paddingBottom: 100, 
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#ffffff"]}
            progressBackgroundColor="#000000"
            tintColor="#ffffff"
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {txns.map((txn, index) => (
          <FadeInView
            key={txn.id}
            delay={index * 100}
            duration={400}
            className="mb-1 w-full"
          >
            <TxnCard
              id={txn.id}
              txnName={txn.txnName}
              groupId={groupId}
              description={txn.description}
              date={txn.date}
              paidById={txn.paidById}
              amount={txn.amount}
              currency={txn.currency}
              settledStatus={txn.settledStatus}
              userId={userId}
              participants={txn.participants}
            />
          </FadeInView>
        ))}
      </Animated.ScrollView>
    </ThemedView>
  );
}

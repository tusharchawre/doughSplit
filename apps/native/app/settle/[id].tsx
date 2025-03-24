import {
  Alert,
  Image,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import {
  ArrowDown,
  ArrowUp,
  Check,
  CheckCircle,
  DollarSign,
} from "lucide-react-native";
import { useGroupById } from "@/hooks/getGroupById";
import { useOwedInGroup } from "@/hooks/getOwedinGrp";
import api from "@/lib/axios";
import { useState, useEffect } from "react";
import { handleRefetchAll } from "../_layout";

interface Balance {
  userId: string;
  username: string;
  imageUrl?: string;
  balance: number;
}

export default function Route() {
  const params = useLocalSearchParams<{
    id: string;
  }>();
  const router = useRouter();
  const groupId = params.id;
  const [settlingUsers, setSettlingUsers] = useState<Record<string, boolean>>(
    {},
  );
  const [settlingAll, setSettlingAll] = useState(false);
  const [successUsers, setSuccessUsers] = useState<Record<string, boolean>>({});
  const [allSuccess, setAllSuccess] = useState(false);

  const { data: group, refetch } = useGroupById(groupId);
  const { data: balances, refetch: refetchBalance } = useOwedInGroup(groupId);

  // Clear success states when balances change
  useEffect(() => {
    setSuccessUsers({});
    setAllSuccess(false);
  }, [balances]);

  const handleSettleIndividual = async (userId: string) => {
    try {
      // Set loading state
      setSettlingUsers((prev) => ({ ...prev, [userId]: true }));

      console.log("Settling with user:", userId, "in group:", groupId);

      const response = await api.post("/group/transactions/bulk-settle-user", {
        friendId: userId,
        groupId,
      });

      // Show success state briefly
      setSettlingUsers((prev) => ({ ...prev, [userId]: false }));
      setSuccessUsers((prev) => ({ ...prev, [userId]: true }));

      // Refetch data after a short delay
      setTimeout(async () => {
        handleRefetchAll();
        // Clear success state
        setSuccessUsers((prev) => ({ ...prev, [userId]: false }));
      }, 1500);
    } catch (error) {
      console.error("Settlement error:", error);
      setSettlingUsers((prev) => ({ ...prev, [userId]: false }));
      Alert.alert("Error", "Failed to settle the balance. Please try again.");
    }
  };

  const handleSettleAll = async () => {
    try {
      setSettlingAll(true);

      balances.map((balance: Balance) => {
        handleSettleIndividual(balance.userId);
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSettlingAll(false);
      setAllSuccess(true);
      setTimeout(async () => {
        await refetchBalance();
        await refetch();
        setAllSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Settlement error:", error);
      setSettlingAll(false);
      Alert.alert("Error", "Failed to settle all balances. Please try again.");
    }
  };

  if (!group) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText>Loading group details...</ThemedText>
      </ThemedView>
    );
  }

  // Calculate whether there are any balances where you owe money (negative balances)
  const hasNegativeBalances =
    balances && balances.some((balance: Balance) => balance.balance < 0);

  return (
    <ThemedView style={{ flex: 1 }} className="relative mt-12">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View className="mb-6">
          <ThemedText className="text-2xl font-bold">Settle Up</ThemedText>
          <ThemedText className="text-white/70">{group?.groupName}</ThemedText>
        </View>

        {/* Balances Card */}
        <View className="w-full rounded-xl bg-white/10 mb-6 overflow-hidden">
          <View className="px-5 py-4 bg-white/5">
            <ThemedText className="text-lg font-semibold">
              Outstanding Balances
            </ThemedText>
          </View>

          {balances && balances.length > 0 ? (
            balances.map((balance: Balance, idx: number) => (
              <View
                key={balance.userId}
                className={`${idx !== balances.length - 1 ? "border-b-[0.5px] border-white/20" : ""} px-4 py-4 flex-row justify-between items-center`}
              >
                <View className="flex-row items-center flex-1">
                  <Image
                    source={{
                      uri:
                        balance.imageUrl ||
                        "https://ui-avatars.com/api/?name=" +
                          (balance.username || "User") +
                          "&background=bebebe",
                    }}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <View>
                    <ThemedText className="font-medium">
                      {balance.username}
                    </ThemedText>
                    <View className="flex-row items-center">
                      {balance.balance > 0 ? (
                        <ArrowUp size={12} color="#ADFFB1BF" className="mr-1" />
                      ) : (
                        <ArrowDown size={12} color="#ff8800" className="mr-1" />
                      )}
                      <Text
                        className={
                          balance.balance >= 0
                            ? "dark:text-[#ADFFB1BF] text-[#51ff20]"
                            : "dark:text-[#ff8800] text-[#ff8800]"
                        }
                      >
                        ₹{Math.abs(balance.balance)}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Only show settle button for negative balances (when YOU owe money) */}
                {balance.balance < 0 && (
                  <Pressable
                    onPress={() => handleSettleIndividual(balance.userId)}
                    disabled={
                      settlingUsers[balance.userId] ||
                      successUsers[balance.userId]
                    }
                    className={`
                      px-4 py-2 rounded-lg flex-row items-center
                      ${
                        successUsers[balance.userId]
                          ? "bg-green-500/30"
                          : settlingUsers[balance.userId]
                            ? "bg-white/30"
                            : "bg-white/15"
                      }
                    `}
                  >
                    {successUsers[balance.userId] ? (
                      <CheckCircle size={16} color="#ffffff" />
                    ) : settlingUsers[balance.userId] ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Check size={16} color="#ffffff" />
                    )}
                    <ThemedText className="ml-2 font-medium">
                      {successUsers[balance.userId]
                        ? "Settled!"
                        : settlingUsers[balance.userId]
                          ? "Settling..."
                          : "Settle"}
                    </ThemedText>
                  </Pressable>
                )}
              </View>
            ))
          ) : (
            <View className="px-4 py-5 items-center">
              <CheckCircle
                size={40}
                color="#ADFFB1BF"
                className="mb-2 opacity-60"
              />
              <ThemedText className="text-white/70 text-center">
                All balances are settled
              </ThemedText>
            </View>
          )}
        </View>

        {/* Summary Card */}
        {balances && balances.length > 0 && (
          <View className="w-full rounded-xl bg-white/10 mb-6 p-5">
            <View className="flex-row justify-between items-center mb-3">
              <ThemedText className="text-lg font-semibold">Summary</ThemedText>
              <DollarSign size={20} color="#bebebe" />
            </View>

            <View className="mb-3">
              <View className="flex-row justify-between mb-1">
                <ThemedText className="text-white/70">You owe</ThemedText>
                <Text className="text-[#ff8800]">
                  ₹
                  {balances
                    .filter((b: any) => b.balance < 0)
                    .reduce(
                      (sum: number, b: any) => sum + Math.abs(b.balance),
                      0,
                    )}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <ThemedText className="text-white/70">You are owed</ThemedText>
                <Text className="text-[#ADFFB1BF]">
                  ₹
                  {balances
                    .filter((b: any) => b.balance > 0)
                    .reduce((sum: number, b: any) => sum + b.balance, 0)}
                </Text>
              </View>
            </View>

            <View className="h-px bg-white/20 mb-3" />

            <View className="flex-row justify-between">
              <ThemedText className="font-medium">Net Balance</ThemedText>
              <Text
                className={
                  balances.reduce(
                    (sum: number, b: any) => sum + b.balance,
                    0,
                  ) >= 0
                    ? "font-medium text-[#ADFFB1BF]"
                    : "font-medium text-[#ff8800]"
                }
              >
                ₹
                {Math.abs(
                  balances.reduce((sum: number, b: any) => sum + b.balance, 0),
                )}
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View className="mt-2">
          {/* Only show Settle All button if there are negative balances */}
          {balances && balances.length > 0 && hasNegativeBalances && (
            <Pressable
              onPress={handleSettleAll}
              disabled={settlingAll || allSuccess}
              className={`
                py-4 rounded-xl flex-row justify-center items-center mb-4
                ${
                  allSuccess
                    ? "bg-green-500/30"
                    : settlingAll
                      ? "bg-white/30"
                      : "bg-white/15"
                }
              `}
            >
              {allSuccess ? (
                <CheckCircle size={20} color="#ffffff" />
              ) : settlingAll ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <CheckCircle size={20} color="#ffffff" />
              )}
              <ThemedText className="ml-2 font-medium">
                {allSuccess
                  ? "All Settled!"
                  : settlingAll
                    ? "Settling All..."
                    : "Settle All Balances"}
              </ThemedText>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

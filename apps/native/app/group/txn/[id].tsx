import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTxnById } from "@/hooks/useTxnById";
import { useUser } from "@/hooks/getUser";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { format } from "date-fns";
import { useRef, useEffect } from "react";
import { FadeInView } from "@/components/animations/FadeInView";

export default function TransactionDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const { data: txn, isLoading, refetch } = useTxnById(params.id);
  const { data: user } = useUser();
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (txn) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [txn]);

  if (isLoading) {
    return (
      <ThemedView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </ThemedView>
    );
  }

  if (!txn) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={48}
          color="#FF5757"
        />
        <ThemedText className="text-center text-xl mt-4">
          Transaction not found
        </ThemedText>
        <Pressable
          className="mt-6 bg-white/10 px-6 py-3 rounded-lg"
          onPress={() => router.back()}
        >
          <ThemedText>Go Back</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const isPayer = user?.id === txn.paidById;
  const payer = txn.participants.find((p) => p.id === txn.paidById);
  const payerName = payer?.username || "Unknown";

  const equalShare = txn.amount / txn.participants.length;
  const formattedDate = format(new Date(txn.date), "MMMM d, yyyy");
  const formattedTime = format(new Date(txn.date), "h:mm a");

  const handleSettleUp = async () => {
    try {
      refetch();
    } catch (error) {
      console.error("Failed to settle transaction:", error);
    }
  };

  const cardSections = [
    <View key="header" className="bg-white/10 rounded-2xl overflow-hidden mb-5">
      <View className="bg-white/10 px-5 py-4">
        <View className="flex-row justify-between items-center">
          <ThemedText className="text-2xl font-bold">{txn.txnName}</ThemedText>
          <View
            className={`px-3 py-1 rounded-full ${txn.settledStatus === "COMPLETED" ? "bg-[#51ff20]/20" : "bg-white/20"}`}
          >
            <ThemedText
              className={`text-sm ${txn.settledStatus === "COMPLETED" ? "text-[#51ff20]" : "text-white"}`}
            >
              {txn.settledStatus}
            </ThemedText>
          </View>
        </View>
        <ThemedText className="text-white/70 mt-1">
          {txn.description}
        </ThemedText>
      </View>

      <View className="px-5 py-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons
              name="calendar-outline"
              size={18}
              color="rgba(255,255,255,0.7)"
            />
            <ThemedText className="text-white/70 ml-2">
              {formattedDate}
            </ThemedText>
          </View>
          <ThemedText className="text-2xl font-semibold">
            ₹{txn.amount.toFixed(2)}
          </ThemedText>
        </View>
        <View className="flex-row items-center mt-1">
          <Ionicons
            name="time-outline"
            size={18}
            color="rgba(255,255,255,0.7)"
          />
          <ThemedText className="text-white/70 ml-2">
            {formattedTime}
          </ThemedText>
        </View>
      </View>
    </View>,

    <View key="paidBy" className="bg-white/10 rounded-xl p-5 mb-5">
      <View className="flex-row items-center mb-3">
        <MaterialCommunityIcons name="cash-multiple" size={20} color="white" />
        <ThemedText className="text-lg font-semibold ml-2">Paid by</ThemedText>
      </View>

      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-white/20 rounded-full mr-4 items-center justify-center">
          <ThemedText className="font-bold text-lg">
            {payerName.charAt(0).toUpperCase()}
          </ThemedText>
        </View>
        <View>
          <ThemedText className="font-medium text-lg">{payerName}</ThemedText>
          {isPayer && <ThemedText className="text-white/70">(You)</ThemedText>}
        </View>
      </View>
    </View>,

    <View key="splitBetween" className="bg-white/10 rounded-xl p-5 mb-5">
      <View className="flex-row items-center mb-3">
        <Ionicons name="people" size={20} color="white" />
        <ThemedText className="text-lg font-semibold ml-2">
          Split between
        </ThemedText>
      </View>

      {txn.participants.map((participant, index) => (
        <View
          key={participant.id}
          className={`flex-row justify-between items-center py-3 ${
            index < txn.participants.length - 1
              ? "border-b border-white/10"
              : ""
          }`}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-white/20 rounded-full mr-3 items-center justify-center">
              <ThemedText className="font-bold">
                {participant.username.charAt(0).toUpperCase()}
              </ThemedText>
            </View>
            <View>
              <ThemedText className="font-medium">
                {participant.username}
              </ThemedText>
              {participant.id === user?.id && (
                <ThemedText className="text-white/70 text-sm">(You)</ThemedText>
              )}
            </View>
          </View>
          <ThemedText className="font-medium">
            ₹{equalShare.toFixed(2)}
          </ThemedText>
        </View>
      ))}
    </View>,

    <View key="balance" className="bg-white/10 rounded-xl p-5 mb-5">
      <View className="flex-row items-center mb-3">
        <FontAwesome5 name="balance-scale" size={18} color="white" />
        <ThemedText className="text-lg font-semibold ml-2">
          Your balance
        </ThemedText>
      </View>

      {isPayer ? (
        <View>
          <View className="flex-row justify-between items-center py-2">
            <ThemedText>You paid</ThemedText>
            <ThemedText className="font-medium">
              ₹{txn.amount.toFixed(2)}
            </ThemedText>
          </View>

          <View className="flex-row justify-between items-center py-2">
            <ThemedText>Your share</ThemedText>
            <ThemedText className="font-medium">
              ₹{equalShare.toFixed(2)}
            </ThemedText>
          </View>

          <View className="flex-row justify-between items-center py-2 mt-1 pt-3 border-t border-white/10">
            <ThemedText className="font-medium">You are owed</ThemedText>
            <ThemedText className="font-bold text-[#51ff20]">
              ₹{(txn.amount - equalShare).toFixed(2)}
            </ThemedText>
          </View>
        </View>
      ) : (
        <View className="flex-row justify-between items-center py-2">
          <ThemedText className="font-medium">You owe</ThemedText>
          <ThemedText className="font-bold text-[#FF5757]">
            ₹{equalShare.toFixed(2)}
          </ThemedText>
        </View>
      )}
    </View>,
  ];

  return (
    <ThemedView className="flex-1 mt-20">
      <ScrollView className="flex-1">
        <View className="px-4 pt-4">
          {cardSections.map((card, index) => (
            <FadeInView
              key={`card-${index}`}
              delay={200 + index * 150}
              duration={400}
            >
              {card}
            </FadeInView>
          ))}
        </View>
      </ScrollView>

      <SafeAreaView className="px-4 pb-4">
        <FadeInView delay={800} duration={400}>
          <View className="flex-row justify-between mb-2 mx-2">
            {txn.settledStatus !== "SETTLED" && (
              <Pressable
                className="flex-1 bg-[#51ff20]/20 py-3 rounded-lg ml-2 flex-row justify-center items-center"
                onPress={handleSettleUp}
              >
                <Ionicons name="checkmark-circle" size={18} color="#51ff20" />
                <ThemedText className="ml-2 text-[#51ff20]">
                  Settle Up
                </ThemedText>
              </Pressable>
            )}
          </View>
        </FadeInView>
      </SafeAreaView>
    </ThemedView>
  );
}

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/ctx";
import { useUser } from "@/hooks/getUser";
import { Button, ScrollView, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Account() {
  const { data: user } = useUser();
  const { signOut } = useSession();

  const formatCurrency = (amount: any) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const router = useRouter();

  const getPendingAmount = () => {
    if (!user?.involvedIn) return 0;
    return user.involvedIn
      .filter(
        (txn) => txn.settledStatus === "PENDING" && txn.paidById === user.id
      )
      .reduce((sum, txn) => sum + txn.amount / txn.participants.length, 0);
  };

  return (
    <ScrollView className="bg-black flex-1 px-4 pt-4">
      <View className="bg-white/10 rounded-2xl overflow-hidden mb-5">
        <View className="px-5 py-6 items-center">
          <View className="bg-white/20 rounded-full w-20 h-20 items-center justify-center mb-3">
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <ThemedText className="text-3xl font-bold">
                {user?.username?.[0] || "U"}
              </ThemedText>
            )}
          </View>
          <ThemedText className="text-2xl font-bold">
            {user?.username || "User"}
          </ThemedText>
          <ThemedText className="text-white/70 mt-1">
            {user?.email || ""}
          </ThemedText>

          <View className="flex-row mt-4 w-full justify-around">
            <View className="items-center">
              <ThemedText className="text-white/70">Friends</ThemedText>
              <ThemedText className="text-xl font-bold">
                {user?.friends?.length || 0}
              </ThemedText>
            </View>
            <View className="items-center">
              <ThemedText className="text-white/70">Groups</ThemedText>
              <ThemedText className="text-xl font-bold">
                {user?.group?.length || 0}
              </ThemedText>
            </View>
            <View className="items-center">
              <ThemedText className="text-white/70">Pending</ThemedText>
              <ThemedText className="text-xl font-bold">
                {formatCurrency(getPendingAmount())}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>

      <View className="mb-5">
        <ThemedText className="text-xl font-bold mb-3">My Groups</ThemedText>
        {user?.group?.map((group) => (
          <Pressable
            key={group.id}
            onPress={() => router.push(`/group/${group.id}`)}
          >
            <View key={group.id} className="bg-white/10 rounded-xl p-4 mb-3">
              <View className="flex-row justify-between items-center">
                <View>
                  <ThemedText className="text-lg font-semibold">
                    {group.groupName}
                  </ThemedText>
                  <ThemedText className="text-white/70">
                    {group.groupDescription}
                  </ThemedText>
                </View>
                <View className="bg-white/20 rounded-full p-2">
                  <Ionicons name="people-outline" size={20} color="white" />
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      {/* Recent Transactions */}
      <View className="mb-5">
        <ThemedText className="text-xl font-bold mb-3">
          Recent Transactions
        </ThemedText>
        {user?.involvedIn?.slice(0, 3).map((txn) => (
          <View
            key={txn.id}
            className="bg-white/10 rounded-xl overflow-hidden mb-3"
          >
            <View className="px-4 py-3">
              <View className="flex-row justify-between items-center">
                <ThemedText className="text-lg font-bold">
                  {txn.txnName}
                </ThemedText>
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

            <View className="px-4 py-3 border-t border-white/10">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color="rgba(255,255,255,0.7)"
                  />
                  <ThemedText className="text-white/70 ml-2">
                    {format(new Date(txn.date), "MMM dd, yyyy")}
                  </ThemedText>
                </View>
                <ThemedText className="text-xl font-semibold">
                  {formatCurrency(txn.amount)}
                </ThemedText>
              </View>
            </View>
          </View>
        ))}
        <Pressable
          className="flex items-center justify-center w-full py-2 rounded-lg bg-white/5 my-4"
          onPress={() => signOut()}
        >
          <ThemedText className="text-rose-500">Sign Out</ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

import { Alert, Image, Pressable, Text, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useGroupById } from "@/hooks/getGroupById";
import { ScrollView } from "react-native";
import {
  ArrowRightLeft,
  Check,
  LogOut,
  Trash,
  Users,
} from "lucide-react-native";
import api from "@/lib/axios";
import { useRouter } from "expo-router";
import { useOwedInGroup } from "@/hooks/getOwedinGrp";

interface Balance {
  userId: string;
  username: string;
  imageUrl?: string;
  balance: number;
}

export function AboutScreen({ route }: { route: any }) {
  const { groupId, userId } = route.params;
  const router = useRouter();
  const { data: group } = useGroupById(groupId);

  const { data: balances } = useOwedInGroup(groupId);

  if (!group) {
    return <ThemedText>Group Doesnt Exist</ThemedText>;
  }

  const handleBulkSettle = async () => {
    console.log("[ress");
  };

  const handleLeave = async () => {
    try {
      const response = await api.post("/group/leave-group", {
        groupId,
      });

      if (response.data.message) {
        alert(response.data.message);
        router.push("/");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Failed to leave the group");
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleDelete(),
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );

  const handleDelete = async () => {
    try {
      const response = await api.delete("/group/", {
        data: { groupId },
      });

      if (response.data.message) {
        alert(response.data.message);
        router.push("/");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || "Failed to delete the group");
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <ThemedView className="flex-1 mt-2">
      <ScrollView className="pt-4">
        <View
          key="header"
          className="bg-white/10 rounded-2xl overflow-hidden mb-5"
        >
          <View className="bg-white/10 px-5 py-4">
            <View className="flex-row justify-between items-center">
              <View>
                <ThemedText className="text-2xl font-bold">
                  {group?.groupName}
                </ThemedText>
                <ThemedText className="text-white/70 mt-1">
                  {group?.groupDescription}
                </ThemedText>
              </View>

              <View className={`px-3 py-1 rounded-full`}>
                <Image
                  source={{
                    uri:
                      "https://ui-avatars.com/api/?name=" +
                      (group?.groupName || "User") +
                      "&background=bebebe",
                  }}
                  className="w-14 h-14 rounded-full"
                />
              </View>
            </View>
          </View>

          <View className="px-5 py-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Users height={18} width={18} color="#bbbbbb" />
                <ThemedText className="text-white/70 ml-2">
                  {group.members.length}
                </ThemedText>
              </View>
            </View>
            <View className="flex-row items-center mt-1">
              <ArrowRightLeft height={18} width={18} color="#bbbbbb" />

              <ThemedText className="text-white/70 ml-2">
                {group.transactions.length}
              </ThemedText>
            </View>
          </View>
        </View>

        <ThemedText type="subtitle" className="mb-2 mt-4">
          Balances
        </ThemedText>
        <View className="w-full rounded-xl bg-white/10 mb-4">
          {balances && balances.length > 0 ? (
            balances.map((balance: Balance, idx: number) => (
              <View
                key={balance.userId}
                className={`${balances.length - 1 != idx ? "border-b-[0.5px] border-white/20" : ""} px-4 py-3 flex-row justify-between items-center`}
              >
                <View className="flex-row items-center">
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
                  <ThemedText>{balance.username}</ThemedText>
                </View>

                <View className="flex-row items-center">
                  <Text
                    className={
                      balance.balance >= 0
                        ? "dark:text-[#ADFFB1BF] text-[#51ff20]"
                        : "dark:text-[#ff8800] text-[#ff8800]"
                    }
                  >
                    {balance.balance >= 0
                      ? `₹${Math.abs(balance.balance)}`
                      : `₹${Math.abs(balance.balance)}`}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View className="px-4 py-3">
              <ThemedText className="text-white/70">
                No balances to show
              </ThemedText>
            </View>
          )}
        </View>

        <ThemedText type="subtitle" className="mb-2">
          Transactions
        </ThemedText>
        <View className="w-full h-fit justify-around rounded-xl  bg-white/10 mb-4">
          <View className="px-4 py-1">
            <Pressable
              onPress={handleBulkSettle}
              className="flex flex-row items-center"
            >
              <Check color="#bebebe" opacity="0.7" size={20} />
              <ThemedText className="py-2 px-4 ">Settle Up</ThemedText>
            </Pressable>
          </View>
        </View>

        <ThemedText type="subtitle" className="mb-2">
          Settings
        </ThemedText>
        <View className="w-full h-fit justify-around rounded-xl  bg-white/10">
          <View className="border-b-[0.5px] border-white/20 px-4 py-1">
            <Pressable
              onPress={handleLeave}
              className="flex flex-row items-center"
            >
              <LogOut color="#bebebe" opacity="0.7" size={20} />
              <ThemedText className="py-2 px-4 ">Leave Group</ThemedText>
            </Pressable>
          </View>
          <View className="px-4 py-1">
            <Pressable
              onPress={showAlert}
              className="flex flex-row items-center"
            >
              <Trash color="red" opacity="0.6" size={20} />
              <ThemedText className="py-2 px-4 ">Delete Group</ThemedText>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

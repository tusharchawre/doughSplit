import { User, useUser } from "@/hooks/getUser";
import { useUserById } from "@/hooks/getUserById";
import { useGroupById } from "@/hooks/getGroupById";
import { Image, Text, View, Pressable, Animated } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { format, formatDistanceToNow } from "date-fns";
import { useRef, useEffect } from "react";
import { useRouter } from "expo-router";

interface ActivityCardProps {
  id: number;
  txnName: string;
  description: string | null;
  date: string;
  groupId: string;
  paidById: string;
  amount: number;
  currency: "INR" | string;
  settledStatus: string;
  onPress?: () => void;
  participants: number;
}

export const ActivityCard = ({
  id,
  txnName,
  paidById,
  description,
  amount,
  date,
  groupId,
  settledStatus,
  currency,
  participants,
  onPress,
}: ActivityCardProps) => {
  const { data: paidByUser } = useUserById(paidById);
  const { data: group } = useGroupById(groupId);
  const { data: currentUser } = useUser();
  const router = useRouter();

  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

  const isCurrentUserPayer = currentUser?.id === paidById;

  const isOwed = isCurrentUserPayer;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/group/txn/${id}`);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          }}
          className={`w-full bg-white/[0.08] rounded-xl mb-3 overflow-hidden ${
            pressed ? "opacity-80" : "opacity-100"
          }`}
        >
          <View className="p-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text
                className="text-white text-lg font-semibold flex-1 mr-2"
                numberOfLines={1}
              >
                {txnName}
              </Text>
              <View className="flex-row items-center">
                <Ionicons
                  name="time-outline"
                  size={14}
                  color="rgba(255,255,255,0.6)"
                />
                <Text className="text-white/60 text-xs ml-1">
                  {formattedDate}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="relative">
                <Image
                  source={{
                    uri:
                      paidByUser?.imageUrl ||
                      "https://ui-avatars.com/api/?name=" +
                        (paidByUser?.username || "User") +
                        "&background=bebebe",
                  }}
                  className="w-14 h-14 rounded-full"
                />
                <View className="absolute -bottom-1 -right-1 bg-black rounded-full p-1">
                  <FontAwesome5
                    name={
                      isCurrentUserPayer
                        ? "hand-holding-usd"
                        : "money-bill-wave"
                    }
                    size={10}
                    color={isCurrentUserPayer ? "#51ff20" : "#ffffff"}
                  />
                </View>
              </View>

              <View className="flex-1 ml-3">
                <View className="flex-row items-center">
                  <Text className="text-white font-medium">
                    {isCurrentUserPayer ? "You" : paidByUser?.username}
                  </Text>
                  <Text className="text-white/70 mx-1">paid for</Text>
                  <Text className="text-white font-medium">
                    {group?.groupName}
                  </Text>
                </View>

                {description && (
                  <Text className="text-white/60 text-sm" numberOfLines={1}>
                    {description}
                  </Text>
                )}

                <View className="flex-row justify-between items-center mt-1">
                  <View className="flex-row items-center">
                    <Text className="text-white/70 text-sm">
                      {isOwed ? "You are owed" : "You owe"}
                    </Text>
                    <Text
                      className={`ml-1 text-sm font-bold ${
                        isOwed ? "text-[#51ff20]" : "text-[#FF5757]"
                      }`}
                    >
                      {currency === "INR" ? "₹" : "$"}
                      {(amount - (amount / participants)).toFixed(2)}
                    </Text>
                  </View>

                  <View
                    className={`px-2 py-0.5 rounded-full ${
                      settledStatus === "COMPLETED"
                        ? "bg-[#51ff20]/20"
                        : "bg-white/10"
                    }`}
                  >
                    <Text
                      className={`text-xs ${
                        settledStatus === "COMPLETED"
                          ? "text-[#51ff20]"
                          : "text-white/70"
                      }`}
                    >
                      {settledStatus}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
};

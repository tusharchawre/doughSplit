// components/Cards/friendsCard.tsx
import { Image, Pressable, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { useTotalOwedToFriend } from "@/hooks/getOwedBtFriend";

interface FriendsCardProps {
  id: string;
  groupName: string;
  groupDescription: string;
}

export const FriendsCard = ({
  id,
  groupDescription,
  groupName,
}: FriendsCardProps) => {
  const { data: balanceData, isLoading } = useTotalOwedToFriend(id);
  const router = useRouter();

  return (
    <Pressable className="w-full h-28 bg-white/[0.05] rounded-xl">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri:
              balanceData?.friend?.imageUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(groupName)}&background=bebebe`,
          }}
          className="w-20 h-20 rounded-lg m-4"
        />

        <View>
          <ThemedText className="text-white text-xl font-semibold">
            {groupName}
          </ThemedText>

          {isLoading ? (
            <ThemedText className="text-white/70 text-lg">
              Calculating...
            </ThemedText>
          ) : balanceData?.totalBalance === 0 ? (
            <ThemedText className="text-white/70 text-lg">
              All settled up
            </ThemedText>
          ) : balanceData?.totalBalance! > 0 ? (
            <ThemedText className="text-white/70 text-lg">
              Owes you
              <Text className="dark:text-[#ADFFB1BF] text-[#51ff20]">
                {" "}
                ₹{Math.abs(balanceData?.totalBalance!).toFixed(2)}
              </Text>
            </ThemedText>
          ) : (
            <ThemedText className="text-white/70 text-lg">
              You owe
              <Text className="dark:text-[#ff8800] text-[#ff8800]">
                {" "}
                ₹{Math.abs(balanceData?.totalBalance!).toFixed(2)}
              </Text>
            </ThemedText>
          )}
        </View>
      </View>
    </Pressable>
  );
};

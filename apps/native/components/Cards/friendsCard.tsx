import { Image, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";

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
  return (
    <View className="w-full h-28 bg-white/[0.05] rounded-xl">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri: "https://plus.unsplash.com/premium_photo-1670279526726-128d22144ad9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-20 h-20 rounded-lg m-4"
        />

        <View>
          <ThemedText className="text-white text-xl font-semibold">
            {groupName}
          </ThemedText>
          <ThemedText className="text-white/70 text-lg">
            You are owed
            <Text className="dark:text-[#ADFFB1BF] text-[#51ff20]">
              {" "}
              ₹500.64
            </Text>
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

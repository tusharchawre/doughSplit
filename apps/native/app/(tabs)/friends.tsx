import { FriendsCard } from "@/components/friendsCard";
import { GroupCard } from "@/components/groupCard";
import { getUser } from "@/hooks/getUser";
import { Text, View } from "react-native";

export default function Friends() {
  const user = getUser();

  const friends = user?.friends;

  if (!friends) {
    return (
      <View className="bg-black flex-1 px-4">
        <Text className="text-white">
          Awwww you dont have any friends? Grow up bro
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full bg-black px-4">
      <Text className="text-white text-2xl  mb-4">Friends</Text>

      <View className="flex gap-4  ">
        {friends.map((friend) => (
          <FriendsCard
            key={friend.id}
            id={friend.id}
            groupName={friend.username}
            groupDescription=""
          />
        ))}
      </View>
    </View>
  );
}

import { FriendsCard } from "@/components/friendsCard";
import { GroupCard } from "@/components/groupCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getUser } from "@/hooks/getUser";
import { Text, View } from "react-native";

export default function Friends() {
  const user = getUser();

  const friends = user?.friends;

  if (!friends) {
    return (
      <ThemedView className="flex-1 px-4">
        <ThemedText type="defaultSemiBold" className="text-white">
          Awwww you dont have any friends? Grow up bro
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 w-full bg-black px-4">
      <Text className="text-white text-2xl  mb-4">Friends</Text>

      <ThemedView className="flex gap-4  ">
        {friends.map((friend) => (
          <FriendsCard
            key={friend.id}
            id={friend.id}
            groupName={friend.username}
            groupDescription=""
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

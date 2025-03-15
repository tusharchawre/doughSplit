import { FriendsCard } from "@/components/Cards/friendsCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/hooks/getUser";
import { Text, View } from "react-native";

export default function Friends() {
  const { data: user, refetch, isPending } = useUser();

  const friends = user?.friends;

  if (!friends) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText className="text-center">
          You don't have any friends yet.
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 w-full bg-black px-4">
      <ThemedText type="defaultSemiBold">Friends</ThemedText>
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

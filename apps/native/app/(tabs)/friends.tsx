import { FriendsCard } from "@/components/Cards/friendsCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useUser } from "@/hooks/getUser";
import { useFocusEffect, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Friends() {
  const { data: user, refetch, isPending } = useUser();

  const router = useRouter()

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
      <ThemedView className="flex gap-4 mt-2 ">
        {friends.map((friend) => (
          <FriendsCard
            key={friend.id}
            id={friend.id}
            groupName={friend.username}
            groupDescription=""
          />
        ))}
        <Pressable className="mx-auto my-4 bg-white/20 px-4 py-2 rounded-md" onPress={()=> router.push("/friend/add")}>
          <ThemedText>Add + </ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

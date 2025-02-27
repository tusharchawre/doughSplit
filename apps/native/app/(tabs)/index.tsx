import { GroupCard } from "@/components/groupCard";
import { GroupSheet } from "@/components/groupSheet";
import { getUser, User } from "@/hooks/getUser";
import { RefreshControl, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Groups() {
  const [refreshing, setRefreshing] = useState(false);
  const user = getUser();
  const groups = user?.group;

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const router = useRouter();

  if (!groups) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ThemedText className="text-center">
          You haven't joined any groups yet.
        </ThemedText>
      </ThemedView>
    );
  }

  const handleGroupPress = (id: string) => {
    router.push(`/group/${id}`);
  };

  return (
    <ThemedView className="flex-1 w-full bg-black px-4">
      <ThemedText type="defaultSemiBold" className="text-white text-2xl  mb-4">
        Groups
      </ThemedText>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex gap-4"
      >
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            groupName={group.groupName}
            groupDescription={group.groupDescription}
            onPress={() => handleGroupPress(group.id)}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

import { GroupCard } from "@/components/groupCard";
import { GroupSheet } from "@/components/groupSheet";
import { getUser, User } from "@/hooks/getUser";
import { Pressable, RefreshControl, ScrollView, Text, useColorScheme, View } from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Groups() {
  const user = getUser()
  const groups = user?.group;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const router = useRouter();

  if (!groups) {
    return (
      <ThemedView className="flex-1">
        <ThemedText>There are no groups here.</ThemedText>
      </ThemedView>
    );
  }

  const handleGroupPress = (id: string) => {
    router.push(`/group/${id}`);
  };

  return (
    <ThemedView className="flex-1 w-full bg-black px-4">
      <ThemedText type="subtitle" className="text-white text-2xl  mb-4">Groups</ThemedText>

    

      <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } className="flex gap-4">
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

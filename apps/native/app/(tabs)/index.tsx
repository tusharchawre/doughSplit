import { GroupCard } from "@/components/Cards/groupCard";
import { useUser } from "@/hooks/getUser";
import { ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Animated } from "react-native";
import { FadeInView } from "@/components/animations/FadeInView";

export default function Groups() {
  const { data: user, refetch, isPending } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const groups = user?.group;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const router = useRouter();

  if (isPending) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="small" color="#bebebe" />
      </ThemedView>
    );
  }

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
      <ThemedText type="defaultSemiBold">Groups</ThemedText>

      <Animated.ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex gap-4"
      >
        {groups.map((group, index) => (
          <FadeInView key={group.id} delay={index * 100} duration={400}>
            <GroupCard
              key={group.id}
              id={group.id}
              groupName={group.groupName}
              groupDescription={group.groupDescription}
              onPress={() => handleGroupPress(group.id)}
            />
          </FadeInView>
        ))}
      </Animated.ScrollView>
    </ThemedView>
  );
}

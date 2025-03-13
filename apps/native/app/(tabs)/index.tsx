import { GroupCard } from "@/components/Cards/groupCard";
import { useUser } from "@/hooks/getUser";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Animated } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
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
    }, 2000);
  }, []);

  const router = useRouter();

  if (isPending) {
    return (
      <ThemedView className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="small" color="#ffffff" />
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
      <ThemedText type="defaultSemiBold" className="text-white text-2xl  mb-4">
        Groups
      </ThemedText>

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

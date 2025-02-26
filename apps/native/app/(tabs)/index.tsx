import { GroupCard } from "@/components/groupCard";
import { GroupSheet } from "@/components/groupSheet";
import { getUser, User } from "@/hooks/getUser";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Groups() {
  const user = getUser();
  const groups = user?.group;

  const router = useRouter();

  if (!groups) {
    return (
      <View className="flex-1 bg-black">
        <Text className="text-white">There are no groups here.</Text>
      </View>
    );
  }

  const handleGroupPress = (id: string) => {
    router.push(`/group/${id}`);
  };

  return (
    <View className="flex-1 w-full bg-black px-4">
      <Text className="text-white text-2xl  mb-4">Groups</Text>

      <View className="flex gap-4  ">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            groupName={group.groupName}
            groupDescription={group.groupDescription}
            onPress={() => handleGroupPress(group.id)}
          />
        ))}
      </View>
    </View>
  );
}

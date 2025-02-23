import { GroupCard } from "@/components/groupCard";
import { getUser, User } from "@/hooks/getUser";
import { Text, View } from "react-native";

export default function Groups() {
  const user = getUser();

  const groups = user?.group;

  if (!groups) {
    return (
      <View>
        <Text>There are no groups here.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 w-full bg-black px-4">
      <Text className="text-white text-2xl  mb-4">Groups</Text>

      <View className="flex gap-4  ">
        {groups.map((group) => (
          <GroupCard
            key={group.groupName}
            id={group.id}
            groupName={group.groupName}
            groupDescription={group.groupDescription}
          />
        ))}
      </View>
    </View>
  );
}

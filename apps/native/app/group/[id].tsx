import { Text, View } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import { getUser } from "@/hooks/getUser";
import { getTxnByGroupId } from "@/hooks/getTxnByGroupId";

export default function Route() {
  const params = useLocalSearchParams<{
    id: string;
  }>();

  const groupId = params.id;

  const user = getUser();

  const group = user?.group.find((group) => group.id === groupId);

  const txn = getTxnByGroupId(groupId);

  return (
    <View className="flex-1 items-center justify-center bg-zinc-950 p-4">
      <Text className="text-lg  text-white">
        {JSON.stringify(group)}
        {JSON.stringify(txn)}
      </Text>
    </View>
  );
}

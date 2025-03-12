import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/ctx";
import { useUser } from "@/hooks/getUser";
import { Button, ScrollView, Text, View } from "react-native";

export default function Account() {
  const { data: user, refetch, isPending } = useUser();

  const { signOut } = useSession();

  return (
    <ScrollView className="bg-black flex-1">
      <Text className="text-white">{JSON.stringify(user).trim()}</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScrollView>
  );
}

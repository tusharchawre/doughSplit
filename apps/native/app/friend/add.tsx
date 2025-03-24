import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAllUsers } from "@/hooks/getAllUsers";
import { Search } from "lucide-react-native";
import {
  FlatList,
  View,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { User, useUser } from "@/hooks/getUser";
import api from "@/lib/axios";

export default function AddScreen() {
  const { data: users } = useAllUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {},
  );
  const { data: user, refetch: refetchUser } = useUser();

  useEffect(() => {
    if (users) {
      const requiredUsers = users.filter((friend) => user?.id != friend.id);
      setFilteredUsers(requiredUsers);
    }
  }, [users, user]);

  const handleAddFriend = async (friendId: string) => {
    // Set loading state for this specific friend
    setLoadingStates((prev) => ({ ...prev, [friendId]: true }));

    try {
      const response = await api.post("/user/friends/add", {
        friendId,
      });

      await refetchUser();

      if (response.data.message == "Friends Created!") {
        alert("You are friends now!");
      }
    } catch (error) {
      console.error("Error adding/removing friend:", error);
      alert("Failed to update friend status. Please try again.");
    } finally {
      // Clear loading state for this specific friend
      setLoadingStates((prev) => ({ ...prev, [friendId]: false }));
    }
  };

  const handleInputChange = (text: string) => {
    setQuery(text);

    if (!users) return;

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredUsers(filtered);
  };

  const getButtonText = (userId: string) => {
    if (loadingStates[userId]) {
      return user?.friends.some((friend) => friend.id === userId)
        ? "Removing..."
        : "Adding...";
    }

    return user?.friends.some((friend) => friend.id === userId)
      ? "Remove"
      : "Add";
  };

  return (
    <ThemedView className="mt-16 px-4 flex flex-1 gap-4">
      <ThemedText type="defaultSemiBold">Add Friends</ThemedText>
      <View className="flex flex-row gap-4 items-center px-4 bg-white/10 h-12 w-full rounded-md">
        <Search size={24} color="#aeaeae" />
        <TextInput
          value={query}
          onChangeText={handleInputChange}
          placeholder="Search"
          className="text-white"
          placeholderTextColor="#aeaeae"
        />
      </View>

      <View className="flex-1 w-full">
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => (
            <View className="bg-white/10 h-20 flex flex-row px-4 items-center w-full my-2 rounded-lg gap-4 justify-between">
              <View className="flex flex-row items-center gap-4">
                <Image
                  source={{
                    uri:
                      "https://ui-avatars.com/api/?name=" +
                      (item.username || "User") +
                      "&background=bebebe",
                  }}
                  className="w-12 h-12 rounded-full"
                />
                <ThemedText>{item.username}</ThemedText>
              </View>

              <Pressable
                onPress={() => handleAddFriend(item.id)}
                disabled={loadingStates[item.id]}
                className={`${loadingStates[item.id] ? "bg-white/10" : "bg-white/20"} px-2 py-1 rounded-md`}
              >
                <ThemedText>{getButtonText(item.id)}</ThemedText>
              </Pressable>
            </View>
          )}
          keyExtractor={(user) => user.id}
          ListEmptyComponent={
            <ThemedView className="flex-1 justify-center items-center p-4">
              <ActivityIndicator size="small" color="#bebebe" />
            </ThemedView>
          }
        />
      </View>
    </ThemedView>
  );
}

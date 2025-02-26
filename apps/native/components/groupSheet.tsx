import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { getUser } from "@/hooks/getUser";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import api from "@/lib/axios";
import { router } from "expo-router";

interface SheetProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

export const GroupSheet = ({ bottomSheetRef }: SheetProps) => {
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const user = getUser();

  if (!user) {
    return (
      <View>
        <Text>There is something wrong.</Text>
      </View>
    );
  }

  const friends = user?.friends || [];

  const data = friends.map((friend) => ({
    key: friend.id,
    value: friend.username,
  }));

  if (!data.length) {
    return null;
  }

  const handleCreateGroup = async () => {
    const membersToSend = [...selectedFriendIds, user.id];
    setLoading(true);
    try {
      const response = await api.post("/group/create-group", {
        groupName,
        groupDescription,
        members: membersToSend,
      });

      const groupId = response.data.group.id;
      bottomSheetRef.current?.close();
      router.push(`/group/${groupId}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheet
      snapPoints={["90%"]}
      ref={bottomSheetRef}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ display: "none" }}
      handleStyle={{ display: "none" }}
    >
      <BottomSheetView className="overflow-hidden h-full rounded-lg ">
        <View className="h-full flex gap-4 bg-zinc-950 px-8 py-8">
          <Text className="text-white text-2xl font-semibold">Add a Group</Text>
          <View>
            <Text className="text-white text-xl mb-4">Group Name</Text>
            <TextInput
              className="bg-white/10 p-4 text-xl rounded-lg mb-4 text-white"
              placeholder="Group Name"
              placeholderTextColor="#ffffff80"
              autoCapitalize="none"
              value={groupName}
              onChangeText={setGroupName}
            />
          </View>
          <View>
            <Text className="text-white text-xl mb-4">Group Description</Text>
            <TextInput
              className="bg-white/10 p-4 text-xl rounded-lg mb-4 text-white"
              placeholder="Group Description"
              placeholderTextColor="#ffffff80"
              autoCapitalize="none"
              value={groupDescription}
              onChangeText={setGroupDescription}
            />
          </View>

          <View>
            <MultipleSelectList
              dropdownTextStyles={{ color: "white" }}
              labelStyles={{ color: "white" }}
              checkBoxStyles={{
                backgroundColor: "black",
                borderColor: "white",
              }}
              boxStyles={{ borderColor: "white" }}
              inputStyles={{ color: "white" }}
              badgeStyles={{ backgroundColor: "#ffffff30" }}
              setSelected={setSelectedFriendIds}
              data={data}
              save="key"
              label="Friends"
              placeholder="Select friends"
              notFoundText="No friends found"
              closeicon={
                <Text style={{ fontSize: 20, color: "white" }}>✕</Text>
              }
              maxHeight={300}
            />
          </View>

          <Pressable
            className={`bg-white p-4 rounded-lg mt-4 ${loading ? "opacity-50" : ""}`}
            onPress={handleCreateGroup}
            disabled={loading}
          >
            <Text className="text-black text-center text-xl font-semibold">
              {loading ? "Creating..." : "Create a Group"}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

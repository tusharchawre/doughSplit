import { Image, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useGroupById } from "@/hooks/getGroupById";
import { Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { format } from "date-fns";
import { ArrowRightLeft, Users } from "lucide-react-native";

export function AboutScreen({ route }: { route: any }) {
  const { groupId, userId } = route.params;

  const { data: group } = useGroupById(groupId);

  if(!group){
    return(
      <ThemedText>Group Doesnt Exist</ThemedText>
    )
  }



  return (
    <ThemedView className="flex-1 mt-2">
      <ScrollView className="flex-1">
        <View className="pt-4">
          <View
            key="header"
            className="bg-white/10 rounded-2xl overflow-hidden mb-5"
          >
            <View className="bg-white/10 px-5 py-4">
              <View className="flex-row justify-between items-center">
                <View>
                  <ThemedText className="text-2xl font-bold">
                    {group?.groupName}
                  </ThemedText>
                  <ThemedText className="text-white/70 mt-1">
                    {group?.groupDescription}
                  </ThemedText>
                </View>

                <View className={`px-3 py-1 rounded-full`}>
                  <Image
                    source={{
                      uri:
                        "https://ui-avatars.com/api/?name=" +
                        (group?.groupName || "User") +
                        "&background=bebebe",
                    }}
                    className="w-14 h-14 rounded-full"
                  />
                </View>
              </View>
            </View>

            <View className="px-5 py-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                <Users height={18} width={18} color="#bbbbbb" />
                  <ThemedText className="text-white/70 ml-2">{group.members.length}</ThemedText>
                </View>
              </View>
              <View className="flex-row items-center mt-1">
              <ArrowRightLeft height={18} width={18} color="#bbbbbb" />

                <ThemedText className="text-white/70 ml-2">{group.transactions.length}</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

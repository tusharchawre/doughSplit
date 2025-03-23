import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";

export default function Route() { 
    const params = useLocalSearchParams<{
        id: string;
      }>();

      const groupId = params.id

    return(
        <ThemedView>
            <ThemedText>
                Settle Up {groupId}
            </ThemedText>
        </ThemedView>
    )
}
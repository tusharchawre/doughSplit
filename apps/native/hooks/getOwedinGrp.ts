import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useOwedInGroup(groupId: string) {
  return useQuery({
    queryKey: ["owedInGroup", groupId],
    queryFn: () => getOwedById(groupId),
  });
}
const getOwedById = async (groupId: string) => {
  try {
    const response = await api.post(`/user/friends/owed-in-group`, {
      groupId,
    });
    return response.data.balances;
  } catch (error) {
    console.error("Failed to fetch group:", error);
    throw error;
  }
};

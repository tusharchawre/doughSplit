import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "./getUser";
import { Transaction } from "./getTxnByGroupId";

interface Group {
    id: string
    groupName: string
    groupDescription: string
    members: User[]
    transaction : Transaction[]
}

export function useGroupById(groupId: string) {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroupById(groupId),
  });
}
const getGroupById = async (groupId: string) => {
    try {
      const response = await api.get(`/group/${groupId}`);
      return response.data.group as Group;
    } catch (error) {
      console.error("Failed to fetch group:", error);
      throw error; 
    }
  };


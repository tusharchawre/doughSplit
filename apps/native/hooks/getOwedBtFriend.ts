// hooks/useTotalOwedToFriend.ts
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface TransactionDetail {
  transactionId: number;
  transactionName: string;
  groupId: string;
  groupName: string;
  amount: number;
  date: string;
  type: "friend_owes_user" | "user_owes_friend";
}

interface FriendBalanceData {
  friend: {
    id: string;
    username: string;
    imageUrl: string | null;
  };
  totalBalance: number;
  transactionDetails: TransactionDetail[];
}

export function useTotalOwedToFriend(friendId: string) {
  return useQuery({
    queryKey: ["totalOwedToFriend", friendId],
    queryFn: () => getTotalOwedToFriend(friendId),
    enabled: !!friendId,
  });
}

const getTotalOwedToFriend = async (
  friendId: string,
): Promise<FriendBalanceData> => {
  try {
    const response = await api.post(`/user/friends/total-owed-to-friend`, {
      friendId,
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch total balance with friend:", error);
    throw error;
  }
};

import { useState } from "react";
import api from "@/lib/axios";

export function useAddFriend() {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const addFriend = async (friendId: string) => {
    try {
      setIsAdding(true);
      setError(null);

      const response = await api.post(`/user/friends/add`, {
        friendId,
      });

      setResult(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to add friend";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsAdding(false);
    }
  };

  return { addFriend, isAdding, error, result };
}

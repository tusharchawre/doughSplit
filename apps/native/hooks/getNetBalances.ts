import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface NetBalance {
  userId: string;
  username: string;
  imageUrl: string;
  netBalance: number;
}

interface NetBalancesResponse {
  success: boolean;
  totalNetBalance: number;
  netBalances: NetBalance[];
}

export function useNetBalances() {
  return useQuery({
    queryKey: ["netBalances"],
    queryFn: getNetBalances,
  });
}

const getNetBalances = async (): Promise<NetBalancesResponse> => {
  try {
    const response = await api.post(`/user/net-balances`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch net balances:", error);
    throw error;
  }
};

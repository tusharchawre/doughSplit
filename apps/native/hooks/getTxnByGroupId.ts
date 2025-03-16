import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "./getUser";

export interface Transaction {
  id: number;
  txnName: string;
  description: string;
  groupId: string;
  date: string;
  paidById: string;
  amount: number;
  currency: "INR" | string;
  settledStatus: string;
  participants: User[];
}

const fetchTxnByGroupId = async (groupId: string) => {
  const response = await api.post("/group/transactions/", {
    groupId,
  });
  return response.data.transactions as Transaction[];
};

export const useTxnByGroupId = (groupId: string) => {
  return useQuery({
    queryKey: ["transactions", groupId],
    queryFn: () => fetchTxnByGroupId(groupId),
    staleTime: 1000 * 60 * 5,
  });
};

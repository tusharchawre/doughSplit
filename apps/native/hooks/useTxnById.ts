import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "./getTxnByGroupId";

export function useTxnById(txnId: string) {
  return useQuery({
    queryKey: ["transaction", txnId],
    queryFn: () => fetchTxnById(txnId),
    enabled: !!txnId,
  });
}

const fetchTxnById = async (txnId: string) => {
  try {
    const response = await api.get(`/group/transactions/${txnId}`);
    return response.data.txn as Transaction;
  } catch (error) {
    console.error("Failed to fetch transaction:", error);
    throw error;
  }
};

import api from "@/lib/axios";
import { useEffect, useState } from "react";

export interface Transaction {
  id: number;
  txnName: string;
  description: string;
  date: string;
  paidBy: string;
  amount: number;
  currency: "INR" | string;
  settledStatus: string;
  participants: [];
}

export const getTxnByGroupId = (groupId: string) => {
  const [txn, setTxn] = useState<Transaction[]>([]);

  const fetchTxn = async () => {
    const response = await api.post("/group/transactions/", {
      groupId,
    });

    setTxn(response.data.transactions);
  };

  useEffect(() => {
    fetchTxn();
  });

  return txn;
};

import api from "@/lib/axios";
import { useEffect, useState } from "react";

export const getTxnByGroupId = (groupId: string) => {
  const [txn, setTxn] = useState([]);

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

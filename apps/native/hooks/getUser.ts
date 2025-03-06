import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";
import { useQueries, useQuery } from "@tanstack/react-query";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  imageUrl: string | null;
  group: {
    id: string;
    groupName: string;
    groupDescription: string;
  }[];
  friends: {
    id: string;
    username: string;
    email: string;
    phoneNumber: string | null;
    imageUrl: string | null;
  }[];
  involvedIn: {
    id: number;
    txnName: string;
    description: string | null;
    date: string;
    groupId: string;
    paidById: string;
    amount: number;
    currency: "INR" | string;
    settledStatus: "PENDING" | "COMPLETED";
  }[];
}

// export const getUser = () => {
//   const [user, setUser] = useState<User>();

//   const fetchUser = async () => {
//     try {
//       const response = await api.get("/user/profile");
//       const resUser = response.data.user;
//       setUser(resUser);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return user;
// };

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}

const getUser = async () => {
  const response = await api.get("/user/profile");

  return response.data.user as User;
};

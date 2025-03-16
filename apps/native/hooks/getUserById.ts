import { useEffect, useState } from "react";
import { User } from "./getUser";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getUserById = async (userId: string) => {
  const response = await api.get(`/user/id/${userId}`);
  return response.data.user as User;
};

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ["userById", userId],
    queryFn: () => getUserById(userId),
  });
};

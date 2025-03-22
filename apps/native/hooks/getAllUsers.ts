import { useEffect, useState } from "react";
import { User } from "./getUser";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
  const response = await api.get(`/user/friends/getUsers`);
  return response.data.users as User[];
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getUsers(),
  });
};

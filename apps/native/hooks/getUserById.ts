import { useEffect, useState } from "react";
import { User } from "./getUser";
import api from "@/lib/axios";

export const getUserById = (id: string) => {
  const [user, setUser] = useState<User>();
  const userId = id;

  const fetchUser = async () => {
    const response = await api.get(`/user/id/${id}`);
    const resUser = response.data.user;
    setUser(resUser);
  };

  useEffect(() => {
    fetchUser();
  });

  return user;
};

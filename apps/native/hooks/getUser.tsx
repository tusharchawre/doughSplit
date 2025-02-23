import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";

export interface User {
    id: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string | null,
    imageUrl: string | null,
    group: {
        id: string,
        groupName: string,
        groupDescription: string
    }[],
    friends: {
        id: string,
        username: string,
        email: string,
        phoneNumber: string | null,
        imageUrl: string | null
    }[]
}

export const getUser = () => {
  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    const response = await api.get("/user/profile");

    const resUser = response.data.user
    
    setUser(resUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user;
};

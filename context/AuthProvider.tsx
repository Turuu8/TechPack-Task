"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

const Auth = createContext<UserInfo | null>(null);

interface UserInfo {
  userCheck: boolean;
  data: never[];
  setUserCheck: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<never[]>>;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userCheck, setUserCheck] = useState(false);
  const [data, setData] = useState([]);

  const router = useRouter();
  const { data: session } = useSession() as unknown as {
    data: {
      user: { id: string };
      session: { user: { id: string } };
    };
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`/api/users/${session?.user?.id}/posts`);
      const fetchData = await response.data;
      setData(fetchData[0]);

      if (fetchData[0].role === "admin") {
        router.push("/admin");
      } else {
        if (fetchData[0].role === "user") {
          router.push("/user");
        }
      }
    };
    if (session?.user?.id) fetchPosts();
  }, [router, session?.user?.id]);

  // user login check
  useEffect(() => {
    session === null ? setUserCheck(false) : setUserCheck(true);
  }, [session]);

  useEffect(() => {
    !userCheck && router.push("/login");
  }, [router, userCheck]);

  const value = { userCheck, setUserCheck, data, setData };

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export const useAuthProvider = () => useContext(Auth);

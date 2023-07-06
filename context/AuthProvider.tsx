"use client";

import jwt from "jsonwebtoken";
import { AuthType } from "@types";
import { Loader } from "@components";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const Auth = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [checking, setChecking] = useState(false);
  const [token, setToken] = useState<null | string>("");
  const [userInfo, setUserInfo] = useState();
  const [loader, setLoader] = useState(true);

  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data: any = jwt.decode(token);
      setToken(token);
      setChecking(true);
      setUserInfo(data);
      data ? router.push(`/${data.role}`) : router.push("/login");
    } else {
      setChecking(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    checkAuth();
    setLoader(false);
  }, []);

  const logout = () => {
    setLoader(true);
    localStorage.removeItem("token");
    location.reload();
    router.push("/login");
    return;
  };

  return (
    <Auth.Provider
      value={{
        checking,
        setChecking,
        token,
        setToken,
        userInfo,
        setUserInfo,
        setLoader,
        logout,
      }}
    >
      {children}
      {loader && <Loader />}
    </Auth.Provider>
  );
};

export const useAuthProvider = () => useContext(Auth);

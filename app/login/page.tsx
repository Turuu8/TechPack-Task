/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthProvider } from "@context/AuthProvider";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

const page = () => {
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const router = useRouter();
  const { setUserCheck, setData } = useAuthProvider() as {
    setUserCheck: Dispatch<SetStateAction<boolean>>;
    setData: Dispatch<SetStateAction<never[]>>;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users", {
        email: mail,
        role: role === "" ? "user" : role,
      });
      const data = await res.data;
      console.log(data);
      setData(data);
      setUserCheck(true);
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        if (data.role === "user") {
          router.push("/user");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <div className="w-[370px] bg-white rounded-lg border-[1px] p-8">
        <h1 className="text-center text-2xl pb-6">Log in</h1>
        {/* -------------------- Google Log in -------------------- */}
        {/* {providers &&
          Object.values(providers).map((provider: unknown | any, i) => (
            <button
              key={i}
              className="border-[1px] rounded-md w-full px-3 py-2 flex justify-center gap-4 duration-100 active:translate-y-[1.5px]"
              onClick={() => {
                signIn(provider.id);
              }}
            >
              <Image alt="google icon" src="/assets/icons/google-icon.svg" width={25} height={25} className="w-[25px] h-[25px]" />
              <span className="font-bold opacity-80">{switchBtn ? "Log in with Google" : "Sign up with Google"}</span>
            </button>
          ))}
        <p className="text-center opacity-50 py-4">or</p> */}
        {/* -------------------- Login in Form -------------------- */}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label>
            <span className=" opacity-50">Email</span>
            <input type="email" className="w-full rounded-md p-2 border-[1px]" onChange={(e) => setMail(e.target.value)} />
          </label>
          <label>
            <span className=" opacity-50">Password</span>
            <input type="password" className="w-full rounded-md p-2 border-[1px]" onChange={(e) => setPass(e.target.value)} />
          </label>
          <label className="flex justify-between items-center mt-2">
            <span className="opacity-50">Admin or User</span>
            <select name="select" defaultValue="user" className="border-[1px] w-1/3 rounded-md p-2" onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit" className="py-3 rounded-md mt-6 font-bold bg-[#1576ea] text-white active:translate-y-[1px]">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;

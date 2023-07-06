"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export const Users = ({ email, username, role, image, _id }: T) => {
  const [edit, setEdit] = useState(false);
  const [changeRole, setChangeRole] = useState(role);

  const handleEdit = async () => {
    const res = await axios.put(`api/users/${_id}`, { role: changeRole });
    console.log();
    res.request.status === 200 ? alert("Амжилттай") : alert("Амжилтгүй");
  };

  return (
    <div className="flex items-center border-[2px] mt-2 px-4 py-2 rounded-md">
      <Image
        src={image ? image : "/assets/images/profile.png"}
        alt="profile image"
        width={100}
        height={100}
        className="w-[35px] h-[35px] rounded-full"
      />
      <div className="flex justify-between w-full ml-[90px] relative items-center">
        <h2>{email}</h2>
        <h2 className="capitalize absolute m-auto left-[0] right-0 w-[250px]">{username}</h2>
        <div className="flex gap-5 items-center">
          {edit ? (
            <>
              <button
                className={`border-[1px] px-2 py-1 rounded-md duration-100 ${changeRole === "admin" ? "border-[#000]" : "border-[#cecfcf]"}`}
                onClick={() => setChangeRole("admin")}
              >
                Админ
              </button>
              <button
                className={`border-[1px] px-2 py-1 rounded-md duration-100 ${changeRole === "user" ? "border-[#000]" : "border-[#cecfcf]"}`}
                onClick={() => setChangeRole("user")}
              >
                Хэрэглэгч
              </button>
              <button
                className="flex items-center gap-1 px-2 py-1 rounded-md duration-100 bg-[#1576ea] text-white border-[#0b4893] hover:border-b-[3px] active:border-b-[0px]"
                onClick={() => {
                  handleEdit();
                  setEdit(false);
                }}
              >
                <span>Хадгалах</span>
              </button>
            </>
          ) : (
            <>
              <h2 className="capitalize">{changeRole}</h2>
              <button
                className="flex items-center gap-1 border-[1px] border-[#000] p-1 rounded-md duration-100 hover:border-b-[3px] active:border-b-[0px]"
                onClick={() => setEdit(true)}
              >
                {/* <Image alt="edit icon" src="/assets/icons/edit-pen.svg" width={20} height={20} className="w-[20px] h-[20px]" /> */}
                <span>Засварлах</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export interface T {
  email: string;
  username: string;
  role: string;
  image: string;
  _id: string;
}

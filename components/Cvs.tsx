"use client";

import React, { useState } from "react";
import { O } from "./From";

export const Cvs = (props: O) => {
  const [detail, setDetail] = useState(false);
  return (
    <div className={`gap-5 mt-4 border-[2px] py-2 rounded-md duration-300 ${detail && "border-[#000]"}`}>
      <button className="w-full duration-300" onClick={() => setDetail((prev) => !prev)}>
        <div className="flex justify-between pb-5 ">
          <h2 className="capitalize w-1/5 text-center opacity-50">нэр</h2>
          <h2 className="capitalize w-1/5 text-center opacity-50">Мэргэжэл</h2>
          <h2 className="capitalize w-1/5 text-center opacity-50">Төрсөн огноо</h2>
          <h2 className="capitalize w-1/5 text-center opacity-50">Утасны дугаар</h2>
          <h3 className="capitalize w-1/5 text-center opacity-50">Боловсролын түвшин</h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center w-1/4">{props.firstName}</div>
          <div className="text-center w-1/4">{props.job}</div>
          <div className="text-center w-1/4">{props.birthday}</div>
          <div className="text-center w-1/4 underline">{props.phoneNumber}</div>
          <div className="text-center w-1/4">{props.level}</div>
        </div>
        {/* ---------------- DETAIL ---------------- */}
        {detail && (
          <>
            <div className="flex justify-between pt-5">
              <h2 className="capitalize w-1/5 text-center opacity-50">Овог</h2>
              <h2 className="capitalize w-1/5 text-center opacity-50">Регистрийн дугаар</h2>
              <h2 className="capitalize w-1/5 text-center opacity-50">Гэрлэлтийн байдал</h2>
              <h2 className="capitalize w-1/5 text-center opacity-50">Сургуулийн нэр</h2>
              <h3 className="capitalize w-1/5 text-center opacity-50">Төгссөн он:</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-center w-1/4">{props.lastName}</div>
              <div className="text-center w-1/4">{props.idNumber}</div>
              <div className="text-center w-1/4">{props.maritalStatus}</div>
              <div className="text-center w-1/4 ">{props.schoolName}</div>
              <div className="text-center w-1/4">{props.graduatedYear}</div>
            </div>
            <div className="flex flex-col justify-center items-center mt-10 px-6">
              <span className=" opacity-50">Миний тухай</span>
              <p>{props.aboutMe}</p>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

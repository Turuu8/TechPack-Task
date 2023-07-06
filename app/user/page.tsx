/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import { From } from "@components/From";
import { FormEvent, useState } from "react";
import { useAuthProvider } from "@context/AuthProvider";
import { AuthType } from "@types";
import { useRouter } from "next/navigation";

const page = () => {
  const { userInfo, setLoader, logout } = useAuthProvider() as unknown as AuthType;
  const [cancel, setCancel] = useState(false);
  const [history, setHistory] = useState<any>();
  const [from, setFrom] = useState<O | any>({
    userId: "",
    aboutMe: "",
    lastName: "",
    firstName: "",
    idNumber: "",
    birthday: "",
    phoneNumber: "",
    salary: "",
    gender: "",
    maritalStatus: "",
    enrollmentYear: "",
    graduatedYear: "",
    level: "",
    schoolName: "",
    job: "",
  });
  const router = useRouter();

  const hanleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`api/cv/new`, from);
      const data = await res;
      if (data.request.status === 200) {
        alert("Амжилтай");
      } else {
        alert("Амжилтгүй");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanleEdit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`api/cv/${history?.userId}`, from);
      const data = await res;
      if (data.request.status === 200) {
        alert("Амжилтай Шинчлэгдлээ");
      } else {
        alert("Шинчлэмт Амжилтгүй");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full bg-white">
        <div className="max-width py-5 flex justify-between items-center">
          <h1 className="text-3xl">Анкет</h1>
          <div className="flex gap-5">
            <div className="flex flex-col items-end">
              <span className="text-2xl text-end capitalize font-semibold">
                {userInfo?.lastName}
                <span>{userInfo?.firstName}</span>
              </span>
              <span className="text-xl opacity-50">{userInfo?.email}</span>
            </div>
            <button className="px-6 my-2 click-btn bg-[#f4f4f4] hover-btn" type="button" onClick={logout}>
              <h5 className="text-lg">Гарах</h5>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-width relative">
        <div className="pt-[80px] flex justify-between items-center">
          <div className="flex gap-6"></div>
        </div>
        {/*  -------------- FROM -------------- */}
        {cancel ? null : (
          <div className="pt-[100px]">
            <button className="bg-[#1576ea] text-white py-5 px-10 rounded-lg duration-100 active:translate-y-[3px]" onClick={() => setCancel(true)}>
              <h5 className="text-xl">Анкет үүсгэх</h5>
              <span className="text-4xl">+</span>
            </button>
          </div>
        )}
        {cancel ? (
          <From jobs={jobs} setCancel={setCancel} from={from} setFrom={setFrom} hanleSubmit={history ? hanleEdit : hanleSubmit} history={history} />
        ) : null}
      </div>
    </>
  );
};

export default page;

const jobs = [
  "Хүний нөөц/захиргаа",
  "Худалдан авалт",
  "Тээвэр ложистик",
  "Маркетинг/Борлуулалт",
  "Олон нийтийн харилцаа",
  "Контент медиа/Дизайн",
  "Мэдээллийн технологи/Програм хангамж",
  "Үйлчилгээ",
  "Хөдөө аж ахуй",
  "Эрсдэлийн удирдлага",
  "Бизнес хөгжил",
];

interface O {
  userId: string;
  aboutMe: string;
  lastName: string;
  firstName: string;
  idNumber: string;
  birthday: string;
  phoneNumber: string;
  salary: string;
  gender: string;
  maritalStatus: string;
  enrollmentYear: string;
  graduatedYear: string;
  level: string;
  schoolName: string;
  job: string;
}

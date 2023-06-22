/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import axios from "axios";
import Image from "next/image";
import { From } from "@components/From";
import { signOut } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useAuthProvider } from "@context/AuthProvider";

const page = () => {
  const { data } = useAuthProvider() as unknown as { data: { _id: string; username: string; email: string; image: string } };
  const [cancel, setCancel] = useState(false);
  const [history, setHistory] = useState<any>();
  const [from, setFrom] = useState<O | any>({
    userId: data._id,
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

  const fetchHistory = async () => {
    const res = await axios.put(`api/cv/${data._id}`, {
      id: data._id,
    });

    const dataCV = await res.data;
    if (dataCV[0] === undefined) {
    } else {
      setCancel(true);
      setFrom({
        aboutMe: dataCV[0].aboutMe,
        lastName: dataCV[0].lastName,
        firstName: dataCV[0].firstName,
        idNumber: dataCV[0].idNumber,
        birthday: dataCV[0].birthday,
        phoneNumber: dataCV[0].phoneNumber,
        salary: dataCV[0].salary,
        gender: dataCV[0].gender,
        maritalStatus: dataCV[0].maritalStatus,
        enrollmentYear: dataCV[0].enrollmentYear,
        graduatedYear: dataCV[0].graduatedYear,
        level: dataCV[0].level,
        schoolName: dataCV[0].schoolName,
        job: dataCV[0].job,
      });
      setHistory(dataCV[0]);
    }
  };

  useEffect(() => {
    data && fetchHistory();
  }, []);

  return (
    <div className="w-full max-w-[1280px] mx-auto relative ">
      <div className="pt-[80px] flex justify-between items-center">
        <h1 className="text-6xl">Анкет</h1>
        <div className="flex gap-6">
          {/*  -------------- USER PROFILE -------------- */}
          <div className="flex gap-4 items-center">
            <div>
              <h2 className="text-2xl text-end capitalize">{data?.username}</h2>
              <span className="text-sm opacity-50">{data?.email}</span>
            </div>
            <Image
              src={`${data.image ? data.image : "/assets/images/profile.png"}`}
              alt="profile image"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>
          {/*  -------------- SIGN OUT FUN -------------- */}
          <button
            className="border-[1px] bg-[#1576ea] rounded-md text-white px-6 my-2 duration-100 active:translate-y-[3px]"
            type="button"
            onClick={(e) => {
              signOut();
            }}
          >
            <h5 className="text-lg">Гарах</h5>
          </button>
        </div>
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

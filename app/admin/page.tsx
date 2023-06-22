/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import Image from "next/image";
import { Users } from "@components/Users";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@context/AuthProvider";
import { Cvs } from "@components/Cvs";

const page = () => {
  const [btn, setBtn] = useState(false);
  const [users, setUsers] = useState([]);
  const [cvs, setCvs] = useState([]);
  const [filterJob, setFilterJob] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterPNumber, setFilterPNumber] = useState("");

  const { data } = useAuthProvider() as unknown as { data: { role: string; username: string; email: string; image: string; _id: string } };

  useEffect(() => {
    (async () => {
      try {
        const userRes = await axios.get(`/api/users`);
        const cvRes = await axios.get(`/api/cv`);
        const Userdata = await userRes.data;
        const cvdata = await cvRes.data;
        setUsers(Userdata);
        if (filterJob === "") {
          setCvs(cvdata);
        } else {
          const cvFilter = cvdata.filter((el:any) => el.job === filterJob);
          console.log(cvFilter);
          setCvs(cvFilter);
        }
        if (filterLevel === "") {
          setCvs(cvdata);
        } else {
          const cvFilter = cvdata.filter((el: any) => el.level === filterLevel);
          setCvs(cvFilter);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [filterJob, filterLevel]);
  console.log(filterPNumber);

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mt-10">
        <h1 className="capitalize font-medium text-3xl">админ</h1>
        {/* ----------------- SIGN OUT & PROFILE ----------------- */}
        <div className="flex justify-end items-center gap-10">
          <div className="flex gap-4 items-center">
            <div>
              <h2 className="text-2xl text-end capitalize">{data?.username}</h2>
              <span className="text-sm opacity-50">{data?.email}</span>
            </div>
            <Image
              src={data.image ? data.image : "/assets/images/profile.png"}
              alt="profile image"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full"
            />
          </div>
          <button
            className="bg-[#1576ea] rounded-md text-white px-6 my-2 duration-100 active:translate-y-[3px]  border-[#0b4893] hover:border-b-[3px] active:border-b-[0px]"
            type="button"
            onClick={(e) => {
              signOut();
            }}
          >
            <h5 className="text-lg">Гарах</h5>
          </button>
        </div>
      </div>

      {/* ----------------- 2 MENU ----------------- */}
      <div className="flex h-10 justify-center gap-5 mt-3 w-full">
        <button
          className={`${!btn ? "text-white bg-[#1576ea]" : "border-[2px]"} px-10 w-1/2 duration-100 rounded-md active:translate-y-[2px]`}
          onClick={() => setBtn(false)}
        >
          Анкет
        </button>
        <button
          className={`${btn ? "text-white bg-[#1576ea]" : "border-[2px]"} px-10 w-1/2 duration-100 rounded-md active:translate-y-[2px]`}
          onClick={() => setBtn(true)}
        >
          Хэрэглэгчид
        </button>
      </div>
      <div className="flex mt-5 gap-10 justify-center">
        {/* --------- JOB sreach --------- */}
        <label className="flex flex-col gap-3 w-1.5/5">
          <span className="opacity-50">Мэргэжэл</span>
          <select
            name="select"
            className="border-[1px] w-full rounded-md p-2"
            onChange={(e) => {
              if (e.target.value === "-Бүх") {
                setFilterJob("");
              } else {
                setFilterJob(e.target.value);
              }
            }}
          >
            {jobs.map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
        {/* --------- Education Level sreach --------- */}
        <label className="flex flex-col gap-3 w-1/5">
          <span className="opacity-50">Боловсролын түвшин</span>
          <select
            name="select"
            className="border-[1px] w-full rounded-md p-2"
            onChange={(e) => {
              if (e.target.value === "-Бүх") {
                setFilterLevel("");
              } else {
                setFilterLevel(e.target.value);
              }
            }}
          >
            {["-Бүх", "Доктор", "Магистр", "Бакалавр", "Мэргэшсэн", "Тусгай дунд", "Бүрэн дунд", "Бүрэн бус дунд", "Бага"].map((el, i) => (
              <option key={i} value={el}>
                {el}
              </option>
            ))}
          </select>
        </label>
      </div>
      {!btn ? (
        // ----------------- ALL CV -----------------
        <>
          <div className="mt-20">
            {cvs.map((el: any, i: number) => (
              <Cvs key={i} {...el} />
            ))}
          </div>
        </>
      ) : (
        // ----------------- ALL USER -----------------
        <div className="w-full pt-20">
          <div className="flex justify-between ml-40 pb-5">
            <h2 className="capitalize opacity-50">имэйл</h2>
            <h2 className="capitalize opacity-50">хэрэглэгчийн нэр</h2>
            <h3 className="capitalize opacity-50 mr-40">үүрэг</h3>
          </div>
          <div className="flex flex-col">
            {users?.map((el: { email: string; username: string; role: string; image: string; _id: string }, i: number) => {
              if (data._id === el._id) {
                return;
              }
              return <Users key={i} {...el} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;

const jobs = [
  "-Бүх",
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

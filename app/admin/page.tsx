/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthType } from "@types";
import { useAuthProvider } from "@context/AuthProvider";
import { Cvs, Jobs, Users } from "@components";
import { getJobs, getUsers } from "@utils";

const page = () => {
  const [data, setData] = useState({
    users: [],
    jobs: [],
    cvitae: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState("");
  const [currentList, setCurrentList] = useState(1);

  const { userInfo, logout } = useAuthProvider() as unknown as AuthType;

  useEffect(() => {
    switch (page) {
      case "":
        console.log("all");
        (async () => {
          const getJobData = await getJobs();
          const getUserData = await getUsers();
          setData({ ...data, jobs: getJobData, users: getUserData });
        })();
        break;
      case "cvitaes":
        console.log("cvitaes");
        break;
      case "users":
        console.log("users");
        (async () => {
          const getUserData = await getUsers();
          setData({ ...data, users: getUserData });
        })();
        break;
      case "jobs":
        console.log("jobs");
        (async () => {
          const getJobData = await getJobs();
          setData({ ...data, jobs: getJobData });
        })();
        break;
    }
  }, [refresh]);

  return (
    <div className="w-full flex flex-row">
      <div className="w-[20%] min-w-[300px] bg-white h-screen flex flex-col shadow overflow-hidden fixed top-0 left-0">
        <h1 className="capitalize font-medium text-3xl px-12 py-8 mb-16">админ</h1>
        {leftList.map((el, i) => (
          <button
            key={i}
            className={`${
              currentList === i ? "from-gray-300" : "hover:border-l-[8px] border-gray-300"
            } bg-gradient-to-r flex gap-5 items-center py-3 px-10 w-full duration-300`}
            onClick={() => setCurrentList(i)}
          >
            <Image
              alt="icon"
              src={el.src}
              width={40}
              height={40}
              className={`object-contain ${i === 2 || i === 1 ? "h-[32px] w-[32px]" : "h-[40px] w-[40px]"}`}
            />
            <h2 className="text-xl">{el.title}</h2>
          </button>
        ))}

        <button
          className="flex gap-5 items-center py-3 px-10 w-full mt-32 hover:border-l-[8px] duration-300 border-gray-300"
          type="button"
          onClick={logout}
        >
          <Image alt="icon" src="/assets/icons/logout.svg" width={40} height={40} className="object-contain h-[32px] w-[32px]" />
          <h2 className="text-xl">Гарах</h2>
        </button>
      </div>

      <div className="w-[80%] flex flex-col ml-[20%]">
        <div className="flex justify-end items-center py-5 w-full pr-20 bg-white">
          <div className="flex justify-end items-center gap-10">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col justify-end">
                <span className="text-2xl text-end capitalize font-semibold">
                  {userInfo?.lastName} <span>{userInfo?.firstName}</span>
                </span>
                <span className="text-xl opacity-50 text-end">{userInfo?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="m-8 bg-white">
          {currentList === 0 && <Cvs />}
          {currentList === 1 && <Users data={data} setPage={setPage} setData={setData} setRefresh={setRefresh} />}
          {currentList === 2 && <Jobs data={data} setPage={setPage} setData={setData} setRefresh={setRefresh} />}
        </div>
      </div>
    </div>
  );
};

export default page;

const leftList = [
  { src: "/assets/icons/cvs.svg", title: "Анкет" },
  { src: "/assets/icons/users.svg", title: "Хэрэглэгчид" },
  { src: "/assets/icons/jobs.svg", title: "Ажлын Байр" },
];

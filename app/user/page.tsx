/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { Forms } from "@components";
import { useEffect, useState } from "react";
import { AuthType, GeneralFrom } from "@types";
import { formDelete, formEdit, formPut, generalFormGet } from "@utils";
import { useAuthProvider } from "@context/AuthProvider";
import { number } from "yup";
import axios from "axios";

const page = () => {
  const [isOpen, setIsOpen] = useState({
    general: false,
    connect: false,
    planWork: false,
    education: false,
  });
  const [data, setData] = useState<any>();
  const [refresh, setRefresh] = useState(false);
  const [current, setCurrent] = useState("ref");
  const [id, setId] = useState({
    baseId: "",
    listId: 0,
  });

  const { userInfo, setLoader, logout } = useAuthProvider() as unknown as AuthType;

  const generalForm = {
    userid: userInfo?.id,
    aboutMe: data ? data?.general.aboutMe : "",
    birthday: data ? data?.general.birthday : "",
    gender: data ? data?.general.gender : "",
    idNumber: data ? data?.general.idNumber : "",
    lastName: userInfo?.lastName,
    firstName: userInfo?.firstName,
  };

  const connectForm = {
    userid: userInfo?.id,
    phoneNumber: userInfo?.phoneNumber,
    email: userInfo?.email,
    location: data ? data?.connect.location : "",
  };

  const planWorkForm = {
    userid: userInfo?.id,
    salary: data ? data?.planWork.salary : "",
    job: data ? data?.planWork.job : "",
    workingType: data ? data?.planWork.workingType : "",
  };

  const educationForm = {
    userid: userInfo?.id,
    degree: data ? (id.listId === 0 ? "" : data.education[id.listId]?.degree) : "",
    country: data ? (id.listId === 0 ? "" : data.education[id.listId]?.country) : "",
    schoolName: data ? (id.listId === 0 ? "" : data.education[id.listId]?.schoolName) : "",
    occupation: data ? (id.listId === 0 ? "" : data.education[id.listId]?.occupation) : "",
    gpa: data ? (id.listId === 0 ? "" : data.education[id.listId]?.gpa) : "",
    startYear: data ? (id.listId === 0 ? "" : data.education[id.listId]?.startYear) : "",
    endYear: data ? (id.listId === 0 ? "" : data.education[id.listId]?.endYear) : "",
  };

  const handleSubmitGeneral = async (props: GeneralFrom) => {
    const res = await formPut({ form: props, type: "general" });
    setIsOpen({ ...isOpen, general: false });
    setRefresh((p) => !p);
  };

  const handleSubmitConnect = async (props: GeneralFrom) => {
    const res = await formPut({ form: props, type: "connect" });
    setIsOpen({ ...isOpen, connect: false });
    setRefresh((p) => !p);
  };

  const handleSubmitPlanWork = async (props: GeneralFrom) => {
    const res = await formPut({ form: props, type: "planWork" });
    setIsOpen({ ...isOpen, planWork: false });
    setRefresh((p) => !p);
  };

  const handleSubmitEducation = async (props: GeneralFrom) => {
    if (id.listId === 0) {
      await formPut({ form: props, type: "education" });
      setIsOpen({ ...isOpen, education: false });
      setRefresh((p) => !p);
      return;
    }
    const res = await formEdit({ data: data.education[id.listId], update: props });
    console.log(res);
    setIsOpen({ ...isOpen, education: false });
    setRefresh((p) => !p);
  };

  const deleteFrom = async (props: string) => {
    const res = await formDelete(props);
    console.log(res);
  };

  useEffect(() => {
    switch (current) {
      case "ref":
        (async () => {
          if (userInfo?.id === undefined) {
            return setRefresh((p) => !p);
          }
          const generalData = await generalFormGet(userInfo?.id);
          if (generalData === "Олдсонгүй") {
            return;
          }
          setData(generalData);
        })();
        break;
      case "logout":
        logout();
        break;
    }
  }, [refresh]);

  const sendCV = async () => {
    try {
      const res = await axios.post(`api/cv/send`, { id: userInfo?.id });
      alert(res.data);
    } catch (error: unknown | any) {
      alert(error.response.data);
    }
  };

  return (
    <>
      <div className="w-full bg-white">
        <div className="max-width py-5 flex justify-between items-center">
          <h1 className="text-3xl font-medium">Миний анкет</h1>

          <div className="flex gap-5">
            <div className="flex flex-col items-end">
              <span className="text-xl text-end capitalize font-semibold">
                {userInfo?.lastName} &nbsp;
                <span>{userInfo?.firstName}</span>
              </span>
              <span className="text-lg opacity-50">{userInfo?.email}</span>
            </div>
            <button
              className="px-6 my-2 click-btn bg-[#f4f4f4] rounded-md hover-btn"
              type="button"
              onClick={() => {
                setCurrent("logout");
                setRefresh((p) => !p);
              }}
            >
              <h5 className="text-lg">Гарах</h5>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-width relative">
        <div className="px-8 pb-6 border-l border-r">
          <h2 className="text-xl pt-7">Ерөнхий мэдээлэл</h2>
          <div className="my-2 px-4 py-3 bg-white rounded-lg relative">
            <TitleFrom title="Миний тухай" input={data ? data?.general.aboutMe : ""} />
            <div className="flex mt-5">
              <div className="w-1/2 flex flex-col gap-5">
                <TitleFrom title="Эцэг/Эхийн нэр" input={generalForm.lastName} />
                <TitleFrom title="Өөрийн нэр" input={generalForm.firstName} />
              </div>
              <div className="w-1/2 flex flex-col gap-5">
                <TitleFrom title="Регистрийн дугаар" input={data ? data?.general?.idNumber : ""} />
                <TitleFrom title="Хүйс" input={data ? data?.general.gender : ""} />
                <TitleFrom title="Төрсөн огноо" input={data ? data?.general.birthday : ""} />
              </div>
            </div>
            <button
              className="absolute top-1 right-1 rounded-full p-1 bg-gray-100 hover-btn"
              type="button"
              onClick={() => setIsOpen({ ...isOpen, general: true })}
            >
              <Image alt="icon" src="/assets/icons/edit.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
            </button>
            <Forms
              closeModal={() => {
                setIsOpen({ ...isOpen, general: !isOpen.general });
              }}
              isOpen={isOpen.general}
              handleSubmit={handleSubmitGeneral}
              from={generalForm}
              type="general"
            />
          </div>

          <h2 className="text-xl pt-7">Холбоо барих мэдээлэл</h2>
          <div className="my-2 px-4 py-3 bg-white rounded-lg relative">
            <div className="flex">
              <div className="w-1/2 flex flex-col gap-5">
                <TitleFrom title="Утасны дугаар" input={userInfo?.phoneNumber} />
                <TitleFrom title="Оршин суугаа хаяг" input={data ? data?.connect.location : ""} />
              </div>
              <div className="w-1/2 flex flex-col gap-5">
                <TitleFrom title="И-мэйл хаяг" input={userInfo?.email} />
              </div>
            </div>
            <button className="absolute top-1 right-1 rounded-full p-1 bg-gray-100 hover-btn" onClick={() => setIsOpen({ ...isOpen, connect: true })}>
              <Image alt="icon" src="/assets/icons/edit.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
            </button>
            <From
              closeModal={() => {
                setIsOpen({ ...isOpen, connect: !isOpen.connect });
              }}
              isOpen={isOpen.connect}
              handleSubmit={handleSubmitConnect}
              from={connectForm}
              type="connect"
            />
          </div>

          <h2 className="text-xl pt-7">Ажиллахаар төлөвлөж буй ажлын байр</h2>
          <div className="my-2 px-4 py-3 bg-white rounded-lg relative">
            <div className="flex">
              <div className="w-1/2 flex flex-col gap-5">
                <TitleFrom title="Цалингийн хүлээлт" input={data ? data?.planWork.salary : ""} />
                <TitleFrom title="Ажиллах төрөл" input={data ? data?.planWork.workingType : ""} />
              </div>
              <div className="w-1/2 flex flex-col gap-5">
                <TitleFrom title="Ажиллахаар төлөвлөж буй чиглэл" input={data ? data?.planWork.job : ""} />
              </div>
            </div>
            <button
              className="absolute top-1 right-1 rounded-full p-1 bg-gray-100 hover-btn"
              onClick={() => setIsOpen({ ...isOpen, planWork: true })}
            >
              <Image alt="icon" src="/assets/icons/edit.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
            </button>
            <From
              closeModal={() => {
                setIsOpen({ ...isOpen, planWork: !isOpen.planWork });
              }}
              isOpen={isOpen.planWork}
              handleSubmit={handleSubmitPlanWork}
              from={planWorkForm}
              type="planWork"
            />
          </div>

          <h2 className="text-xl pt-7">Боловсрол</h2>
          <div className="my-2 px-4 pt-4 pb-4 bg-white rounded-lg relative">
            <div className="flex-between flex-wrap gap-y-14">
              {data?.education.map((el: MapProps, i: number) => {
                if (i == 0) {
                  return;
                }
                return (
                  <div key={i} className={`group w-1/2 pl-5 py-3 flex flex-col gap-5 relative hover:bg-gray-100 rounded-md`}>
                    <span className="text-xl">
                      {el.startYear} - {el.endYear} он
                    </span>
                    <TitleFrom title="Боловсролын зэрэг" input={el.degree} />
                    <TitleFrom title="Улс" input={el.country} />
                    <TitleFrom title="Сургуулийн нэр" input={el.schoolName} />
                    <TitleFrom title="Эзэмшсэн мэргэжил" input={el.occupation} />
                    <TitleFrom title="Голч дүн (GPA)" input={el.gpa} />

                    <div className="flex flex-col gap-4 group-hover:opacity-100 opacity-0 absolute bottom-4 right-5">
                      <button
                        className="group relative bg-white hover-btn rounded-full p-1"
                        type="button"
                        onClick={() => {
                          setId({ ...id, baseId: el._id, listId: i });
                          setIsOpen({ ...isOpen, education: true });
                        }}
                      >
                        <Image alt="icon" src="/assets/icons/edit.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
                      </button>

                      <button
                        className="group relative bg-white hover-btn rounded-full p-1"
                        type="button"
                        onClick={() => {
                          setId({ ...id, baseId: el._id, listId: i });
                          deleteFrom(el._id);
                        }}
                      >
                        <Image alt="icon" src="/assets/icons/trash.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="absolute top-1 right-1 rounded-full p-1 bg-gray-100 hover-btn"
              onClick={() => {
                setIsOpen({ ...isOpen, education: true });
                setId({ ...id, listId: 0 });
              }}
            >
              <Image alt="icon" src="/assets/icons/add.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
            </button>
            <Forms
              closeModal={() => {
                setIsOpen({ ...isOpen, education: !isOpen.education });
              }}
              isOpen={isOpen.education}
              handleSubmit={handleSubmitEducation}
              from={educationForm}
              type="education"
            />
          </div>

          <div className="flex justify-end py-3 mb-5">
            <button className="click-btn py-2 px-5 text-lg rounded-md bg-[#1576ea] text-white" onClick={() => sendCV()}>
              Анкет илгээх
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const TitleFrom = ({ title, input }: { title: string; input: string | undefined }) => {
  return (
    <div className={`${title === "Миний тухай" && " pr-5"}`}>
      <h3 className="flex gap-6">{title}</h3>
      <span className={`text-gray-500 w-full`}>{input}</span>
    </div>
  );
};

export default page;

interface MapProps {
  startYear: string;
  endYear: string;
  _id: string;
  degree: string;
  occupation: string;
  schoolName: string;
  gpa: string;
  country: string;
}

"use client";

import { Edit } from "./Dialog/Edit";
import Image from "next/image";
import { useState } from "react";
import { SemiLoader } from "./Loader";
import { Field, Form, Formik } from "formik";
import { editRole, userFilter } from "@utils";
import { JobsPrps, MapUserProps } from "@types";

export const Users = ({ data, setData, setRefresh, setPage }: JobsPrps) => {
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const [editValue, setEditValue] = useState("");
  const from = { phoneNumber: "", firstName: "" };

  const handleSubmit = async (props: { firstName: string; phoneNumber: string }) => {
    setData({ ...data, users: [] });
    const result = await userFilter(props);
    if (result === "Шүүлт олдсонгүй") {
      setData({ ...data, users: [] });
      setPage((p) => (p = "users"));
      setRefresh((p) => !p);
    } else {
      setData({ ...data, users: result });
    }
  };

  const allUser = () => {
    setData({ ...data, users: [] });
    setPage((p) => (p = "users"));
    setRefresh((p) => !p);
  };

  const hadldeUpdate = async () => {
    const update = await editRole({ editValue, userId });
    if (update === true) {
      setData({ ...data, users: [] });
      setPage((p) => (p = "users"));
      setRefresh((p) => !p);
    }
    setEdit(false);
  };

  return (
    <div className="flex flex-col pt-6 px-8 pb-10">
      {/* ------ Filter form ------*/}
      <div className="w-full pl-4 relative text-sm">
        <Formik initialValues={from} onSubmit={handleSubmit}>
          <Form className="flex gap-5">
            <Field placeholder="Нэр" name="firstName" type="firstName" className={`w-[235px] rounded-md px-2 border`} />
            <Field placeholder="Утасны дугаар" name="phoneNumber" type="phoneNumber" className={`rounded-md p-2 border`} />
            <button type="submit" className="">
              <Image alt="icon" src="/assets/icons/search.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
            </button>
          </Form>
        </Formik>

        <button type="button" className="absolute right-0 top-0 bottom-0 m-auto underline" onClick={() => allUser()}>
          Бүх Хэрэглэгч
        </button>
      </div>

      <div className="w-full relative pt-6">
        <div className="flex-between text-base text-gray-500 px-5 py-2">
          <span className="w-[250px]">Нэр</span>
          <span className="w-[150px]">Утасны дугаар</span>
          <span className="w-[400px]">Имэйл</span>
          <span className="w-[150px]">Хэрэглэгч & Админ</span>
        </div>

        <div className="flex flex-col pt-6 gap-5">
          {data?.users[0] === undefined && <SemiLoader />}
          {data?.users?.map((el: MapUserProps, i: number) => (
            <div key={i} className="flex-between text-lg font-normal w-full px-5 py-2 border-b-2 rounded-md">
              <span className="w-[250px] capitalize">{el.firstName}</span>
              <span className="w-[150px]">{el.phoneNumber}</span>
              <span className="w-[400px]">{el.email}</span>
              <span className={`w-[150px] flex-between ${el.role === "admin" ? "pl-4" : ""}`}>
                {el.role === "user" ? "Хэрэглэгч" : "   Админ"}
                <button
                  className="group relative"
                  type="button"
                  onClick={() => {
                    setEdit(true);
                    setUserId((p) => (p = el._id));
                  }}
                >
                  <span className="group-hover:opacity-100 opacity-0 duration-300 absolute m-auto -left-2 -top-7 right-0">Засах</span>
                  <Image alt="icon" src="/assets/icons/edit.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
                </button>
              </span>
            </div>
          ))}
        </div>

        <Edit
          closeModal={() => setEdit(false)}
          isOpen={edit}
          hadldeUpdate={hadldeUpdate}
          data={data.users}
          jobId={userId}
          setEditValue={setEditValue}
          editValue={editValue}
          edit="role"
        />
      </div>
    </div>
  );
};

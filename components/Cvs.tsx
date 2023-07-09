"use client";

import React, { useState } from "react";
import { SemiLoader } from "./Loader";
import { Forms } from "./Dialog/Forms";
import { Field, Form, Formik } from "formik";
import Image from "next/image";

export const Cvs = ({ data, setData, setRefresh, setPage, jobs, filter, setFilter }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState([]);
  const from = { job: "", firstName: "", salary: "" };

  const handleSubmit = async (props: { job: string; firstName: string; salary: string }) => {
    if (!props.job) {
      if (!props.salary) {
        if (!props.firstName) {
          return alert("Хайх талбар хоосон байна");
        } else {
          const firstName = data.filter((el: { general: { firstName: string } }) => el.general.firstName === props.firstName);
          if (firstName[0] === undefined) {
            return alert("Хайлт олдсонгүй");
          }
          setFilter([]);
          return setFilter(firstName);
        }
      } else {
        const salary = data.filter((el: { planWork: { salary: string } }) => el.planWork.salary === props.salary);
        if (salary[0] === undefined) {
          return alert("Хайлт олдсонгүй");
        }
        if (props.firstName) {
          const firstName = salary.filter((el: { general: { firstName: string } }) => el.general.firstName === props.firstName);
          if (firstName[0] === undefined) {
            return alert("Хайлт олдсонгүй");
          }
          setFilter([]);
          return setFilter(firstName);
        }
        setFilter([]);
        return setFilter(salary);
      }
    } else {
      const job = data.filter((el: { planWork: { job: string } }) => el.planWork.job === props.job);
      if (!props.salary) {
        if (props.firstName) {
          const firstName = job.filter((el: { general: { firstName: string } }) => el.general.firstName === props.firstName);
          if (firstName[0] === undefined) {
            return alert("Хайлт олдсонгүй");
          }
          setFilter([]);
          return setFilter(firstName);
        }
      } else {
        const salary = job.filter((el: { planWork: { salary: string } }) => el.planWork.salary === props.salary);
        if (salary[0] === undefined) {
          return alert("Хайлт олдсонгүй");
        }
        if (props.firstName) {
          const firstName = salary.filter((el: { general: { firstName: string } }) => el.general.firstName === props.firstName);
          if (firstName[0] === undefined) {
            return alert("Хайлт олдсонгүй");
          }
          setFilter([]);
          return setFilter(firstName);
        }
        setFilter([]);
        return setFilter(salary);
      }
      if (job[0] === undefined) {
        return alert("Хайлт олдсонгүй");
      }
      setFilter([]);
      return setFilter(job);
    }
  };

  const allUser = () => {
    setPage((p: string) => (p = "cvitaes"));
    setData([]);
    setFilter([]);
    setRefresh((p: boolean) => !p);
  };

  return (
    <div className={`pt-6 px-8 pb-10`}>
      <div className="w-full pl-4 relative">
        <Formik initialValues={from} onSubmit={handleSubmit} onReset={allUser}>
          <Form className="flex gap-5 text-sm">
            <Field as="select" placeholder="Ажлын байр" name="job" type="job" className={`rounded-md p-2 border max-w-xs`}>
              <option value="">---</option>
              {jobs?.map((el: { jobName: string }, i: number) => (
                <option key={i} value={el.jobName}>
                  {el.jobName}
                </option>
              ))}
            </Field>
            <Field placeholder="Нэр" name="firstName" type="firstName" className={`w-[200px] rounded-md px-2 border`} />
            <Field as="select" placeholder="Цалингийн хүлээлт" name="salary" type="salary" className={`rounded-md p-2 border max-w-[180px]`}>
              <option value="">---</option>
              {salaryList?.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </Field>
            <button type="submit" className="">
              <Image alt="icon" src="/assets/icons/search.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
            </button>
            <button type="reset" className="absolute right-0 top-0 bottom-0 m-auto underline">
              Бүх Анкет
            </button>
          </Form>
        </Formik>
      </div>

      <div className="flex flex-col gap-5 pt-16">
        {filter[0] === undefined && <SemiLoader />}
        {filter?.map((el: any, i: number) => (
          <button
            key={i}
            className="w-full py-2 border-b-2 rounded-md px-5 flex-between hover-btn"
            onClick={() => {
              setIsOpen(true);
              setForm(el);
            }}
          >
            <span className="w-[350px] text-start">{el.planWork.job}</span>
            <span className="w-[150px] text-start">
              {el.general.lastName.slice("")[0]}.{el.general.firstName}
            </span>
            <span className="w-[180px] text-end">{el.planWork.salary}</span>
          </button>
        ))}
      </div>
      <Forms
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        type="detail"
        handleSubmit={(props) => {
          return;
        }}
        from={form}
      />
    </div>
  );
};

const salaryList = [
  "320,000 - 400,000",
  "400,000 - 600,000",
  "600,000 - 800,000",
  "800,000 - 1,000,000",
  "1,000,000 - 1,200,000",
  "1,200,000 - 1,500,000",
  "1,500,000 - 1,800,000",
  "1,800,000 - 2,100,000",
  "2,100,000 - 2,500,000",
  "2,500,000 - 3,000,000",
  "3,000,000 - 4,000,000",
  "4,000,000 - 5,000,000",
  "5,000,000 -ааc дээш",
];

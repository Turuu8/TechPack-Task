"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";

export const From = ({ jobs, setCancel, from, setFrom, hanleSubmit, history }: T) => {
  return (
    <div className="w-full max-w-[600px] mx-auto my-[100px] bg-white rounded-lg p-4">
      <form className="flex flex-col gap-5" onSubmit={hanleSubmit}>
        {/* -------------------- ABOUT ME -------------------- */}
        <div className="flex flex-col">
          <span>Миний тухай</span>
          <textarea
            value={from.aboutMe}
            className="border-[1px] rounded-md py-1 px-3"
            onChange={(e) => setFrom({ ...from, aboutMe: e.target.value })}
            placeholder={``}
          />
        </div>
        <div className="flex gap-10 pb-3">
          {/* -------------------- LEFT COLUMN -------------------- */}
          <div className="flex flex-col w-1/2 gap-5">
            {/* _____lastName */}
            <label className="flex flex-col">
              <span>Овог</span>
              <input
                value={from.lastName}
                required
                type="text"
                className="border-[1px] w-full rounded-md py-1 px-3"
                onChange={(e) => setFrom({ ...from, lastName: e.target.value })}
              />
            </label>
            {/* _____idNumber */}
            <label className="flex flex-col">
              <span>Регистрийн дугаар</span>
              <input
                value={from.idNumber}
                required
                placeholder="ИМ00000000"
                type="text"
                className="border-[1px] w-full rounded-md py-1 px-3"
                onChange={(e) => setFrom({ ...from, idNumber: e.target.value })}
              />
            </label>
            {/* _____phoneNumber */}
            <label className="flex flex-col">
              <span>Утасны дугаар</span>
              <input
                value={from.phoneNumber}
                required
                type="number"
                className="border-[1px] w-full rounded-md py-1 px-3"
                onChange={(e) => setFrom({ ...from, phoneNumber: e.target.value })}
              />
            </label>
            {/* _____gender */}
            <label className="flex justify-between items-center mt-2">
              <span className="opacity-50">Хүйс</span>
              <select
                name="select"
                value={from.gender}
                className="border-[1px] w-[70%] rounded-md p-2"
                onChange={(e) => setFrom({ ...from, gender: e.target.value })}
                required
              >
                <option value="DEFAULT" disabled>
                  --Сонгох
                </option>
                <option value="Эрэгтэй">Эрэгтэй</option>
                <option value="Эмэгтэй">Эмэгтэй</option>
              </select>
            </label>
          </div>
          {/* -------------------- RIGH COLUMN -------------------- */}
          <div className="flex flex-col w-1/2 gap-5">
            {/* _____firstName */}
            <label className="flex flex-col">
              <span>Нэр</span>
              <input
                value={from.firstName}
                required
                type="text"
                className="border-[1px] w-full rounded-md py-1 px-3"
                onChange={(e) => setFrom({ ...from, firstName: e.target.value })}
              />
            </label>
            {/* _____birthday */}
            <label className="flex flex-col">
              <span>Төрсөн огноо</span>
              <input
                value={from.birthday}
                required
                placeholder="2000/01/01"
                type="text"
                className="border-[1px] w-full rounded-md py-1 px-3"
                onChange={(e) => setFrom({ ...from, birthday: e.target.value })}
              />
            </label>
            {/* _____salary */}
            <label className="flex flex-col">
              <span>Сард авах цалингийн хэмжээ</span>
              <input
                value={from.salary}
                required
                type="number"
                placeholder="1,000,000"
                className="border-[1px] w-full rounded-md py-1 px-3"
                onChange={(e) => setFrom({ ...from, salary: e.target.value })}
              />
            </label>
            {/* _____maritalStatus */}
            <label className="flex justify-between items-center mt-2">
              <span className="opacity-50">Гэрлэлтийн байдал</span>
              <select
                value={from.maritalStatus}
                name="select"
                className="border-[1px] w-[70%] rounded-md p-2"
                onChange={(e) => setFrom({ ...from, maritalStatus: e.target.value })}
              >
                <option value="DEFAULT" disabled>
                  --Сонгох
                </option>
                <option value="Гэрлээгүй">Гэрлээгүй</option>
                <option value="Гэрлэсэн">Гэрлэсэн</option>
              </select>
            </label>
          </div>
        </div>
        <hr />
        {/* -------------------- EDUCATION -------------------- */}
        <div className="flex flex-col gap-5 pb-5">
          <span>БОЛОВСРОЛ</span>
          <div className="flex flex-col gap-3">
            {/* _____enrollmentYear */}
            <label className="flex justify-between">
              <span className="opacity-50">Элссэн он:</span>
              <select
                value={from.enrollmentYear}
                name="select"
                className="border-[1px] w-[20%] rounded-md p-2"
                onChange={(e) =>
                  setFrom({
                    ...from,
                    enrollmentYear: e.target.value,
                  })
                }
              >
                {enrollmentYears.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </label>
            {/* _____graduatedYear */}
            <label className="flex justify-between">
              <span className="opacity-50">Төгссөн он:</span>
              <select
                value={from.graduatedYear}
                name="select"
                className="border-[1px] w-[20%] rounded-md p-2"
                onChange={(e) =>
                  setFrom({
                    ...from,
                    graduatedYear: e.target.value,
                  })
                }
              >
                {gradutedYears.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex">
              {/* _____educationLevel */}
              <label className="flex flex-col gap-3 w-1/2">
                <span className="opacity-50">Боловсролын түвшин</span>
                <select
                  name="select"
                  value={from.level}
                  className="border-[1px] w-[70%] rounded-md p-2"
                  onChange={(e) =>
                    setFrom({
                      ...from,
                      level: e.target.value,
                    })
                  }
                >
                  {educationLevel.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </label>
              {/* _____schoolName */}
              <label className="flex flex-col gap-3  w-1/2">
                <span className="opacity-50">Сургуулийн нэр</span>
                <input
                  value={from.schoolName}
                  required
                  type="text"
                  className="border-[1px] w-full rounded-md py-1 px-3"
                  onChange={(e) =>
                    setFrom({
                      ...from,
                      schoolName: e.target.value,
                    })
                  }
                />
              </label>
            </div>
          </div>
        </div>
        <hr />
        {/* -------------------- JOBS -------------------- */}
        <div className="flex flex-col gap-5">
          <span>АЖИЛЛАХААР ТӨЛӨВЛӨЖ БУЙ АЖЛЫН БАЙР</span>
          <label className="flex flex-col gap-3 w-full">
            {/* _____jobs */}
            <select
              name="select"
              value={from.job}
              className="border-[1px] w-[70%] rounded-md p-2"
              onChange={(e) =>
                setFrom({
                  ...from,
                  job: e.target.value,
                })
              }
            >
              {jobs.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* -------------------- BUTTONS ---------------------- */}
        <button className="border-[1px] bg-[#1576ea] rounded-md w-full mt-5 text-white px-6 py-2 duration-100 active:translate-y-[3px]" type="submit">
          <h5 className="text-lg">{history ? "Шинчлэх" : "Илгээх"}</h5>
        </button>
        <div className={`justify-end ${history ? "hidden" : "flex"} `}>
          <button
            className="underline rounded-md px-6 my-2 duration-100 active:translate-y-[3px]"
            type="button"
            onClick={() => {
              setCancel(false);
            }}
          >
            <h5 className="text-lg">Буцах</h5>
          </button>
        </div>
      </form>
    </div>
  );
};

interface T {
  setCancel: Dispatch<SetStateAction<boolean>>;
  setFrom: Dispatch<SetStateAction<O>>;
  from: O;
  jobs: string[];
  history: string[] | undefined;
  hanleSubmit: (e: FormEvent) => void;
}

export interface O {
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

const gradutedYears = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];

const enrollmentYears = [
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
];

const educationLevel = ["Доктор", "Магистр", "Бакалавр", "Мэргэшсэн", "Тусгай дунд", "Бүрэн дунд", "Бүрэн бус дунд", "Бага"];

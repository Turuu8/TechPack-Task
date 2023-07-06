import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AddJob } from "./AddJob";
import { Edit } from "./Edit";
import { Delete } from "./Delete";
import axios from "axios";
import { SemiLoader } from "./Loader";

export const Jobs = ({ data }) => {
  const [addJob, setAddJob] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [newJob, setNewJob] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("api/jobs", { jobName: newJob });
      console.log(res.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get("api/jobs");
  //       console.log(typeof res.data);
  //       setData(res.data);
  //     } catch (error) {
  //       console.log(error.response);
  //       // alert(error.response.data);
  //     }
  //   })();
  // }, [newJob]);
  console.log(data);
  return (
    <div className="pt-6 px-8 pb-10">
      <div className="flex-between">
        <h1 className="font-semibold text-3xl pl-5">Ажлын Байрууд</h1>
        <button className="flex-between gap-3 px-3 py-2 bg-[#f4f4f4] rounded-md text-black hover-btn" type="button" onClick={() => setAddJob(true)}>
          <Image alt="icon" src="/assets/icons/addJob.svg" width={40} height={40} className="object-contain h-[40px] w-[40px]" />
          <h2 className="text-xl">Ажлын байр нэмэх</h2>
        </button>
        <AddJob
          closeModal={() => setAddJob(false)}
          isOpen={addJob}
          handleSubmit={handleSubmit}
          handleChange={(e) => setNewJob(e.target.value)}
          value={newJob}
        />
      </div>
      <div className="flex flex-col pt-14 gap-5">
        {data[0] === undefined && <SemiLoader />}
        {data?.map((el, i) => (
          <div key={i} className="w-full py-2 border-b-2 rounded-md px-5 flex-between">
            <h2 className="text-xl">{el.jobName}</h2>
            <div className="flex gap-10">
              <button className="group relative" type="button" onClick={() => setEdit(true)}>
                <span className="group-hover:opacity-100 opacity-0 duration-300 absolute m-auto -left-1 -top-6 right-0">Засах</span>
                <Image alt="icon" src="/assets/icons/edit.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
              </button>

              <button className="group relative" type="button" onClick={() => setRemove(true)}>
                <span className="group-hover:opacity-100 opacity-0 duration-300 absolute m-auto -left-3 -top-6 right-0">Устгах</span>
                <Image alt="icon" src="/assets/icons/trash.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Edit closeModal={() => setEdit(false)} isOpen={edit} />
      <Delete closeModal={() => setRemove(false)} isOpen={remove} />
    </div>
  );
};

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

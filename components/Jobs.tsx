import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import { AddJob } from "./AddJob";
import { Edit } from "./Edit";
import { Delete } from "./Delete";
import axios from "axios";
import { SemiLoader } from "./Loader";
import { deleleteJob } from "@utils";

interface JobsPrps {
  data: any;
  setData: Dispatch<SetStateAction<never[]>>;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const Jobs = ({ data, setData, refresh, setRefresh }: JobsPrps) => {
  const [addJob, setAddJob] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [newJob, setNewJob] = useState("");
  const [jobId, setJobId] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("api/jobs", { jobName: newJob });
      setData([]);
      setAddJob(false);
      setNewJob("");
    } catch (error: unknown | any) {
      alert(error.response.data);
    } finally {
      setRefresh(!refresh);
    }
  };

  const hadldeDelete = async () => {
    const deleted = await deleleteJob(jobId);
    if (deleted === true) {
      setData([]);
      setRefresh(!refresh);
    }
    setRemove(false);
  };

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
        {data?.toReversed().map((el: { _id: string; jobName: string }, i: number) => (
          <div key={i} className="w-full py-2 border-b-2 rounded-md px-5 flex-between">
            <h2 className="text-xl">{el.jobName}</h2>
            <div className="flex gap-10">
              <button
                className="group relative"
                type="button"
                onClick={() => {
                  setEdit(true);
                  setJobId(el._id);
                }}
              >
                <span className="group-hover:opacity-100 opacity-0 duration-300 absolute m-auto -left-1 -top-6 right-0">Засах</span>
                <Image alt="icon" src="/assets/icons/edit.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
              </button>

              <button
                className="group relative"
                type="button"
                onClick={() => {
                  setRemove(true);
                  setJobId(el._id);
                }}
              >
                <span className="group-hover:opacity-100 opacity-0 duration-300 absolute m-auto -left-3 -top-6 right-0">Устгах</span>
                <Image alt="icon" src="/assets/icons/trash.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Edit closeModal={() => setEdit(false)} isOpen={edit} />
      <Delete closeModal={() => setRemove(false)} isOpen={remove} hadldeDelete={hadldeDelete} />
    </div>
  );
};

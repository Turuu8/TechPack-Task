import axios from "axios";
import Image from "next/image";
import { Edit } from "./Edit";
import { AddJob } from "./AddJob";
import { Delete } from "./Delete";
import { JobsPrps } from "@types";
import { SemiLoader } from "./Loader";
import { FormEvent, useState } from "react";
import { deleleteJob, editJob } from "@utils";

export const Jobs = ({ data, setData, setRefresh, setPage }: JobsPrps) => {
  const [addJob, setAddJob] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [newJob, setNewJob] = useState("");
  const [jobId, setJobId] = useState("");
  const [editValue, setEditValue] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("api/jobs", { jobName: newJob });
      setAddJob(false);
      setData({ ...data, jobs: [] });
      setNewJob("");
    } catch (error: unknown | any) {
      alert(error.response.data);
    } finally {
      setPage((p) => (p = "jobs"));
      setRefresh((p) => !p);
    }
  };

  const hadldeUpdate = async () => {
    const update = await editJob({ editValue, jobId });
    if (update === true) {
      setData({ ...data, jobs: [] });
      setPage((p) => (p = "jobs"));
      setRefresh((p) => !p);
    }
    setEdit(false);
  };

  const hadldeDelete = async () => {
    const deleted = await deleleteJob(jobId);
    if (deleted === true) {
      setData({ ...data, jobs: [] });
      setPage((p) => (p = "jobs"));
      setRefresh((p) => !p);
    }
    setRemove(false);
  };
  return (
    <div className="pt-6 px-8 pb-10">
      <div className="flex-between">
        <h1 className="font-semibold text-3xl pl-5">Ажлын Байрууд</h1>
        <button className="flex-between gap-3 px-3 py-2 bg-[#f4f4f4] rounded-md text-black hover-btn" type="button" onClick={() => setAddJob(true)}>
          <Image alt="icon" src="/assets/icons/addJob.svg" width={30} height={30} className="object-contain h-[30px] w-[30px]" />
          <h2 className="text-base">Ажлын байр нэмэх</h2>
        </button>
        <AddJob
          closeModal={() => setAddJob(false)}
          isOpen={addJob}
          handleSubmit={handleSubmit}
          handleChange={(e) => setNewJob(e.target.value)}
          value={newJob}
        />
      </div>
      <div className="flex flex-col pt-16 gap-5">
        {data.jobs[0] === undefined && <SemiLoader />}
        {data?.jobs.toReversed().map((el: { _id: string; jobName: string }, i: number) => (
          <div key={i} className="w-full py-2 border-b-2 rounded-md px-5 flex-between">
            <h2 className="text-xl">{el.jobName}</h2>
            <div className="flex gap-10">
              <button
                className="group relative"
                type="button"
                onClick={() => {
                  setEdit(true);
                  setJobId((p) => (p = el._id));
                }}
              >
                <span className="group-hover:opacity-100 opacity-0 duration-300 absolute m-auto -left-1 -top-6 right-0">Засах</span>
                <Image alt="icon" src="/assets/icons/edit.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
              </button>

              <button
                className="group relative"
                type="button"
                onClick={() => {
                  setRemove(true);
                  setJobId((p) => (p = el._id));
                }}
              >
                <span className="group-hover:opacity-100 opacity-0 duration-300 absolute m-auto -left-3 -top-6 right-0">Устгах</span>
                <Image alt="icon" src="/assets/icons/trash.svg" width={25} height={25} className="object-contain h-[25px] w-[25px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Edit
        closeModal={() => setEdit(false)}
        isOpen={edit}
        hadldeUpdate={hadldeUpdate}
        data={data.jobs}
        jobId={jobId}
        setEditValue={setEditValue}
        editValue={editValue}
        edit="editor"
      />
      <Delete closeModal={() => setRemove(false)} isOpen={remove} hadldeDelete={hadldeDelete} />
    </div>
  );
};

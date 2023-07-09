import { GeneralFrom } from "@types";
import axios from "axios";

export const getUsers = async () => {
  try {
    const res = await axios.get("api/users");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getJobs = async () => {
  try {
    const res = await axios.get("api/jobs");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSendCVs = async () => {
  try {
    const res = await axios.get("api/cv/send");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleleteJob = async (props: string) => {
  try {
    const res = await axios.delete(`api/jobs/${props}`);
    return res.data;
  } catch (error: unknown | any) {
    alert(error.response.data);
  }
};
export const deleleteUser = async (props: string) => {
  try {
    const res = await axios.delete(`api/users/${props}`);
    return res.data;
  } catch (error: unknown | any) {
    alert(error.response.data);
  }
};

export const editJob = async ({ jobId, editValue }: { jobId: string; editValue: string }) => {
  try {
    const res = await axios.patch(`api/jobs/${jobId}`, { jobName: editValue });
    return res.data;
  } catch (error: unknown | any) {
    alert(error.response.data);
  }
};

export const editRole = async ({ userId, editValue }: { userId: string; editValue: string }) => {
  try {
    const res = await axios.patch(`api/users/${userId}`, { role: editValue });
    return res.data;
  } catch (error: unknown | any) {
    alert(error.response.data);
  }
};

export const userFilter = async (props: { firstName: string; phoneNumber: string }) => {
  try {
    const res = await axios.post(`api/users/filter`, props);
    return res.data;
  } catch (error: unknown | any) {
    alert(error.response.data);
    return error.response.data;
  }
};

export const generalFormGet = async (props: string) => {
  try {
    const res = await axios.get(`api/cv/new`, {
      params: {
        id: props,
      },
    });
    return res.data;
  } catch (error: unknown | any) {
    return error.response.data;
  }
};

interface PutProps {
  type: string;
  form: GeneralFrom;
}

export const formPut = async (props: PutProps) => {
  try {
    const res = await axios.put(`api/cv/new`, props);
    return res.data;
  } catch (error: unknown | any) {
    return error.response.data;
  }
};

export const formEdit = async (props: any) => {
  try {
    const res = await axios.patch(`api/cv/new`, { form: props });
    return res.data;
  } catch (error: unknown | any) {
    return error.response.data;
  }
};

export const formDelete = async (props: string) => {
  try {
    const res = await axios.delete(`api/cv/${props}`);
    return res.data;
  } catch (error: unknown | any) {
    return error.response.data;
  }
};

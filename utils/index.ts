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

export const deleleteJob = async (props: string) => {
  try {
    const res = await axios.delete(`api/jobs/${props}`);
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
  }
};

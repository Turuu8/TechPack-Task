import Job from "@models/job";
import { connectDB } from "@utils/database";

export const POST = async (request: Request) => {
  const { jobName } = await request.json();
  try {
    await connectDB();

    const existingJob = await Job.findOne({ jobName: jobName });
    if (existingJob) {
      return new Response(`${existingJob.jobName} ажилын байр бүртгэгдсэн байна`, { status: 400 });
    }
    const result = await Job.create({
      jobName: jobName,
    });

    return new Response("Ажлын байр амжилтай үүслээ", { status: 201 });
  } catch (error: unknown | any) {
    return new Response("Алдаа гарлаа дахин оролдон уу", { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectDB();

    const jobs = await Job.find();
    return new Response(JSON.stringify(jobs), { status: 201 });
  } catch (error: unknown | any) {
    return new Response(error, { status: 500 });
  }
};

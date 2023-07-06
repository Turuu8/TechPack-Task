import Job from "@models/job";
import { connectDB } from "@utils/database";
import { ObjectId } from "mongodb";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const deleted = await Job.deleteOne({ _id: new ObjectId(params.id) });
    return new Response(JSON.stringify(deleted.acknowledged), { status: 201 });
  } catch (error: unknown | any) {
    return new Response(error, { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { jobName } = await req.json();
  try {
    await connectDB();

    const existJob = await Job.find({ _id: params.id });
    existJob[0].jobName = jobName;

    await existJob[0].save();
    return new Response(JSON.stringify(true), { status: 201 });
  } catch (error: unknown | any) {
    return new Response(error, { status: 500 });
  }
};

import CV from "@models/cv";
import type { NextApiRequest } from "next"
import { connectDB } from "@utils/database";

export const POST = async (req : NextApiRequest) => {
  const from = await req.json();
  try {
    await connectDB();

    const newCV = await new CV(from);
    await newCV.save();

    return new Response("Success to create a new cv", { status: 200 });
  } catch (error) {
    return new Response("Failed to create a new cv", { status: 500 });
  }
};

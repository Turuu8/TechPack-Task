import CV from "@models/cv";
import { connectDB } from "@utils/database";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const userCV = await CV.find();

    return new Response(JSON.stringify(userCV), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", { status: 500 });
  }
};

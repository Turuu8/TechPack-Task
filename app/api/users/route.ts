import User from "@models/user";
import { connectDB } from "@utils/database";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Алдаа гарлаа дахин оролдон уу", { status: 500 });
  }
};

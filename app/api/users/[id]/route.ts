import User from "@models/user";
import { connectDB } from "@utils/database";

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { role } = await req.json();
  try {
    await connectDB();

    const user = await User.find({ _id: params.id });

    user[0].role = role;
    await user[0].save();

    return new Response(JSON.stringify(true), { status: 201 });
  } catch (error: unknown | any) {
    return new Response(error, { status: 500 });
  }
};

import CV from "@models/cv";
import User from "@models/user";
import Send from "@models/send";
import { ObjectId } from "mongodb";
import { connectDB } from "@utils/database";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    await Send.deleteOne({ userid: new ObjectId(params.id) });
    await CV.deleteOne({ userid: new ObjectId(params.id) });
    const deletedUser = await User.deleteOne({ _id: new ObjectId(params.id) });

    return new Response(JSON.stringify(deletedUser.acknowledged), { status: 201 });
  } catch (error: unknown | any) {
    return new Response(error, { status: 500 });
  }
};

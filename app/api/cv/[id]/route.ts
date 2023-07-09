import CV from "@models/cv";
import { connectDB } from "@utils/database";
import { ObjectId } from "mongodb";

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const remove = await CV.deleteMany({ education: { $elenMatch: { _id: new ObjectId(params.id) } } });

    return new Response("delete", { status: 200 });
  } catch (error) {
    return new Response("Олдсонгүй", { status: 500 });
  }
};

import CV from "@models/cv";
import { connectDB } from "@utils/database";

export const POST = async (req: Request) => {
  const { userid } = await req.json();
  try {
    await connectDB();

    const exist = await CV.findOne({ userid: userid });

    return new Response(JSON.stringify(exist), { status: 201 });
  } catch (error) {
    return new Response("Хүсэл амжилтгүй", { status: 500 });
  }
};

import CV from "@models/cv";
import Send from "@models/send";
import { connectDB } from "@utils/database";
import { ObjectId } from "mongodb";

export const POST = async (request: Request) => {
  const { id } = await request.json();
  try {
    await connectDB();

    const exist = await Send.findOne({ userid: id });
    if (exist) {
      return new Response("Илгээлдсэн байна", { status: 500 });
    }

    await Send.create({
      userid: new ObjectId(id),
    });

    return new Response("Илгээлдлээ", { status: 201 });
  } catch (error) {
    return new Response("Хүсэл амжилтгүй", { status: 500 });
  }
};

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const inbox = await Send.find({});

    const j = inbox.map(async (el) => {
      const res = await CV.findOne({ userid: el.userid });
      return res.userid.valueOf();
    });
    // // if (exist) {
    // //   return new Response("Илгээлдсэн байна", { status: 500 });
    // // }

    // await Send.create({
    //   userid: new ObjectId(id),
    // });

    return new Response(JSON.stringify(inbox), { status: 201 });
  } catch (error) {
    return new Response("Хүсэл амжилтгүй", { status: 500 });
  }
};

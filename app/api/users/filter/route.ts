import User from "@models/user";
import { connectDB } from "@utils/database";

export const POST = async (request: Request) => {
  const { phoneNumber, firstName } = await request.json();
  try {
    await connectDB();

    if (firstName) {
      if (phoneNumber) {
        const findUsers = await User.findOne({ firstName: firstName, phoneNumber: phoneNumber });

        if (findUsers) {
          return new Response(JSON.stringify([findUsers]), { status: 201 });
        }

        return new Response("Шүүлт олдсонгүй", { status: 500 });
      }

      const findUsers = await User.find({ firstName: firstName });

      if (findUsers[0] === undefined) {
        const findUsers = await User.findOne({ firstName: firstName });

        if (findUsers) {
          return new Response(JSON.stringify([findUsers]), { status: 201 });
        }
        return new Response("Шүүлт олдсонгүй", { status: 500 });
      }

      if (findUsers) {
        return new Response(JSON.stringify(findUsers), { status: 201 });
      }
      return new Response("Шүүлт олдсонгүй", { status: 500 });
    } else {
      if (phoneNumber) {
        const findUsers = await User.findOne({ phoneNumber: phoneNumber });

        if (findUsers) {
          return new Response(JSON.stringify([findUsers]), { status: 201 });
        }

        return new Response("Шүүлт олдсонгүй", { status: 500 });
      }
    }
  } catch (error) {
    return new Response("Шүүлт амжилтгүй", { status: 500 });
  }
};

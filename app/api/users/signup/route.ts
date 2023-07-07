import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@models/user";
import { connectDB } from "@utils/database";
import CV from "@models/cv";

export const POST = async (request: Request) => {
  const { email, password, phoneNumber, firstName, lastName } = await request.json();
  try {
    await connectDB();

    const existingUserMail = await User.findOne({ email: email });
    const existingUserNumber = await User.findOne({ phoneNumber: phoneNumber });

    if (existingUserMail) {
      return new Response(`${existingUserMail.email} хаягтай хэрэглэгч бүртгэгдсэн байна`, { status: 400 });
    }

    if (existingUserNumber) {
      return new Response(`${existingUserNumber.phoneNumber} дугаартай хэрэглэгч бүртгэгдсэн байна`, { status: 400 });
    }

    const hashPass = bcrypt.hashSync(password, 10);
    const result = await User.create({
      email: email,
      phoneNumber: phoneNumber,
      role: "user",
      password: hashPass,
      firstName: firstName,
      lastName: lastName,
    });

    await CV.create({
      userid: result._id,
      general: {
        aboutMe: "",
        lastName: "",
        firstName: "",
        idNumber: "",
        birthday: "",
        gender: "",
      },
      connect: {
        phoneNumber: "",
        email: "",
        location: "",
      },
      planWork: {
        salary: "",
        workingType: "",
        job: "",
      },
      education: [
        {
          degree: "",
          country: "",
          schoolName: "",
          occupation: "",
          gpa: "",
          startYear: "",
          endYear: "",
        },
      ],
    });

    const variant = {
      id: result._id,
      email: result.email,
      phoneNumber: result.phoneNumber,
      role: result.role,
      password: result.password,
      firstName: result.firstName,
      lastName: result.lastName,
    };
    const token = jwt.sign(variant, "task");

    const data = JSON.stringify({ user: result, token });
    return new Response(data, { status: 201 });
  } catch (error) {
    return new Response("Хэрэглэгчийг үүсгэж чадсангүй", { status: 500 });
  }
};

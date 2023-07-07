import CV from "@models/cv";
import { connectDB } from "@utils/database";
import { ObjectId } from "mongodb";

export const PUT = async (req: any, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const userCV = await CV.find({ userId: params.id });

    return new Response(JSON.stringify(userCV), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch cv created by user", { status: 500 });
  }
};

export const PATCH = async (req: any, { params }: { params: { id: string } }) => {
  const from = await req.json();
  try {
    await connectDB();

    const userCV = await CV.findOne({ userId: params.id });

    userCV.aboutMe = from.aboutMe;
    userCV.lastName = from.lastName;
    userCV.firstName = from.firstName;
    userCV.idNumber = from.idNumber;
    userCV.phoneNumber = from.phoneNumber;
    userCV.birthday = from.birthday;
    userCV.salary = from.salary;
    userCV.gender = from.gender;
    userCV.maritalStatus = from.maritalStatus;
    userCV.enrollmentYear = from.enrollmentYear;
    userCV.graduatedYear = from.graduatedYear;
    userCV.level = from.level;
    userCV.schoolName = from.schoolName;
    userCV.job = from.job;

    await userCV.save();
    return new Response("Success update cv", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch cv created by user", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const remove = await CV.deleteMany({ education: { $elenMatch: { _id: new ObjectId(params.id) } } });

    return new Response("delete", { status: 200 });
  } catch (error) {
    return new Response("Олдсонгүй", { status: 500 });
  }
};

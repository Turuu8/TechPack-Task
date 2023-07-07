import User from "@models/user";
import jwt from "jsonwebtoken";
import { connectDB } from "@utils/database";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  const { email, password } = await request.json();
  try {
    await connectDB();

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return new Response("Хэрэглэгч олдсонгүй", { status: 404 });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return new Response("Нууц үг буруу байна", { status: 400 });
    }

    const variant = {
      id: existingUser._id,
      email: existingUser.email,
      phoneNumber: existingUser.phoneNumber,
      role: existingUser.role,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
    };
    const token = jwt.sign(variant, "task");

    const data = JSON.stringify({ user: existingUser, token });
    return new Response(data, { status: 201 });
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }
};

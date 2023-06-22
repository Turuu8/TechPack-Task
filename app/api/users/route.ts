import User from "@models/user";
import { connectDB } from "@utils/database";
import type { NextApiRequest , NextApiResponse} from 'next';

export const GET = async (request: NextApiRequest) => {
   try {
       await connectDB()

       const users = await User.find({})
       return new Response(JSON.stringify(users), { status: 200 })
   } catch (error) {
       return new Response("Failed to fetch users", { status: 500 })
   }
} 

export const POST = async (req:NextApiRequest, res: NextApiResponse) => {
     const { email , role} = await req.json();
     try {
         await connectDB();

        const userExists = await User.findOne({ email: email });
        console.log(userExists)


        if (!userExists) {
            const newUser = await User.create({
              email: email,
              username: email,
              role: role,
              image: "",
            });
            return new Response(JSON.stringify(newUser), { status: 200 });
          }
          else{
            return new Response(JSON.stringify(userExists), { status: 200 });
          }
     } catch (error) {
         return new Response("Error", { status: 500 });
     }
 };
 



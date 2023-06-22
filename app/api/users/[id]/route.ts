import User from "@models/user";
import { connectDB } from "@utils/database";
import type { NextApiRequest } from 'next';


export const PUT = async (req:NextApiRequest, { params } : {params: {id: string}}) => {
     const { role } = await req.json();
   
     try {
          await connectDB();
          // Find the existing prompt by ID
          const existingUser = await User.findById(params.id);
          
          existingUser.role = role;
          await existingUser.save();
          
       return new Response("Successfully updated the User role", { status: 200 });
     } catch (error) {
       return new Response("Error Updating User role", { status: 500 });
     }
   };
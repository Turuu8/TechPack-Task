import CV from "@models/cv";
import type { NextApiRequest } from "next"
import { connectDB } from "@utils/database"

export const GET = async (req: NextApiRequest) => {
     try {
         await connectDB()
         
         const userCV = await CV.find()
         
         return new Response(JSON.stringify(userCV),{ status: 200 })
     } catch (error) {
         return new Response("Failed to fetch prompts created by user", { status: 500 })
     }
 } 

import User from "@models/user";
import type { NextApiRequest } from 'next';
import { connectDB } from "@utils/database";

export const GET = async (req: NextApiRequest, { params }: {params: {id: string}}) => {
    try {
        await connectDB()
        const user = await User.find({ _id: params.id })

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 })
    }
} 
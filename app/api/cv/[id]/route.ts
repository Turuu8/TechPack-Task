import CV from "@models/cv";
import { connectDB } from "@utils/database";
import type { NextApiRequest } from 'next';

export const PUT = async (req: NextApiRequest, { params }: {params: {id : string}}) => {
    try {
        await connectDB()
        
        const userCV = await CV.find({ userId: params.id })
       
        
        return new Response(JSON.stringify(userCV),{ status: 200 })

    } catch (error) {
        return new Response("Failed to fetch cv created by user", { status: 500 })
    }
} 

export const PATCH = async (req: NextApiRequest, { params }: {params: {id : string}}) => {
    const from  = await req.json();
    try {
        await connectDB()
        
        const userCV = await CV.find({ userId: params.id })

        userCV[0].aboutMe = from.aboutMe
        userCV[0].lastName = from.lastName
        userCV[0].firstName = from.firstName
        userCV[0].idNumber = from.idNumber
        userCV[0].phoneNumber = from.phoneNumber
        userCV[0].birthday = from.birthday
        userCV[0].salary = from.salary
        userCV[0].gender = from.gender
        userCV[0].maritalStatus = from.maritalStatus
        userCV[0].enrollmentYear = from.enrollmentYear
        userCV[0].graduatedYear = from.graduatedYear
        userCV[0].level = from.level
        userCV[0].schoolName = from.schoolName
        userCV[0].job = from.job

        await userCV[0].save();
        return new Response("Success update cv",{ status: 200 })

    } catch (error) {
        return new Response("Failed to fetch cv created by user", { status: 500 })
    }
} 

import dbConnect from "@/config/db"
import UserModel from "@/models/userModel"
import { z } from 'zod'

import { usernameValidation } from '@/schemas/auth/signUpSchema'
import { NextApiRequest } from "next"
import { NextRequest } from "next/server"
const UsernameQuerySchema = z.object({
    username: usernameValidation
})
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        const searchParams = request.nextUrl.searchParams;
        const queryParams = {
            username: searchParams.get('username'),
        }
        // validate with zod 
        const result = UsernameQuerySchema.safeParse(queryParams);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0
                    ? usernameErrors.join(', ')
                    : 'Invalid query parameters'
            }, { status: 400 })
        }
        const { username } = result.data;
        const exisitingUser = await UserModel.findOne({
            username, isVerified: true
        })
        if (exisitingUser)
            return Response.json(
                { success: false, message: "User already exists with username: " + username },
                { status: 400 }
            )
        return Response.json(
            { success: true, message: "Username is Valid" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking username", error)
        return Response.json({
            success: false,
            message: "Error checking username"
        }, { status: 500 })
    }
}

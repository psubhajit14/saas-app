import dbConnect from "@/config/db"
import UserModel from "@/models/userModel"
import { z } from 'zod'

import { usernameValidation } from '@/schemas/auth/signUpSchema'
const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
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

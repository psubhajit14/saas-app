import dbConnect from "@/config/db";
import UserModel from "@/models/userModel";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { username, token, password } = await request.json();
        const user = await UserModel.findOne({ username, isVerified: true });
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 500 })
        }
        const isCodeValid = user.forgotPasswordToken == token;
        const isCodeNotExpired = new Date(user.forgotPasswordTokenExpiry) > new Date();
        if (isCodeNotExpired && isCodeValid) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.updateOne(
                { username, isVerified: true },
                {
                    $set: {
                        password: hashedPassword,
                        forgotPasswordTokenExpiry: new Date()
                    }
                }
            )
            return Response.json({
                success: true,
                message: "Password reset Successfully"
            }, { status: 200 })
        }
        if (!isCodeValid) {
            return Response.json({
                success: false,
                message: "Incorrect verification Code"
            }, { status: 500 })
        }
        if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code is expired, please click on resend to generate new Verification Email."
            }, { status: 500 })
        }
    } catch (error) {
        console.error("Error checking username", error)
        return Response.json({
            success: false,
            message: "Error checking username"
        }, { status: 500 })
    }
}

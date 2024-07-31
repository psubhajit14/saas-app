import dbConnect from "@/config/db";
import UserModel from "@/models/userModel";
import bcrypt from 'bcrypt'
import { sendForgetPasswordEmail } from "@/lib/sendForgetPasswordEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { identifier } = await request.json();
        const existingVerifiedUser = await UserModel.findOne({
            $or: [
                { username: identifier }, { email: identifier }
            ], isVerified: true
        })
        if (!existingVerifiedUser) {
            return Response.json(
                { success: false, message: "User not verified with Email-Id" },
                { status: 400 }
            )
        }
        const verifyCode = await bcrypt.hash(process.env.FORGET_PASSWORD_SECRET as string, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        await UserModel.updateOne({ email: existingVerifiedUser.email }, {
            $set: {
                forgotPasswordToken: verifyCode,
                forgotPasswordTokenExpiry: expiryDate
            }
        })

        // const emailResponse = await sendForgetPasswordEmail(existingVerifiedUser.email, existingVerifiedUser.username, verifyCode);
        // if (!emailResponse.success) {
        //     return Response.json({
        //         success: false,
        //         message: emailResponse.message
        //     }, { status: 500 });
        // }
        return Response.json({
            success: true,
            message: "Email sent successfully. Please change your password by clicking on the link mentioned on the email."
        }, { status: 200 });
    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            { success: false, message: "Error registering user" },
            { status: 500 }
        )
    }
} 
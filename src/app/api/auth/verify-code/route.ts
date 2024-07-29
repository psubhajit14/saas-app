import dbConnect from "@/config/db";
import UserModel, { User } from "@/models/userModel";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername })
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 500 })
        }
        const isCodeValid = user.verifyToken == code;
        const isCodeNotExpired = new Date(user.verifyTokenExpiry) > new Date();
        if (isCodeNotExpired && isCodeValid) {
            user.isVerified = true;
            await user.save();
            return Response.json({
                success: true,
                message: "User verified successfully"
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
import dbConnect from "@/config/db";
import UserModel from "@/models/userModel";
import bcrypt from 'bcrypt'
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { verify } from "crypto";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        })
        if (existingVerifiedUser) {
            return Response.json(
                { success: false, message: "Username already exist" },
                { status: 400 }
            )
        }
        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    { success: false, message: "Email already exist" },
                    { status: 400 }
                )
            } else {
                UserModel.updateOne({ email, isVerified: false }, {
                    $set: {
                        password: hashedPassword,
                        verifyToken: verifyCode,
                        verifyTokenExpiry: expiryDate
                    }
                })
            }
        } else {
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyToken: verifyCode,
                verifyTokenExpiry: expiryDate,
            })
            await newUser.save();
        }
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        }
        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your E-Mail address"
        }, { status: 200 });
    } catch (error) {
        console.error("Error registering user", error);
        return Response.json(
            { success: false, message: "Error registering user" },
            { status: 500 }
        )
    }
} 
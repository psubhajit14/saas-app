import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
    GUEST = "guest",
    TEACHER = "teacher",
    ENTHUSIAST = "enthusiast",
    TOPPER = "topper",
}
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    isVerified?: boolean;
    signInMethod: string;
    isAdmin: boolean;
    role: UserRole;
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date;
    verifyToken: String;
    verifyTokenExpiry: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i, "Please use a valid email"]
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    signInMethod: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: UserRole,
        default: UserRole.GUEST
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const UserModel = (mongoose.models.users as mongoose.Model<User>) || mongoose.model<User>("users", userSchema);

export default UserModel;
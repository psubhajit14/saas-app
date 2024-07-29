import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be no more than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain any speical characters except '_'");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Please enter at least 8 characters" })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must be at least 8 characters, should contain at least 1 uppercase, lowercase and special charcters"),
})
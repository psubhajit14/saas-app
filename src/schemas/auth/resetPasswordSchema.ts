import { z } from "zod";

export const resetPasswordSchema = z.object({
    password: z.string().min(8, { message: "Please enter at least 8 characters" })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must be at least 8 characters, should contain at least 1 uppercase, lowercase and special charcters"),
    confirmPassword: z.string(),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
)
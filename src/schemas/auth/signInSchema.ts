import { z } from "zod";
import { usernameValidation } from "./signUpSchema";

export const signInSchema = z.object({
    identifier: z.string().email({ message: "Please enter a valid email address" }).or(usernameValidation),
    password: z.string(),
})
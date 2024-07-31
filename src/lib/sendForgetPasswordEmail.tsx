import { resend } from "@/config/email";
import ForgetPasswordEmailTemplate from "@/emails/ForgetPasswordEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendForgetPasswordEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Exam Meter | Reset Password',
            react: <ForgetPasswordEmailTemplate username={username} token={verifyCode} />
        })
        return {
            success: true, message: `Reset Password email sent successfully`
        }
    } catch (emailError) {
        console.error("Error sending Reset email", emailError);
        return { success: false, message: "Failed to send Reset email" };
    }
}
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/use-toast"
import { verifySchema } from "@/schemas/auth/verifySchema"
import { useRouter, useSearchParams } from 'next/navigation'
const Verify = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const username = searchParams.get("username")
    if (username == null) {
        toast(({
            title: 'No user found',
            description: "No user found in the URL / URL invalid"
        }))
        router.replace("/sign-up")
    }
    else {
        const form = useForm<z.infer<typeof verifySchema>>({
            resolver: zodResolver(verifySchema),
            defaultValues: {
                code: "",
            },
        })

        async function onSubmit({ code }: z.infer<typeof verifySchema>) {
            const { success, message } =
                await (
                    await fetch(
                        '/api/auth/verify-code/',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                username,
                                code,
                            }),
                        }
                    )
                ).json();

            if (!success) {
                toast(({
                    title: 'Verification Failed',
                    description: message,
                    variant: "destructive"
                }))
            } else {
                toast(({
                    title: 'You have been verified successfully',
                    description: message,
                }))
                router.replace('/');
            }
        }

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>
                                    Please enter the one-time password sent to you via Email.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        )
    }

}

export default Verify;

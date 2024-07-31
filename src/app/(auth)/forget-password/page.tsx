"use client"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { forgotPasswordSchema } from '@/schemas/auth/forgotPasswordSchema'
import formatTime from '@/lib/formatTime'
const SignIn = () => {
    const { toast } = useToast()
    const [sendText, setSendText] = useState<string>("Send Email")
    const [waitTime, setWaitTime] = useState(0);
    const forgetPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
        mode: 'onChange',
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            // default values
            identifier: '',
        },
    })

    useEffect(() => {
        if (waitTime > 0) {
            setSendText("Please wait...")
            setWaitTime(waitTime - 1)
        } else {
            setSendText("Send Email")
        }
    }, [waitTime])
    const { handleSubmit, formState } = forgetPasswordForm;
    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        console.log(values)
        const { success, message } =
            await (
                await fetch(
                    '/api/auth/forget-password/',
                    {
                        method: 'POST',
                        body: JSON.stringify(values),
                    }
                )
            ).json();
        if (!success) {
            toast(({
                title: 'Failed to send Email',
                description: message,
                variant: "destructive"
            }))
        } else {
            toast(({
                title: 'Email Sent Successfully',
                description: message,
            }))
            setWaitTime(180 * 1000);
        }
    }

    return (
        <>

            <header className='text-center text-xl'>ExamMeter.in</header>
            <Form {...forgetPasswordForm}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={forgetPasswordForm.control}
                        name="identifier"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Username / Email-Id</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='space-x-2'>
                        <Button type='submit' disabled={!formState.isValid || formState.isSubmitting || waitTime > 0} onSubmit={handleSubmit(onSubmit)} >{sendText}</Button>
                        {(waitTime > 0) && <span className='text-xs text-muted-foreground'>{formatTime(waitTime)}</span>}
                    </div>
                </form>
            </Form>
            <div className='block md:flex md:justify-between'>
                <div className='space-x-2'>
                    <span className='text-sm text-muted-foreground'>Already having a Account ?</span>
                    <Link href="/sign-in" className='text-sm underline'>Sign in</Link>
                </div>
                <div className='space-x-2'>
                    <span className='text-sm text-muted-foreground'>Not having a Account ?</span>
                    <Link href="/sign-up" className='text-sm underline'>Sign Up</Link>
                </div>
            </div>
        </>
    )
}

export default SignIn
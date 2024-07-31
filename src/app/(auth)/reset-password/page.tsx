"use client"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import _ from 'lodash'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { resetPasswordSchema } from '@/schemas/auth/resetPasswordSchema'
import { useSearchParams } from 'next/navigation'
const SignIn = () => {
    const { toast } = useToast()
    const router = useRouter();
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const username = searchParams.get('username')
    const resetPasswordform = useForm<z.infer<typeof resetPasswordSchema>>({
        mode: 'onChange',
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })
    const { handleSubmit, formState } = resetPasswordform;
    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        console.log({ password: values.password, username, token })
        const { success, message } =
            await (
                await fetch(
                    '/api/auth/reset-password/',
                    {
                        method: 'POST',
                        body: JSON.stringify({ password: values.password, username, token }),
                    }
                )
            ).json();
        if (!success) {
            toast(({
                title: 'Failed to Reset Password',
                description: message,
                variant: "destructive"
            }))
        } else {
            toast(({
                title: 'Password Changed Successfully',
                description: message,
            }))
            router.replace('/sign-in')
        }
    }
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <>

            <header className='text-center text-xl'>Reset Password</header>
            <Form {...resetPasswordform}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={resetPasswordform.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Password</FormLabel>
                                <FormControl>
                                    <Input type={showPassword ? 'text' : "password"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={resetPasswordform.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type={showPassword ? 'text' : "password"} {...field} />
                                </FormControl>
                                <FormMessage />
                                <div className='flex space-x-2 items-center'>
                                    <Checkbox onClick={() => { setShowPassword(!showPassword) }} /><label className='text-[.8rem]'>Show Password</label>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={!formState.isValid || formState.isSubmitting} onSubmit={handleSubmit(onSubmit)} >Reset Password</Button>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground text-sm">
                        Or
                    </span>
                </div>
            </div>
            <Button onClick={() => signIn('google')} className='flex space-x-4'><span>Sign in with Google</span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
            </Button>
            <div className='block md:flex md:justify-between'>
                <div className='space-x-2'>
                    <span className='text-sm text-muted-foreground'>Not able to Login ?</span>
                    <Link href="/forget-password" className='text-sm underline'>Forgot Password</Link>
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
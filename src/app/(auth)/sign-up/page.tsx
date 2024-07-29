"use client"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form'
import React, { useCallback, useMemo, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { signUpSchema } from '@/schemas/auth/signUpSchema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import _ from 'lodash'
import { Checkbox } from '@/components/ui/checkbox'
import { redirect, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
const SignUp = () => {
    const { toast } = useToast()
    const router = useRouter()
    const signUpform = useForm<z.infer<typeof signUpSchema>>({
        mode: 'onChange',
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            // default values
            username: '',
            email: '',
            password: ''
        },
    })
    const { handleSubmit, setError, setValue, formState } = signUpform;
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        console.log(values)
        const { success, message } =
            await (
                await fetch(
                    '/api/auth/sign-up/',
                    {
                        method: 'POST',
                        body: JSON.stringify(values),
                    }
                )
            ).json();
        if (!success) {
            toast(({
                title: 'Sign Up Failed',
                description: message,
                variant: "destructive"
            }))
        } else {
            toast(({
                title: 'Sign Up',
                description: message,
            }))
            router.replace('/sign-up/verify/');
        }
    }
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const verifyUsernameExist = useCallback(async (value: string) => {
        if (value) {
            const { success, message } =
                await (
                    await fetch(
                        '/api/auth/check-username-unique?username=' + value
                    )
                ).json();
            if (!success) {
                setError("username", { message });
            }
        }
    }, [])
    const debouncedVerify = useMemo(() => _.debounce(verifyUsernameExist, 3000), [verifyUsernameExist])

    return (
        <>
            <Form {...signUpform}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={signUpform.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} onChange={(e) => {
                                        const value = e.target.value;
                                        setValue("username", value, { shouldValidate: true })
                                        debouncedVerify(value);
                                    }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signUpform.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Email-ID</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={signUpform.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >Password</FormLabel>
                                <FormControl>
                                    <Input type={showPassword ? 'text' : "password"} placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                                <div className='flex space-x-2 items-center'>
                                    <Checkbox onClick={() => { setShowPassword(!showPassword) }} /><label className='text-[.8rem]'>Show Password</label>
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={!formState.isValid || formState.isSubmitting} onSubmit={handleSubmit(onSubmit)} >Sign Up</Button>
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
        </>
    )
}

export default SignUp
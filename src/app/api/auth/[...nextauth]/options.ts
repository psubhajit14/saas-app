import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import bcrypt from 'bcrypt'
import dbConnect from "@/config/db"
import UserModel from "@/models/userModel"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string || '',
            clientSecret: process.env.GITHUB_SECRET as string || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string || '',
            clientSecret: process.env.GOOGLE_SECRET as string || '',
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            id: "credentials",
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@das.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials?.email },
                        ]
                    })
                    if (!user) {
                        throw new Error("No user found with the Email-Id");
                    }
                    if (!user.isVerified) {
                        throw new Error("User is not verified. Please verify before Sign In");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials?.password || '', user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect Password")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            }
        },
        ),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.role = user.role;
                token.username = user.username;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.role = token.role;
                session.user.username = token.username;
            }
            return session
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

}

export default NextAuth(authOptions)
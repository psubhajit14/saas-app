import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const url = request.nextUrl.pathname;
    console.log("token, url: ", token, " ", url)
    if (token &&
        (url.startsWith('/sign-in')
            || url.startsWith('/sign-up')
            || url.startsWith('/verify'))
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    if (!token && url.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/verify',
        '/dashboard',
        '/dashboard/:path*',
        '/check-username-unique',
    ]
}
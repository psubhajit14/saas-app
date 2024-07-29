import React, { Suspense } from 'react'

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='flex flex-col justify-center m-auto h-[90vh] w-[80vw] gap-y-8'>
            <header className='text-center text-xl'>Sign up to ExamMeter.in</header>
            <Suspense>
                {children}
            </Suspense>
        </div>
    )
}

export default AuthLayout
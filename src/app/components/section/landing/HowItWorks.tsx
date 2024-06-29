import React from 'react'

const StepCard = ({ step, title, details }: { step: number, title: string, details: string }) => {
    return (
        <div className="border-black bg-yellow-300 border-2 rounded-lg flex flex-col w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] p-4 gap-y-2 shadow-xl">
            <div className='text-xl text-black font-bold'>{step}</div>
            <div className='text-xs'><span className='text-black text-sm font-bold'>{title} </span> – {details}</div>
        </div>
    )
}
const HowItWorks = () => {
    return (
        <section className='mt-12 sm:mt-8'>
            <div className="my-2 py-3 px-6 sm:px-18 lg:px-48 flex items-center text-xl font-bold before:flex-1 before:border-t before:border-yellow-300 before:border-2 before:me-10 after:flex-1 after:border-t after:border-yellow-300 after:border-2 after:ms-10 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600 text-nowrap">How it Works</div>
            <div className='mx-0 lg:mx-16 flex flex-wrap justify-center gap-4'>
                <StepCard step={1} title='Sign Up' details='Create your account quickly and easily.' />
                <StepCard step={2} title='Choose your Test' details='Select from a wide range of subjects and exams.' />
                <StepCard step={3} title='Take the Test' details='Answer questions and get instant feedback.' />
                <StepCard step={4} title='Review Your Performance' details='Analyze your results and track progress.' />
            </div>
        </section>
    )
}

export default HowItWorks
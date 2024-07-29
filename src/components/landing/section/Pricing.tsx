import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const PriceCard = ({ name, description, price, features, discount }: {
    name: string, description: string, price: number, features: string[], discount?: number
}) => {
    return (
        <div className='static flex flex-col gap-y-2 bg-yellow-300 md:bg-yellow-300/10 text-black backdrop-blur-md rounded-lg p-4 shadow-2xl shadow-black/50'>
            <p className='flex items-center gap-x-3 font-bold text-black text-base'>{name} {discount &&
                <span className='bg-red-300 px-2 py-1 rounded-sm text-black text-[12px]'>{discount}% Off</span>
            }</p>
            <p className='font-thin text-gray-700 text-[12px]'>{description}</p>
            <p className='text-[12px] text-slate-400'>₹
                {discount &&
                    < span className='line-through'> {(price * (1 + (discount / 100))).toFixed(2)}</span>
                }&nbsp;<span className='text-black font-extrabold text-sm'>{price.toFixed(2)}</span> INR
            </p>

            <button className='md:hidden bg-white rounded-lg px-4 py-2 w-full'>Buy Now</button>
            {/* Features */}
            <br />
            <div className='flex flex-col gap-y-2 '>
                {features.map(feature => (
                    <div className='flex gap-x-2 items-baseline ' key={feature}>
                        <CheckCircleIcon className="size-4  fill-transparent min-w-max" />
                        <p>{feature}</p>
                    </div>
                ))}

            </div>
            <button className='invisible md:visible md:bg-yellow-300 rounded-lg px-4 py-2 w-[25vw]'>Buy Now</button>
        </div >
    )
}

const Pricing = () => {
    return (
        <section className='h-auto md:h-[100vw]'>
            <div className='static md:relative'>
                <div className='flex justify-center md:justify-between text-[25vw] text-yellow-400'>
                    <span className=''>
                        P
                    </span>
                    <span className=''>
                        r
                    </span>
                    <span className=''>
                        i
                    </span>
                    <span className=''>
                        c
                    </span>
                    <span className=''>
                        i
                    </span>
                    <span className=''>
                        n
                    </span>
                    <span className=''>
                        g
                    </span>
                </div>
                <div className='static md:absolute md:top-1/2 w-full flex flex-col gap-4 px-4 sm:px-8 xl:px-12 md:flex-row justify-center text-white'>
                    <PriceCard
                        name='Enthusiast'
                        description='Who wants to learn and validate own knowledge'
                        price={99.00}
                        discount={20}
                        features={[
                            'Basic features', 'Limited Test ( upto 100 test )', 'Only true/false & MCQ questions', 'Test link for students ( upto 10 test each for 100 users beyond that 20/- per test )', 'True/False, MCQ questions and educational resources'
                        ]} />
                    <PriceCard
                        name='Topper'
                        description='Who wants to Excel in school & competitive field'
                        price={199.00}
                        discount={50}
                        features={[
                            'Basic features', 'Limited Test ( upto 100 test )', 'Only true/false & MCQ questions', 'Test link for students ( upto 10 test each for 100 users beyond that 20/- per test )', 'True/False, MCQ questions and educational resources'
                        ]} />
                    <PriceCard
                        name='Teacher'
                        description='Who wants to Teach, tuition tool and resources'
                        price={299.00}
                        discount={70}
                        features={[
                            'Basic features', 'Limited Test ( upto 100 test )', 'Only true/false & MCQ questions', 'Test link for students ( upto 10 test each for 100 users beyond that 20/- per test )', 'True/False, MCQ questions and educational resources'
                        ]} />
                </div>
            </div>
        </section>
    )
}

export default Pricing
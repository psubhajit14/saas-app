import React from 'react'
import { CursorArrowRaysIcon } from '@heroicons/react/16/solid'
import { gluten } from '@/config/language'
import Image from 'next/image'
import HeroImg from '../../../assets/Hero-image.jpeg';

const Hero: React.FC<any> = () => {
    return (
        <section className='bg-black px-4 mt-24 flex flex-1 gap-x-4 flex-col sm:flex-row items-center justify-evenly sm:justify-between'>
            <div className='flex flex-col justify-start'>
                <div className='text-xl sm:text-3xl lg:text-5xl text-white font-extrabold tracking-wider leading-loose'>
                    <div>Calibrate your <span className='line-through drop-shadow-[10px_10px_30px_rgba(253,224,255,.95)]'>failure</span><br /><span className='hover:text-yellow-300'>Success</span><sub className='text-sm'><CursorArrowRaysIcon className="size-4 fill-white inline" /> here</sub> by </div><div className={`${gluten.className} text-2xl text-yellow-300 font-extrabold mt-6`}>ExamMeter.in</div>
                </div>
            </div>
            <div className='p-8 w-full sm:w-1/2'>
                <Image src={HeroImg} alt='heroImg' priority={false} placeholder='blur' className='object-cover' />
            </div>
        </section >
    )
}

export default Hero
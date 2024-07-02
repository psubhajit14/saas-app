import React from 'react'
import { Socials } from '../landing/Testimonials'
import Image from 'next/image'
import ExamMeterLogo from '../../../assets/EXAM_METER_LOGO_transparent.png'

const Footer = () => {
    return (
        <section >
            <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
                <div className='w-full flex justify-center'>
                    <Image src={ExamMeterLogo} alt='Brand_logo' width={120} height={120} />
                </div>
                <div className="text-center">
                    <div>
                        <a className="flex-none text-xl font-semibold text-black" href="#" aria-label="Brand">ExamMeter.in</a>
                    </div>

                    <div className="mt-3">
                        <p className="text-gray-500">We&apos;re part of the <a className="font-semibold text-blue-600 hover:text-blue-700" href="#">ExamMeter</a> family.</p>
                        <p className="text-gray-500">© ExamMeter.in, 2024. All rights reserved.</p>
                    </div>

                    <div className="mt-3 space-x-2">
                        <Socials size='xs' />
                    </div>
                </div>
            </footer>
        </section>
    )
}

export default Footer
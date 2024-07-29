import React from 'react'
import NavigationDropdown from './NavigationDropdown'
import { gluten } from '@/config/language'

const Header = () => {
    return (
        <nav className="px-8 flex flex-row-reverse sm:flex-row gap-x-4 fixed z-20 left-[5vw] sm:left-[5vw] lg:left-[3vw] w-[90vw] sm:w-[90vw] lg:w-[94vw] h-16 md:h-20 lg:h-24 border-yellow-300 border-2 rounded-full bg-yellow-300 items-center justify-between shadow-2xl shadow-black/50">
            <NavigationDropdown />
            <div className={`{${gluten.className} text-sm md:text-xl`}>ExamMeter.in</div>
            <p className=" font-bold tracking-wider  flex-auto items-center gap-x-4 w-full justify-end hidden sm:flex" >
                <button className="text-xs md:text-lg items-center gap-2 rounded-full bg-black py-2 md:py-4 px-4 md:px-6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Start Free Trial
                </button>
            </p>
        </nav>
    )
}

export default Header
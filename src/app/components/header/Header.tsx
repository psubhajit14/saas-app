import React from 'react'
import NavigationDropdown from './NavigationDropdown'
import { gluten } from '@/app/lib/language'

const Header = () => {
    return (
        <nav className="px-8 flex flex-row-reverse sm:flex-row gap-x-4 fixed z-20 left-[10vw] sm:left-[5vw] lg:left-[3vw] w-[80vw] sm:w-[90vw] lg:w-[94vw] h-24 border-yellow-300 border-2 rounded-full bg-yellow-300 items-center justify-between shadow-2xl shadow-black/50">
            <NavigationDropdown />
            <div className={`{${gluten.className} text-base`}>ExamMeter.in</div>
            <p className=" font-bold tracking-wider  flex-auto items-center gap-x-4 w-full justify-end hidden sm:flex" >
                <button className="text-xs items-center gap-2 rounded-full bg-black py-2 px-4 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Start Free Trial
                </button>
            </p>
        </nav>
    )
}

export default Header
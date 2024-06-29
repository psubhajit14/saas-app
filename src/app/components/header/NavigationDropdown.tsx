"use client"
import React from 'react'
import { useEffect } from 'react';

import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}


import { usePathname } from 'next/navigation'
import { HomeModernIcon, FireIcon, QuestionMarkCircleIcon, Bars3BottomRightIcon, CurrencyRupeeIcon, UserGroupIcon, ChatBubbleLeftEllipsisIcon, InformationCircleIcon, DocumentDuplicateIcon, BriefcaseIcon, LockClosedIcon } from '@heroicons/react/16/solid'


const NavigationDropdown = () => {
    const pathName = usePathname();
    useEffect(() => {
        window.HSStaticMethods.autoInit();
    }, [pathName]);
    return (
        <div className="hs-dropdown relative inline-flex [--strategy:absolute]">
            <button id="hs-dropdown-unstyled" name='menu' className="hs-dropdown-toggle inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                <Bars3BottomRightIcon className="size-7 fill-white" />
            </button>
            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 top-0 lg:start-0 lg:end-auto min-w-48 divide-y divide-gray-200 items-center gap-2 rounded-md bg-gray-800/80 py-1.5 px-1 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white group-hover:bg-white/20" aria-labelledby="hs-dropdown-unstyled">
                <div className="py-2 first:pt-0 last:pb-0">
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20 text-yellow-300 ">
                        <HomeModernIcon className="size-4 fill-yellow-300" />Home
                    </button>

                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <FireIcon className="size-4 fill-white" />Features
                    </button>

                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <QuestionMarkCircleIcon className="size-4 fill-white" />How it Works
                    </button>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <CurrencyRupeeIcon className="size-4 fill-white" />
                        Pricing
                    </button>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <UserGroupIcon className="size-4 fill-white" />
                        About Us
                    </button>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <ChatBubbleLeftEllipsisIcon className="size-4 fill-white" />
                        Contact Us
                    </button>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <InformationCircleIcon className="size-4 fill-white" />
                        FAQ
                    </button>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <DocumentDuplicateIcon className="size-4 fill-white" />
                        Blog
                    </button>
                </div>
                <div className="py-2 first:pt-0 last:pb-0">
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <BriefcaseIcon className="size-4 fill-white" />
                        Start Free Trial
                    </button>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100/20 focus:bg-gray-100/20">
                        <LockClosedIcon className="size-4 fill-white" />
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavigationDropdown;
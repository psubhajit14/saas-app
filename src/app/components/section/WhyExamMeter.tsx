import React from 'react'
import { UserIcon, ChatBubbleBottomCenterIcon, PresentationChartLineIcon, DeviceTabletIcon } from '@heroicons/react/24/outline'

const IconText = ({ Icon, text }: {
    Icon: React.ForwardRefExoticComponent<any>,
    text: string
}) => {
    return (<div className='flex justify-start items-center gap-x-4 w-full text-xs text-start'>
        <Icon className="size-6 md:size-8 fill-yellow-300" />
        <div>{text}</div>
    </div>
    );
}
const WhyExamMeter = () => {
    return (
        <section className='bg-white flex flex-col gap-y-6 justify-center items-center my-12 sm:my-8 text-center' >
            <div className='font-bold text-xl'>
                Why will you choose ExamMeter.in?
            </div>
            <div className='flex flex-col gap-y-6'>
                <IconText Icon={UserIcon} text='Personalized Tests for your curriculum and exam needs' />
                <IconText Icon={ChatBubbleBottomCenterIcon} text='Instant feedback at 24/7 for your guidence' />
                <IconText Icon={PresentationChartLineIcon} text='Detailed explanations and performance insights with chart and graph' />
                <IconText Icon={DeviceTabletIcon} text='Accessible anytime, anywhere. Mobile friendly and easy to use' />
            </div>
        </section>
    )
}

export default WhyExamMeter
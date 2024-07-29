import Image from "next/image";
import React from "react";
import ProfilePic from "../../../assets/pexels-krishna-19867588.jpg";
import FB from '../../../assets/Facebook_logo.svg'
import YT from '../../../assets/Youtube_logo.svg'
import IG from '../../../assets/Instagram_logo.svg'
import LI from '../../../assets/LinkedIn_logo.svg'
import X from '../../../assets/X_logo.svg'

export const Socials = ({ size = 'base' }: { size?: 'base' | 'xs' }) => {
    const iconSize = (size == 'base' ? 1 : 1 / 2) * 48;
    return (
        <div className="flex flex-col gap-y-4 my-4 mx-auto">
            {size == 'base' && <div className="text-gray-300 text-center">You can find more on ...</div>}
            <div className="flex gap-x-4 md:gap-x-8 justify-center" >
                <Image src={FB} alt="Facebook" width={iconSize} height={iconSize} className="cursor-pointer" />
                <Image src={YT} alt="Youtube" width={iconSize} height={iconSize} className="cursor-pointer" />
                <Image src={IG} alt="Instagram" width={iconSize} height={iconSize} className="cursor-pointer" />
                <Image src={LI} alt="LinkedIn" width={iconSize} height={iconSize} className="cursor-pointer" />
                <Image src={X} alt="Twitter/X" width={iconSize} height={iconSize} className="cursor-pointer" />
            </div >
        </div>
    )
}

const Rating = ({
    num, styles = ""
}: {
    num: number,
    styles?: string
}) => {
    const GrayStar = <div className="size-5 inline-flex justify-center items-center text-2xl rounded-full text-white">
        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
        </svg>
    </div>;
    const YellowStar = <div className="size-5 inline-flex justify-center items-center text-2xl rounded-full text-red-400">
        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
        </svg>
    </div>;
    const yellowStars = [];
    const grayStars = [];
    for (let i = 0; i < num; i++) {
        yellowStars.push(YellowStar);
    }
    for (let i = 0; i < 5 - num; i++) {
        grayStars.push(GrayStar);
    }

    return (
        <div className={`flex items-center md:items-start ${styles} mx-auto md:mx-0`}>
            {
                ...[...yellowStars, ...grayStars]
            }
        </div>
    )
}

const TestimonyCard = ({
    img,
    name,
    qualification,
    role,
    message,
    rating,
}: {
    img: string;
    name: string;
    qualification: string;
    role: string;
    message: string;
    rating: number;
}) => {
    return (
        <div className="hs-carousel-slide px-4 sm:px-24 md:px-48">
            <div className="border-yellow-300 bg-yellow-300 border-2 rounded-lg flex flex-col w-full h-4/5 p-4 gap-y-2 ">
                <div className="flex flex-col h-full items-center justify-evenly md:items-start text-center md:text-start  md:flex-row gap-x-4 md:gap-x-8 ">
                    <div className="relative">
                        <Image
                            src={ProfilePic}
                            alt="profileImg"
                            className="mx-2 border-2 border-black h-16 w-16 rounded-full object-cover"
                            width={"64"}
                            height={"64"}
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex h-full flex-col gap-y-2">
                            <div className="text-sm flex flex-col md:flex-row  justify-center md:justify-between items-center"><p>{name}</p> <p className="bg-red-300 px-4 py-2 rounded-md text-xs w-full md:w-fit">{role}</p></div>
                            <div>{qualification}</div>
                            <hr className="border-black border-2 rounded-md" />
                            <div className="text-xs">{message.slice(0, 150)}{message.length > 150 ? '...' : null}</div>
                            <Rating num={rating} styles="invisible md:visible mt-0 md:mt-8" />
                        </div>

                    </div>
                    <Rating num={rating} styles="visible md:hidden" />
                </div>
            </div>
        </div>
    );
};
const Testimonials = () => {
    return (
        <section className="bg-black mt-12 py-4 left-0">
            <div className="my-8 text-xl text-yellow-300 text-center font-bold">
                Voices of Satisfaction
            </div>
            <div
                data-hs-carousel='{
    "loadingClasses": "opacity-0",
    "isAutoPlay": true,
    "isInfiniteLoop": true
  }'
                className="relative"
            >
                <div className="hs-carousel relative overflow-hidden w-full min-h-[484px] rounded-lg">
                    <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                        <TestimonyCard
                            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ILj4v5K-8sFN49Ny4DC-augvncLJL2Aw6g&s"
                            name="Trishita Majumder"
                            qualification="CSE | B.TECH | 4th Year"
                            role="Teacher"
                            message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias quo ducimus cum culpa fuga molestiae, sit inventore repellat id architecto dolor possimus, magni non natus voluptatibus. Dolorem, optio! Dolorem ipsa officiis blanditiis similique aut laborum quisquam, qui beatae ullam provident ab rerum aliquid consequuntur possimus quia architecto repudiandae unde illum."
                            rating={4}
                        />
                        <TestimonyCard
                            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ILj4v5K-8sFN49Ny4DC-augvncLJL2Aw6g&s"
                            name="Trishita Majumder"
                            qualification="CSE | B.TECH | 4th Year"
                            role="Student"
                            message="Lor ab quisquam culpa sequi placeat, iusto ullam, asadsa asdas asdas sa sadsa s laborum repellendus ut quo est ratione libero! Totam ullam asperiores quidem vel perspiciatis vero possimus exercitationem reiciendis mollitia porro doloremque quam quis dolorum ipsam non nam commodi excepturi, eos atque expedita, ipsa necessitatibus, autem itaque? Quisquam aliquid modi repellat error suscipit obcaecati necessitatibus perspiciatis facilis at, mollitia distinctio. Optio nam laudantium ab hic, ea voluptatem corporis nostrum autem iusto tempora sit architecto velit aut, in quaerat nesciunt eveniet fugiat? Porro, exercitationem illum."
                            rating={3}
                        />
                        <TestimonyCard
                            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ILj4v5K-8sFN49Ny4DC-augvncLJL2Aw6g&s"
                            name="Trishita Majumder"
                            qualification="CSE | B.TECH | 4th Year"
                            role="Student"
                            message="Loremplaceat, iusto ullam, laborum repellendus ut quo est ratione libero! Totam ullam asperiores quidem vel perspiciatis vero possimus exercitationem reiciendis mollitia porro doloremque quam quis dolorum ipsam non nam commodi excepturi, eos atque expedita, ipsa necessitatibus, autem itaque? Quisquam aliquid modi repellat error suscipit obcaecati necessitatibus perspiciatis facilis at, mollitia distinctio. Optio nam laudantium ab hic, ea voluptatem corporis nostrum autem iusto tempora sit architecto velit aut, in quaerat nesciunt eveniet fugiat? Porro, exercitationem illum."
                            rating={5}
                        />
                        <TestimonyCard
                            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ILj4v5K-8sFN49Ny4DC-augvncLJL2Aw6g&s"
                            name="Trishita Majumder"
                            qualification="CSE | B.TECH | 4th Year"
                            role="Student"
                            message="Lor ab quisquam culpa sequi placeat, iusto ullam, asadsa asdas asdas sa sadsa s laborum repellendus ut quo est ratione libero! Totam ullam asperiores quidem vel perspiciatis vero possimus exercitationem reiciendis mollitia porro doloremque quam quis dolorum ipsam non nam commodi excepturi, eos atque expedita, ipsa necessitatibus, autem itaque? Quisquam aliquid modi repellat error suscipit obcaecati necessitatibus perspiciatis facilis at, mollitia distinctio. Optio nam laudantium ab hic, ea voluptatem corporis nostrum autem iusto tempora sit architecto velit aut, in quaerat nesciunt eveniet fugiat? Porro, exercitationem illum."
                            rating={3}
                        />
                        <TestimonyCard
                            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7ILj4v5K-8sFN49Ny4DC-augvncLJL2Aw6g&s"
                            name="Trishita Majumder"
                            qualification="CSE | B.TECH | 4th Year"
                            role="Proffessional"
                            message="Loremplaceat, iusto ullam, laborum repellendus ut quo est ratione libero! Totam ullam asperiores quidem vel perspiciatis vero possimus exercitationem reiciendis mollitia porro doloremque quam quis dolorum ipsam non nam commodi excepturi, eos atque expedita, ipsa necessitatibus, autem itaque? Quisquam aliquid modi repellat error suscipit obcaecati necessitatibus perspiciatis facilis at, mollitia distinctio. Optio nam laudantium ab hic, ea voluptatem corporis nostrum autem iusto tempora sit architecto velit aut, in quaerat nesciunt eveniet fugiat? Porro, exercitationem illum."
                            rating={5}
                        />
                    </div>
                </div>

                <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2 md:space-x-4">
                    <span className="hs-carousel-active:bg-yellow-300 hs-carousel-active:scale-125 scale-75 size-3 border-2 border-gray-400 rounded-full cursor-pointer "></span>
                    <span className="hs-carousel-active:bg-yellow-300 hs-carousel-active:scale-125 scale-75 size-3 border-2 border-gray-400 rounded-full cursor-pointer "></span>
                    <span className="hs-carousel-active:bg-yellow-300 hs-carousel-active:scale-125 scale-75 size-3 border-2 border-gray-400 rounded-full cursor-pointer "></span>
                    <span className="hs-carousel-active:bg-yellow-300 hs-carousel-active:scale-125 scale-75 size-3 border-2 border-gray-400 rounded-full cursor-pointer "></span>
                    <span className="hs-carousel-active:bg-yellow-300 hs-carousel-active:scale-125 scale-75 size-3 border-2 border-gray-400 rounded-full cursor-pointer "></span>
                </div>
            </div>
            <Socials />
        </section>
    );
};

export default Testimonials;

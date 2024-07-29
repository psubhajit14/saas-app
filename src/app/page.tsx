import dynamic from 'next/dynamic'


import Footer from "../components/landing/section/Footer";
import Hero from "../components/landing/section/Hero";
import HowItWorks from "../components/landing/section/HowItWorks";
import Pricing from "../components/landing/section/Pricing";
import Testimonials from "../components/landing/section/Testimonials";
import WhyExamMeter from "../components/landing/section/WhyExamMeter";
const DynamicHeader = dynamic(() => import('../components/landing/header/Header'), {
  ssr: false,
})
export default function Home() {
  return (
    <main className=''>
      <div className="bg-black px-0 py-4 md:p-8">
        <DynamicHeader />
        <Hero />
      </div>
      <div className="p-8">
        <WhyExamMeter />
        <HowItWorks />
      </div>
      <div className="bg-black p-2 md:p-8">
        <Testimonials />
      </div>
      <div className="p-2 md:p-8">
        <Pricing />
        <Footer />
      </div>



    </main>
  );
}

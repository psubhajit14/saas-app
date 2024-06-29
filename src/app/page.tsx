import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('./components/header/Header'), {
  ssr: false,
})
import Footer from "./components/section/landing/Footer";
import Hero from "./components/section/landing/Hero";
import HowItWorks from "./components/section/landing/HowItWorks";
import Pricing from "./components/section/landing/Pricing";
import Testimonials from "./components/section/landing/Testimonials";
import WhyExamMeter from "./components/section/landing/WhyExamMeter";

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

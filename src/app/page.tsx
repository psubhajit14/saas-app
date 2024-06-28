import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('./components/header/Header'), {
  ssr: false,
})
import Footer from "./components/section/Footer";
import Hero from "./components/section/Hero";
import HowItWorks from "./components/section/HowItWorks";
import Pricing from "./components/section/Pricing";
import Testimonials from "./components/section/Testimonials";
import WhyExamMeter from "./components/section/WhyExamMeter";

export default function Home() {
  return (
    <main>
      <div className="bg-black p-8">
        <DynamicHeader />
        <Hero />
      </div>
      <div className="p-8">
        <WhyExamMeter />
        <HowItWorks />
      </div>
      <div className="bg-black p-8">
        <Testimonials />
      </div>
      <div className="p-8">
        <Pricing />
        <Footer />
      </div>



    </main>
  );
}

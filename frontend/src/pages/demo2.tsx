// src/pages/LandingPage.tsx
import { useEffect } from 'react';
import Navbar from '../components/demo/Navbar';
import Hero from '../components/demo/Hero';
import AboutSection from '../components/demo/About';
import WhyChooseUs from '../components/demo/ChooseUs';
import SecuritySection from '../components/demo/SecuritySection';
import ValueSection from '../components/demo/ValueSection';
// import KeyFeatures from '../components/demo/KeyFeatures';
// import InvestmentSection from '../components/demo/InvestmentSection';
// import Strategies from '../components/demo/Strategies';
// import ValuesSection from '../components/demo/ValuesSection';
// import ContactSection from '../components/demo/ContactSection';
// import Footer from '../components/demo/Footer';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <Hero />
      <AboutSection />
      <WhyChooseUs />
      <SecuritySection />
      <ValueSection />
      {/* <KeyFeatures /> */}
      {/* <InvestmentSection /> */}
      {/* <Strategies /> */}
      {/* <ValuesSection /> */}
      {/* <ContactSection /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
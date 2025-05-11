// src/pages/LandingPage.tsx
import { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import AboutSection from '../components/landing/About';
import WhyChooseUs from '../components/landing/ChooseUs';
import SecuritySection from '../components/landing/SecuritySection';
import ValueSection from '../components/landing/ValueSection';
import KeyFeatures from '../components/landing/KeyFeatures';
import Strategies from '../components/landing/Strategies';
import ValuesSection from '../components/landing/ValueSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const controls = useAnimation();
  const inView = useInView({
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
      <KeyFeatures />
      <Strategies />
      <ValuesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
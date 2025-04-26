// src/components/WhyChooseUs.tsx
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FaHeadset, FaShieldAlt, FaLightbulb } from "react-icons/fa";

const features = [
  {
    icon: FaHeadset,
    title: "Lifetime Support",
    description: "Sustaining Support puts you in control of your upgrade strategy."
  },
  {
    icon: FaShieldAlt,
    title: "High Security",
    description: "Prevent a security breach by keeping data out of reach."
  },
  {
    icon: FaLightbulb,
    title: "Opportunity",
    description: "Grab a golden opportunity to make some profit with SharkFund."
  }
];

const WhyChooseUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <motion.div
          animate={{ 
            x: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0]
          }}
          transition={{ 
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-yellow-600 rounded-full filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ 
            x: [0, -10, 0, 10, 0],
            y: [0, 10, 0, -10, 0]
          }}
          transition={{ 
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1
          }}
          className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-20"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
          >
            WHY CHOOSE US
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            We provide the most secure and innovative trading platform with 24/7 support to ensure your success.
          </motion.p>
        </motion.div>
        
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 30px -10px rgba(212, 175, 55, 0.3)" 
              }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 transition-all duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 flex items-center justify-center">
                  <feature.icon size={24} className="text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-block"
              >
                <span className="text-yellow-500 font-medium flex items-center justify-center cursor-pointer">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
// src/components/ValueSection.tsx
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const ValueSection = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 opacity-30">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-600 rounded-full filter blur-3xl opacity-20"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
          >
            VALUE OF ASSOCIATION
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"
          ></motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-300 max-w-3xl mx-auto mb-10 text-lg"
          >
            SharkFund uses its proprietary technology and international experience to offer low cost, seamless global access to multiple types of securities for both institutional and individual investors.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8"
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 w-full md:w-1/3 relative overflow-hidden"
            >
              <motion.div 
                variants={glowVariants}
                animate="animate"
                className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500 rounded-full filter blur-3xl opacity-20"
              />
              
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Global Access</h3>
              <p className="text-gray-300">Access financial markets worldwide with our advanced trading platform.</p>
              
              <div className="mt-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 w-full md:w-1/3 relative overflow-hidden"
            >
              <motion.div 
                variants={glowVariants}
                animate="animate"
                className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-600 rounded-full filter blur-3xl opacity-20"
              />
              
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Low Cost</h3>
              <p className="text-gray-300">Enjoy competitive fees and rates that maximize your investment potential.</p>
              
              <div className="mt-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700 w-full md:w-1/3 relative overflow-hidden"
            >
              <motion.div 
                variants={glowVariants}
                animate="animate"
                className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500 rounded-full filter blur-3xl opacity-20"
              />
              
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Proprietary Tech</h3>
              <p className="text-gray-300">Cutting-edge technology that gives you the edge in today's markets.</p>
              
              <div className="mt-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://www.instagram.com/sharkfund.in/", "_blank")}
              className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold px-8 py-4 rounded-full text-lg shadow-lg"
            >
              JOIN THE COMMUNITY
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueSection;

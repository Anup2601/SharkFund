// src/components/AboutSection.tsx
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const AboutSection = () => {
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

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <section id="company" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className="lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-12"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: 0.1 }
                }
              }}
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            >
              "Flattening" the world of trading with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                SharkFund
              </span>
            </motion.h2>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: 0.3 }
                }
              }}
              className="text-gray-300 mb-6"
            >
              SharkFund has built a flexible and modern trading and risk platform employing the latest software design and infrastructure technologies. The platform provides a comprehensive solution that will evolve with our clients.
            </motion.p>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: 0.5 }
                }
              }}
              className="text-gray-300"
            >
              We provide a fully integrated, scalable, and future proofed platform to support our clients entire workflow including: Portfolio management, trade execution, settlement, compliance, reconciliation, finance, risk, administration, and client reporting - all managed from a single source in a modern cloud infrastructure.
            </motion.p>
          </motion.div>
          
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            className="lg:w-1/2"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.03, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500 rounded-full filter blur-3xl opacity-20 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-600 rounded-full filter blur-3xl opacity-20 -z-10"></div>
                
                <div className="mb-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-sm">S</span>
                  </div>
                  <span className="text-xl font-bold text-yellow-500">SharkFund Trading Platform</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    "Portfolio management",
                    "Trade execution",
                    "Settlement",
                    "Compliance",
                    "Reconciliation",
                    "Finance & risk management",
                    "Administration",
                    "Client reporting"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mr-3"></div>
                      <span className="text-gray-200">{item}</span>
                    </motion.div>
                  ))}
                </div>
                
                <Link to={"/login"}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold px-6 py-3 rounded-full inline-block"
                  >
                    Explore Platform
                  </motion.div>
                </Link>
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  y: [0, -5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 10,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 opacity-40 blur-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
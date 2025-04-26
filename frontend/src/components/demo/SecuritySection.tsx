// src/components/SecuritySection.tsx
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FaShieldAlt, FaLock, FaUserShield } from "react-icons/fa";

const SecuritySection = () => {
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

  const textVariants = {
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
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <section id="security" className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-500 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.03, rotate: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-xl border border-gray-700 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500 rounded-full filter blur-3xl opacity-20 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-600 rounded-full filter blur-3xl opacity-20 -z-10"></div>
                
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <FaShieldAlt size={36} className="text-black" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: FaLock,
                      title: "Regulated Trust Company",
                      description: "Subject to capital reserve requirements and banking compliance standards"
                    },
                    {
                      icon: FaUserShield,
                      title: "Fiduciary & Qualified Custodian",
                      description: "Your assets are protected and managed with the highest standards"
                    },
                    {
                      icon: FaShieldAlt,
                      title: "Security-First Mentality",
                      description: "We ask for permission, not forgiveness"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                      className="flex items-start"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 flex items-center justify-center shrink-0 mr-4">
                        <item.icon size={18} className="text-black" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
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
                  className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 opacity-40 blur-lg"
                />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={textVariants}
            className="lg:w-1/2 lg:pl-12"
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
              We founded SharkFund with a <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">security-first</span> mentality
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
              Security-first mentality and ethos of asking for permission, not forgiveness. We have worked hard to provide you with a high-integrity choice and we look forward to earning and maintaining your trust.
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
              className="text-gray-300 mb-8"
            >
              SharkFund is a trust company regulated by the Department of Financial Services. We are subject to capital reserve requirements, cybersecurity requirements, and banking compliance standards set forth by the Banking Law. SharkFund is also a fiduciary and Qualified Custodian.
            </motion.p>
            
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: 0.7 }
                }
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold px-8 py-4 rounded-full text-lg shadow-gold"
            >
              GET STARTED
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
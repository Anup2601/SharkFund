import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 bg-gray-900 relative overflow-hidden">
      <div className="absolute w-full h-full top-0 left-0 opacity-30">
        <div className="absolute top-0 left-0 w-60 h-60 bg-yellow-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              We are world leading <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                product innovation team
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-300 text-lg mb-8 max-w-lg"
            >
              SharkFund is a full-service marketing agency that's been purpose-built to help organizations thrive in an increasingly complex landscape.
            </motion.p>

            <Link to="/login">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(212, 175, 55, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold px-8 py-4 rounded-full text-lg shadow-gold"
              >
                GET STARTED
              </motion.button>
            </Link>
            
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl transform rotate-1"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mr-2">
                      <span className="text-black font-bold text-xs">S</span>
                    </div>
                    <span className="text-yellow-500 font-bold">SHARK FUND</span>
                  </div>
                  <div className="text-yellow-500">LINK FUND</div>
                </div>
                
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-xl text-yellow-500 font-medium"
                  >
                    100 INR SE
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2"
                  >
                    35,000
                  </motion.div>
                  <div className="text-yellow-500">INR!</div>
                </div>
                
                <div className="flex justify-between bg-gray-900 p-4 rounded-lg mb-6">
                  <div>
                    <div className="text-yellow-500 mb-1">EK BAAR KA</div>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: [0.9, 1.05, 1] }}
                      transition={{ duration: 0.8, delay: 1.5 }}
                      className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
                    >
                      100
                    </motion.div>
                    <div className="text-gray-400 text-sm">INVESTMENT</div>
                  </div>
                  <div className="ml-2 text-right">
                    <div className="text-yellow-500 mb-1">9 MAHINE AUR</div>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: [0.9, 1.05, 1] }}
                      transition={{ duration: 0.8, delay: 1.7 }}
                      className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
                    >
                      35,000
                    </motion.div>
                    <div className="text-gray-400 text-xs">MAXIMUM 5,00,000 KA RETURN</div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-medium py-2 px-6 rounded-full flex-1"
                  >
                    LINK IN BIO
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-yellow-600 text-yellow-500 font-medium py-2 px-6 rounded-full flex-1"
                  >
                    LINK IN BOT
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  y: [0, -5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
                className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-500 opacity-70 blur-md"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
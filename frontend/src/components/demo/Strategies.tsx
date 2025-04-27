import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import IncomeStrategy from '../../assets/Income Strategy.png'
import GrowthStrategy from '../../assets/Growth.png'
import BalanceStrategy from '../../assets/balance.png'
const Strategies = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  const strategies = [
    {
      title: "Growth Strategy",
      description: "Focus on long-term capital appreciation through investments in high-growth sectors like technology and renewable energy.",
      image : GrowthStrategy,
      stats: [
        { value: "18%", label: "Average Annual Return" },
        { value: "5-7", label: "Years Horizon" },
        { value: "Medium", label: "Risk Level" }
      ]
    },
    {
      title: "Income Strategy",
      description: "Generate consistent monthly income through dividend stocks, bonds, and real estate investments.",
      image : IncomeStrategy,
      stats: [
        { value: "12%", label: "Average Annual Return" },
        { value: "3-5", label: "Years Horizon" },
        { value: "Low", label: "Risk Level" }
      ]
    },
    {
      title: "Balanced Strategy",
      description: "Achieve steady growth while maintaining income through a diversified portfolio across multiple asset classes.",
      image: GrowthStrategy,
      stats: [
        { value: "15%", label: "Average Annual Return" },
        { value: "4-6", label: "Years Horizon" },
        { value: "Low-Medium", label: "Risk Level" }
      ]
    }
  ];

  return (
    <section id="strategies" className="py-20 bg-gray-900" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.span
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-opacity-10 text-black-300 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Investment Strategies
          </motion.span>
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Success</span> Strategies
          </motion.h2>
          <motion.p className="max-w-2xl mx-auto text-gray-300">
            Discover our proven investment strategies that have consistently delivered exceptional returns to our investors.
          </motion.p>
        </motion.div>

        <motion.div className="space-y-16">
          {strategies.map((strategy, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-16 items-center`}
            >
              <motion.div 
                className="w-full lg:w-1/2"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <motion.div
                    className="absolute inset-0  opacity-30"
                    whileHover={{ opacity: 0.5 }}
                  />
                  <img 
                    src={strategy.image} 
                    alt={strategy.title} 
                    className="w-full h-auto rounded-2xl" 
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"
                  />
                </div>
              </motion.div>
              
              <div className="w-full lg:w-1/2">
                <motion.h3 
                  className="text-3xl font-bold mb-4"
                  whileHover={{ 
                    color: "#a855f7",
                    transition: { duration: 0.3 }
                  }}
                >
                  {strategy.title}
                </motion.h3>
                <motion.p className="text-gray-300 mb-6">
                  {strategy.description}
                </motion.p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {strategy.stats.map((stat, statIndex) => (
                    <motion.div 
                      key={statIndex} 
                      className="bg-gray-800 p-4 rounded-lg"
                      whileHover={{ y: -5 }}
                    >
                      <motion.p 
                        className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
                <Link to ={'/login'}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="py-3 px-8 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium shadow-lg"
                  >
                    Learn More
                  </motion.button>
                </Link>
                
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Strategies;
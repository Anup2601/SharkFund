import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InvestmentSection = () => {
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

  const plans = [
    {
      title: "Starter",
      price: "$100",
      duration: "min investment",
      features: ["12% Annual Return", "Monthly Dividends", "Dashboard Access", "Email Support"],
      accent: "from-blue-400 to-blue-600"
    },
    {
      title: "Growth",
      price: "$500",
      duration: "min investment",
      features: ["15% Annual Return", "Monthly Dividends", "Priority Support", "Tax Documentation", "Investment Consultation"],
      accent: "from-purple-400 to-purple-600",
      highlighted: true
    },
    {
      title: "Premium",
      price: "$1000",
      duration: "min investment",
      features: ["18% Annual Return", "Weekly Dividends", "24/7 Support", "Tax Planning", "Personal Advisor", "Exclusive Opportunities"],
      accent: "from-teal-400 to-teal-600"
    }
  ];

  return (
    <section id="investment" className="py-20 bg-gray-900" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.span
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-600 bg-opacity-10 text-blue-300 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Investment Plans
          </motion.span>
          <motion.h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Investment</span> Plan
          </motion.h2>
          <motion.p className="max-w-2xl mx-auto text-gray-300">
            Explore our range of investment options designed to meet your financial goals and risk tolerance. Start your journey to financial freedom today.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`${
                plan.highlighted 
                  ? 'relative z-10 transform scale-105 bg-gradient-to-b from-gray-800 to-gray-900' 
                  : 'bg-gray-800'
              } rounded-2xl shadow-xl overflow-hidden border border-gray-700`}
            >
              {plan.highlighted && (
                <motion.div 
                  className="absolute -top-4 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </motion.div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-end mb-6">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${plan.accent} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">{plan.duration}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <motion.svg 
                        whileHover={{ rotate: 180 }}
                        className="w-5 h-5 mr-2 text-green-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${plan.accent} text-white font-medium shadow-lg`}
                >
                  Start Investing
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default InvestmentSection;
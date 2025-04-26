import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const KeyFeatures = () => {
  const features = [
    {
      icon: "💰",
      title: "Flexible Funding Options",
      description: "Choose between fixed and flexible funding models to suit your project needs."
    },
    {
      icon: "🔒",
      title: "Secure Transactions",
      description: "Enterprise-grade security for all financial transactions with 24/7 monitoring."
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Real-time campaign performance data with actionable insights."
    },
    {
      icon: "🌐",
      title: "Global Reach",
      description: "Connect with backers from over 190 countries worldwide."
    },
    {
      icon: "📱",
      title: "Mobile Optimization",
      description: "Seamlessly manage your campaign from any device, anywhere."
    },
    {
      icon: "🤝",
      title: "Dedicated Support",
      description: "Our expert team is available to help you maximize your campaign success."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="features" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          ref={ref}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span> For Success
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto my-4"
            initial={{ width: 0 }}
            animate={inView ? { width: "5rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Our platform offers everything you need to launch, manage, and scale your crowdfunding campaign.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          ref={ref}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-colors duration-300"
              variants={featureVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 10px 30px -15px rgba(124, 58, 237, 0.5)"
              }}
            >
              <div className="rounded-full bg-gradient-to-br from-blue-400 to-purple-600 w-16 h-16 flex items-center justify-center text-3xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
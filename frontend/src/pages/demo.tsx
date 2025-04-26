import { useState, useEffect, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type NavItem = {
  id: string;
  label: string;
};

type FeatureItem = {
  icon: JSX.Element;
  title: string;
  description: string;
};

type TestimonialItem = {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
};

type ProjectItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  goal: string;
  raised: string;
  backers: number;
  daysLeft: number;
  progress: number;
};

const CoffeeFundingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);
  
  // Navigation items
  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "features", label: "Features" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" }
  ];
  
  // Features data
  const features: FeatureItem[] = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Easy Funding",
      description: "Launch your campaign in minutes with our intuitive platform."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Secure Transactions",
      description: "All payments are protected with military-grade encryption."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Support",
      description: "Join our network of creators and backers passionate about innovation."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Growth Analytics",
      description: "Track your campaign performance with detailed statistics and insights."
    }
  ];
  
  // Projects data
  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "Artisanal Coffee Co-op",
      description: "Supporting small-scale coffee farmers with fair trade practices and sustainable growing methods.",
      image: "/api/placeholder/400/250",
      goal: "$50,000",
      raised: "$38,250",
      backers: 215,
      daysLeft: 18,
      progress: 76
    },
    {
      id: 2,
      title: "Eco-Friendly Coffee Maker",
      description: "Revolutionary coffee brewing system that uses 50% less energy and creates zero waste.",
      image: "/api/placeholder/400/250",
      goal: "$75,000",
      raised: "$42,750",
      backers: 376,
      daysLeft: 24,
      progress: 57
    },
    {
      id: 3,
      title: "Coffee Education Center",
      description: "Building a training facility to teach sustainable coffee farming techniques to communities in need.",
      image: "/api/placeholder/400/250",
      goal: "$120,000",
      raised: "$89,600",
      backers: 542,
      daysLeft: 31,
      progress: 75
    }
  ];
  
  // Testimonials data
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Coffee Shop Owner",
      content: "CoffeeFund helped us raise the capital we needed to expand our roastery. The platform was easy to use and our backers loved the updates feature.",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Developer",
      content: "As a first-time creator, I was nervous about crowdfunding. The CoffeeFund team guided me through every step, and we exceeded our funding goal by 215%!",
      avatar: "/api/placeholder/50/50"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Coffee Farmer",
      content: "CoffeeFund connected our cooperative directly with customers who value sustainable practices. This platform changed our lives and business.",
      avatar: "/api/placeholder/50/50"
    }
  ];
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };
  
  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };
  
  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 15 }
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen font-sans">
      {/* Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#home" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-amber-500">CoffeeFund</span>
            </a>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(item => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? 'text-amber-800' : 'text-gray-600 hover:text-amber-600'}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            
            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden"
                >
                  <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col space-y-3">
                      {navItems.map(item => (
                        <a 
                          key={item.id}
                          href={`#${item.id}`}
                          className={`text-sm font-medium py-2 px-3 rounded-md transition-colors duration-300 ${activeSection === item.id ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* CTA Button */}
            <div className="hidden md:block">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#start" 
                className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                Start a Project
              </motion.a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/80 to-white/80 backdrop-blur-sm"></div>
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-amber-300 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -left-32 top-1/2 w-96 h-96 bg-amber-600 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div 
              className="w-full md:w-1/2 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800"
                variants={slideFromLeft}
              >
                Fund Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-800 to-amber-500">Coffee</span> Dreams
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 max-w-lg"
                variants={slideFromLeft}
              >
                The premier crowdfunding platform for coffee innovators, artisans, and entrepreneurs. Turn your passion into reality with community support.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={slideFromLeft}
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#start" 
                  className="px-6 py-3 rounded-md bg-gradient-to-r from-amber-700 to-amber-500 text-white font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Your Campaign
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects" 
                  className="px-6 py-3 rounded-md border-2 border-amber-600 text-amber-700 font-semibold text-center hover:bg-amber-50 transition-all duration-300"
                >
                  Explore Projects
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-600/20 to-amber-300/20 rounded-lg blur-md"></div>
                <div className="relative bg-white p-2 rounded-lg shadow-xl">
                  <img 
                    src="/api/placeholder/600/400" 
                    alt="Coffee Entrepreneur" 
                    className="w-full h-auto rounded"
                  />
                </div>
                
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-amber-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Funding Raised</p>
                    <p className="text-lg font-bold text-gray-800">$2.4M+</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="bg-amber-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Happy Backers</p>
                    <p className="text-lg font-bold text-gray-800">15,000+</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Statistics */}
        <motion.div 
          className="container mx-auto px-4 mt-16 md:mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "500+", label: "Successful Projects" },
              { value: "$5M+", label: "Capital Raised" },
              { value: "20K+", label: "Global Backers" },
              { value: "98%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={scaleIn}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800">{stat.value}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About CoffeeFund</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We are passionate about connecting coffee innovators with the resources they need to bring their ideas to life.</p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideFromLeft}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/10 to-amber-700/10 rounded-lg blur-md"></div>
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Coffee Farmers" 
                  className="w-full h-auto rounded-lg shadow-lg relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-500 rounded-lg opacity-20 z-0"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-700 rounded-lg opacity-20 z-0"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideFromRight}
            >
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
              <p className="text-gray-600">
                CoffeeFund was founded in 2022 with a simple mission: to democratize funding for coffee-related projects around the world. We believe that great ideas deserve support, regardless of where they come from.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-800">Why Coffee?</h3>
              <p className="text-gray-600">
                Coffee isn't just a beverage—it's a global culture that connects farmers, roasters, baristas, and consumers. By focusing on coffee innovation, we're supporting an industry that impacts millions of livelihoods worldwide.
              </p>
              
              <div className="pt-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#story" 
                  className="inline-flex items-center text-amber-700 font-medium"
                >
                  <span>Read Our Full Story</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-400 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose CoffeeFund</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our platform is designed with coffee innovators in mind, offering specialized tools to bring your caffeinated dreams to life.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={scaleIn}
              >
                <div className="text-amber-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover innovative coffee projects from around the world that need your support.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                variants={scaleIn}
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {project.daysLeft} days left
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-amber-700 font-medium">{project.progress}%</span>
                      </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-amber-700 to-amber-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-6">
                    <div>
                      <span className="block font-medium text-gray-800">{project.raised}</span>
                      <span>raised of {project.goal}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-medium text-gray-800">{project.backers}</span>
                      <span>backers</span>
                    </div>
                  </div>
                  
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`#project-${project.id}`}
                    className="block w-full py-3 text-center bg-gradient-to-r from-amber-700 to-amber-500 text-white font-medium rounded-md shadow hover:shadow-md transition-all duration-300"
                  >
                    Back This Project
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#all-projects"
              className="inline-flex items-center px-6 py-3 border-2 border-amber-600 text-amber-700 font-semibold rounded-md hover:bg-amber-50 transition-all duration-300"
            >
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from project creators and backers who have found success with CoffeeFund.</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-100">
                      <img 
                        src={testimonials[currentTestimonial].avatar} 
                        alt={testimonials[currentTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <svg className="h-8 w-8 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    
                    <p className="text-gray-600 italic mb-6">{testimonials[currentTestimonial].content}</p>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-amber-600">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-amber-600 w-6' : 'bg-amber-300'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="start" className="py-16 md:py-24 bg-gradient-to-r from-amber-700 to-amber-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div 
              className="w-full md:w-1/2 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideFromLeft}
            >
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Fund Your Coffee Project?</h2>
              <p className="text-amber-100 max-w-md">Join our community of innovators and bring your coffee ideas to life with crowdfunding that understands your passion.</p>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#create-project"
                className="inline-flex items-center px-6 py-3 bg-white text-amber-700 font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Campaign
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-lg blur-md"></div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 md:p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold ml-4">Join In 3 Simple Steps</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { number: "1", text: "Create your project and set your funding goal" },
                      { number: "2", text: "Share your story and connect with backers" },
                      { number: "3", text: "Receive funds and bring your coffee vision to life" }
                    ].map((step, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">
                          {step.number}
                        </div>
                        <p className="ml-4 text-white">{step.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions about starting your campaign? Our team is here to help.</p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-b from-amber-50 to-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 bg-gradient-to-br from-amber-700 to-amber-500 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-amber-100">Email</p>
                        <p className="font-medium">hello@coffeefund.co</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-amber-100">Phone</p>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white/20 p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-amber-100">Location</p>
                        <p className="font-medium">123 Coffee Street, Seattle, WA</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h4 className="font-medium mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                        <a 
                          key={social}
                          href={`#${social}`}
                          className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors duration-300"
                          aria-label={`Follow us on ${social}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        placeholder="How can we help?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full py-3 px-6 bg-gradient-to-r from-amber-700 to-amber-500 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">CoffeeFund</span>
              </div>
              
              <p className="text-gray-400 mb-6">
                Connecting coffee innovators with passionate backers to bring great ideas to life.
              </p>
              
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <a 
                    key={social}
                    href={`#${social}`}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                    aria-label={`Follow us on ${social}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About Us", href: "#about" },
                  { label: "How It Works", href: "#features" },
                  { label: "Browse Projects", href: "#projects" },
                  { label: "Success Stories", href: "#testimonials" },
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Resources</h4>
              <ul className="space-y-3">
                {[
                  { label: "Creator Handbook", href: "#handbook" },
                  { label: "Funding Basics", href: "#basics" },
                  { label: "FAQ", href: "#faq" },
                  { label: "Community Guidelines", href: "#guidelines" },
                  { label: "Blog", href: "#blog" },
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new projects and coffee innovations.</p>
              
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-800"
                />
                <button 
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} CoffeeFund. All rights reserved.
              </p>
              
              <div className="flex space-x-4 text-sm text-gray-400">
                <a href="#privacy" className="hover:text-amber-400 transition-colors duration-300">Privacy Policy</a>
                <a href="#terms" className="hover:text-amber-400 transition-colors duration-300">Terms of Service</a>
                <a href="#cookies" className="hover:text-amber-400 transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {scrollY > 300 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-amber-600 text-white shadow-lg z-50"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoffeeFundingPage;
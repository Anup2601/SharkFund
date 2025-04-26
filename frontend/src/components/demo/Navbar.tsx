// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#company' },
  { name: 'Features', link: '#features' },
  { name: 'Contact', link: '#contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed w-full z-50 ${
        scrolled ? 'bg-black bg-opacity-90 shadow-lg' : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center"
          >
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <span className="text-gold text-2xl font-bold">SHARK</span>
                <span className="text-white text-2xl font-bold">FUND</span>
              </motion.div>
            </div>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.link}
                  whileHover={{ scale: 1.1, color: '#D4AF37' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gold transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold px-5 py-2 rounded-full shadow-gold"
                >
                   Login
                </motion.button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gold"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black bg-opacity-95"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.link}
                whileHover={{ scale: 1.05, x: 5 }}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gold"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full text-center bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold px-5 py-2 rounded-full shadow-gold mt-3"
            >
              Login
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
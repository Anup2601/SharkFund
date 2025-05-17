import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 px-6 mt-auto border-t border-gray-700">
      <div className="container mx-auto flex flex-wrap justify-center items-center space-x-4 text-sm">
        <Link 
          to="/privacy-policy" 
          className="hover:text-teal-400 transition-colors duration-200"
        >
          Privacy Policy
        </Link>
        
        <span className="text-gray-500">•</span>
        
        <Link 
          to="/terms" 
          className="hover:text-teal-400 transition-colors duration-200"
        >
          Terms of Service
        </Link>
        
        <span className="text-gray-500">•</span>
        
        <Link 
          to="/cookie-policy" 
          className="hover:text-teal-400 transition-colors duration-200"
        >
          Cookie Policy
        </Link>
        
        <span className="text-gray-500">•</span>
        
        <Link 
          to="/disclaimer" 
          className="hover:text-teal-400 transition-colors duration-200"
        >
          Disclaimer
        </Link>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-2">
        © {new Date().getFullYear()} SharkFund. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
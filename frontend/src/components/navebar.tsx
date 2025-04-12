// components/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import Avatar from "../assets/avatar.png";
import toast from 'react-hot-toast';

interface NavbarProps {
  currentUser: {
    name: string;
    email: string;
    profileImage: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-teal-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="ml-2 text-xl font-bold text-teal-300">SharkFund</span>
            </div>
          </div>
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* User Profile */}
          <div className="ml-4 flex items-center md:ml-6" ref={dropdownRef}>
            <div className="relative">
              <button
                className="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:shadow-outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="mr-3 font-medium text-gray-300">{currentUser.name}</span>
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-teal-400"
                  src={Avatar}
                  alt="Profile"
                />
              </button>
              
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50">
                  <div className="py-1 rounded-md bg-gray-700 shadow-xs">
                    <a
                      href="/forgotpassword"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      Reset Password
                    </a>
                    <div className="border-t border-gray-600"></div>
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem('token');
                        toast.success('Logged out successfully!');
                        window.location.href = '/';
                      }}
                      className="block px-4 py-2 text-sm text-teal-300 hover:bg-gray-600"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
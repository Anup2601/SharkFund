// components/Sidebar.tsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface SidebarProps {
  onComponentChange: (componentName: string) => void;
  activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onComponentChange, activeComponent }) => {
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({
    teamArea: false,
    fundArea: false,
    income: false
  });
  
  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  return (
    <aside className="bg-gray-900 w-64 flex-shrink-0">
      <div className="h-full flex flex-col">
        {/* Sidebar Items */}
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-2 space-y-1">
            {/* Dashboard */}
            <button
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md group transition-colors ${
                activeComponent === 'dashboard' 
                  ? 'bg-teal-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => onComponentChange('dashboard')}
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </button>
            
            {/* Profile */}
            <button
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md group transition-colors ${
                activeComponent === 'profile' 
                  ? 'bg-teal-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => onComponentChange('profile')}
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Profile
            </button>
            
            {/* Fund Area Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 group transition-colors"
                onClick={() => toggleMenu('fundArea')}
              >
                <div className="flex items-center">
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Fund Area
                </div>
                <svg 
                  className={`h-5 w-5 transform transition-transform duration-200 ${expandedMenus.fundArea ? 'rotate-90' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Fund Area Submenu */}
              {expandedMenus.fundArea && (
                <div className="pl-8 space-y-1">
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                      activeComponent === 'deposit' 
                        ? 'bg-gray-700 text-teal-300' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }`}
                    onClick={() => onComponentChange('deposit')}
                  >
                    <span className="truncate">Deposit</span>
                  </button>
                  
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                      activeComponent === 'withdraw' 
                        ? 'bg-gray-700 text-teal-300' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }`}
                    onClick={() => onComponentChange('withdraw')}
                  >
                    <span className="truncate">Withdraw</span>
                  </button>

                  {/* <button
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                      activeComponent === 'monthly-income' 
                        ? 'bg-gray-700 text-teal-300' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }`}
                    onClick={() => onComponentChange('monthly-income')}
                  >
                    <span className="truncate">Monthly-Income</span>
                  </button> */}
                </div>
              )}
            </div>
            
            {/* Team Area Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 group transition-colors"
                onClick={() => toggleMenu('teamArea')}
              >
                <div className="flex items-center">
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  Team Area
                </div>
                <svg 
                  className={`h-5 w-5 transform transition-transform duration-200 ${expandedMenus.teamArea ? 'rotate-90' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Team Area Submenu */}
              {expandedMenus.teamArea && (
                <div className="pl-8 space-y-1">
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                      activeComponent === "referral" 
                        ? 'bg-gray-700 text-teal-300' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }`}
                    onClick={() => onComponentChange('referral')}
                  >
                    <span className="truncate">Referral ID</span>
                  </button>
                </div>
              )}
            </div>

            {/* Income Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 group transition-colors"
                onClick={() => toggleMenu('income')}
              >
                <div className="flex items-center">
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                  </svg>
                  Income
                </div>
                <svg 
                  className={`h-5 w-5 transform transition-transform duration-200 ${expandedMenus.income ? 'rotate-90' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Income Submenu */}
              {expandedMenus.income && (
                <div className="pl-8 space-y-1">
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                      activeComponent === "myincome" 
                        ? 'bg-gray-700 text-teal-300' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }`}
                    onClick={() => onComponentChange('myincome')}
                  >
                    <span className="truncate">My Income</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Support */}
            <button
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-md group transition-colors ${
                activeComponent === 'support' 
                  ? 'bg-teal-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => onComponentChange('support')}
            >
              <svg className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Support
            </button>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-700">
          {/* Help Box */}
          <div className="bg-gray-800 rounded-lg p-4 mb-4"
            onClick={() => toast('🚧 Documentation coming soon!')}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">Need help?</p>
                <p className="text-xs text-gray-400">Check our documentation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
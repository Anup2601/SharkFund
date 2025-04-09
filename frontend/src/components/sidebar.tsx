// components/Sidebar.tsx
import React, { useState } from 'react';

interface SidebarProps {
  onComponentChange: (componentName: string) => void;
  activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onComponentChange, activeComponent }) => {
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({
    teamArea: false
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
            
            {/* Team Area Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 group transition-colors"
                onClick={() => toggleMenu('teamArea')}
              >
                <div className="flex items-center">
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
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
                      activeComponent === 'teamArea1' 
                        ? 'bg-gray-700 text-teal-300' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }`}
                    onClick={() => onComponentChange('teamArea1')}
                  >
                    <span className="truncate">Team Area 1</span>
                  </button>
                  
                  {/* Team Area 1 Components */}
                  <div className="pl-4 space-y-1">
                    <button
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                        activeComponent === 'teamComponent1' 
                          ? 'bg-gray-700 text-teal-300' 
                          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                      }`}
                      onClick={() => onComponentChange('teamComponent1')}
                    >
                      <span className="truncate">Component 1</span>
                    </button>
                    <button
                      className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                        activeComponent === 'teamComponent2' 
                          ? 'bg-gray-700 text-teal-300' 
                          : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                      }`}
                      onClick={() => onComponentChange('teamComponent2')}
                    >
                      <span className="truncate">Component 2</span>
                    </button>
                  </div>
                  
                  <button
                    className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-md group transition-colors ${
                      activeComponent === 'teamArea2' 
                        ? 'bg-gray-700 text-teal-300' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                    }`}
                    onClick={() => onComponentChange('teamArea2')}
                  >
                    <span className="truncate">Team Area 2</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-800 rounded-lg p-4">
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
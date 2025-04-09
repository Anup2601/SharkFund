// HomeLayout.tsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navebar';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/dashboard';

interface HomeLayoutProps {
  currentUser: {
    name: string;
    email: string;
    profileImage: string;
  };
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ currentUser }) => {
  const [activeComponent, setActiveComponent] = useState<string>('dashboard');
  
  // Function to change active component
  const handleComponentChange = (componentName: string) => {
    setActiveComponent(componentName);
  };
  
  // Render appropriate component based on selection
  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'teamArea1':
        return <div className="p-6"><h2 className="text-2xl font-bold text-teal-300">Team Area 1</h2></div>;
      case 'teamArea2':
        return <div className="p-6"><h2 className="text-2xl font-bold text-teal-300">Team Area 2</h2></div>;
      case 'teamComponent1':
        return <div className="p-6"><h2 className="text-2xl font-bold text-teal-300">Team Component 1</h2></div>;
      case 'teamComponent2':
        return <div className="p-6"><h2 className="text-2xl font-bold text-teal-300">Team Component 2</h2></div>;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar currentUser={currentUser} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onComponentChange={handleComponentChange} activeComponent={activeComponent} />
        
        <main className="flex-1 overflow-y-auto bg-gray-800">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
import React, { useState } from 'react';
import Navbar from '../components/navebar';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/dashboard';
import Profile from '../components/profile';
import FundHistory from '../components/fundhistory';
import Referral from '../components/referral';
import Support from '../components/support';
import Monthly from '../components/Monthly';
import InvestmentLevel from '../components/InvestmentLevel';
import Footer from '../components/Footer';

interface HomeLayoutProps {
  currentUser: {
    name: string;
    email: string;
    profileImage: string;
  };
}



const HomeLayout: React.FC<HomeLayoutProps> = ({ currentUser }) => {
  const [activeComponent, setActiveComponent] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen]= useState<boolean>(false);
  
  // Function to change active component
  const handleComponentChange = (componentName: string) => {
    setActiveComponent(componentName);
    // On small screens, close the sidebar after selection
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
  // Render appropriate component based on selection
  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case "profile":
        return <Profile/>;
      case "deposit":
        return <FundHistory type="deposit"/>;
      case "withdraw":
        return <FundHistory type="withdraw"/>;
      case "myincome":
        return <Monthly/>
      case "mylevel":
        return <InvestmentLevel/>
      case "referral":
        return (
          <>
            <Referral referral={undefined} />
          </>
        );
      case "support":
        return <Support/>;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Navbar currentUser={currentUser} toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
      <div className={`
          md:relative fixed inset-y-0 left-0 z-10 transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out
        `}>
        <Sidebar onComponentChange={handleComponentChange} activeComponent={activeComponent} />
        </div>

         {/* Overlay to close sidebar when clicking outside on mobile */}
         {sidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
            onClick={toggleSidebar}
          ></div>
        )}

        <main className="flex-1 overflow-y-auto bg-gray-800">
          {renderComponent()}
        </main>
      </div>
      <Footer/>
    </div>
  );
};

export default HomeLayout;
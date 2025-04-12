// HomeLayout.tsx
import React, { useState } from 'react';
import Navbar from '../components/navebar';
import Sidebar from '../components/sidebar';
import Dashboard from '../components/dashboard';
import Profile from '../components/profile';
import FundHistory from '../components/fundhistory';
import Referral from '../components/referral';
import Support from '../components/support';

interface HomeLayoutProps {
  currentUser: {
    name: string;
    email: string;
    profileImage: string;
  };
}

const referralData: Referral[] = [
  {
    id: '001',
    login: 'john_doe',
    name: 'John Doe',
    mobile: '9876543210',
    status: 'Active',
    joinDate: '2024-11-01',
    activeDate: '2024-11-15',
  },
  {
    id: '002',
    login: 'jane_smith',
    name: 'Jane Smith',
    mobile: '9123456789',
    status: 'Not Active',
    joinDate: '2024-12-05',
    activeDate: '',
  },
  {
    id: '003',
    login: 'raj_kumar',
    name: 'Raj Kumar',
    mobile: '9988776655',
    status: 'Active',
    joinDate: '2025-01-10',
    activeDate: '2025-01-20',
  },
  {
    id: '004',
    login: 'anita_j',
    name: 'Anita Joshi',
    mobile: '9871122334',
    status: 'Not Active',
    joinDate: '2025-02-14',
    activeDate: '',
  },
  {
    id: '005',
    login: 'siddharth_m',
    name: 'Siddharth Mehra',
    mobile: '9000012345',
    status: 'Active',
    joinDate: '2025-03-05',
    activeDate: '2025-03-15',
  },
];

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
      case "profile":
        return <Profile/>;
      case "deposit":
        return <FundHistory fundHistory={[]} type='deposit'/>;
      case "withdraw":
        return <FundHistory fundHistory={[]} type='withdraw'/>;
      case "referral":
        return <Referral referral={referralData}/>
      case "support":
        return <Support/>;
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
import React, { useState, useEffect } from 'react';
import FundHistory from './fundhistory';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showAddFundHistory, setShowAddFundHistory] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Mocked User Profile Data
  const userProfile = {
    name: "Anup Mishra",
    totalIncome: "$3,450",
    walletBalance: "$1,200",
    totalWithdrawal: "$2,250",
    country: "India",
    joinDate: "2023-05-15",
    activeDate: "2025-04-10",
    referralLink: "https://yourapp.com/referral/abcd1234"
  };

  // Metrics Data (Dashboard)
  const metrics = [
    { title: 'Total Team', value: '125', change: '+15', icon: 'users' },
    { title: 'Active Team', value: '78', change: '+8', icon: 'users' },
    { title: 'Total Referrals', value: '94', change: '+10', icon: 'user-plus' },
    { title: 'Active Referrals', value: '60', change: '+6', icon: 'user-check' },
  ];

  // Mock fund history data
  type FundItem = {
    id: string;
    amount: string;
    status: 'completed' | 'pending' | 'failed';
    date: string;
    method: 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Crypto';
  };
  
    const fundHistory: FundItem[] = [
    { id: "1", amount: "$200", status: "completed", date: "2025-04-09", method: "Credit Card" as const },
    { id: "2", amount: "$150", status: "completed", date: "2025-04-01", method: "PayPal" as const},
    { id: "3", amount: "$300", status: "pending", date: "2025-03-28", method: "Bank Transfer" as const},
    { id: "4", amount: "$100", status: "completed", date: "2025-03-15", method: "Crypto" as const},
    { id: "5", amount: "$250", status: "failed", date: "2025-03-10", method: "Credit Card" as const},
  ];

  const handleAddFund = () => {
    // Here you would integrate with payment gateway
    toast(` 🚧 Adding $${fundAmount} to your wallet. Payment gateway will be integrated in the future.`);
    setFundAmount('');
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'user-plus':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      case 'user-check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };
  
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to your cloud management portal</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-gray-800 overflow-hidden rounded-lg shadow transition-all duration-500 transform hover:scale-105"
            style={{
              opacity: animationProgress === 100 ? 1 : 0,
              transform: `translateY(${animationProgress === 100 ? '0' : '20px'})`,
              transition: `all 0.5s ease-out ${index * 0.1}s`
            }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md p-3 bg-gray-900">
                  {renderIcon(metric.icon)}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      {metric.title}
                    </dt>
                    <dd>
                      <div className="flex items-baseline">
                        <div className="text-2xl font-semibold text-white">
                          {metric.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          metric.change.startsWith('+') ? 'text-teal-400' : 'text-red-400'
                        }`}>
                          {metric.change}
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Card - Redesigned */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* User Profile */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-shadow duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold tracking-wide text-teal-400">
              User Profile
            </h2>
            <div className="px-3 py-1 bg-gray-700 rounded-full text-teal-400 text-sm">
              Active
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Name</div>
              <div className="text-white font-medium mt-1">{userProfile.name}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Total Income</div>
              <div className="text-white font-medium mt-1">{userProfile.totalIncome}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Wallet Balance</div>
              <div className="text-white font-medium mt-1">{userProfile.walletBalance}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Total Withdrawal</div>
              <div className="text-white font-medium mt-1">{userProfile.totalWithdrawal}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Country</div>
              <div className="text-white font-medium mt-1">{userProfile.country}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Join Date</div>
              <div className="text-white font-medium mt-1">{userProfile.joinDate}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg sm:col-span-2">
              <div className="text-gray-400 text-sm">Active Date</div>
              <div className="text-white font-medium mt-1">{userProfile.activeDate}</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-sm text-gray-400 mb-2">Referral Link</div>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                readOnly
                value={userProfile.referralLink}
                className="bg-gray-900 text-teal-400 px-4 py-2 rounded-lg flex-grow shadow-inner text-sm"
              />
              <button
                onClick={() =>{ 
                  navigator.clipboard.writeText(userProfile.referralLink);
                  toast.success('Link copied!');
                }}
                className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-gray-900 py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
        
        {/* Add Fund Card */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
            Add Funds
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Enter Amount
              </label>
              <div className="flex">
                <div className="bg-gray-900 flex items-center px-3 rounded-l-lg border-r border-gray-700">
                  <span className="text-gray-400">$</span>
                </div>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="bg-gray-900 text-white px-4 py-3 rounded-r-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <button
              onClick={handleAddFund}
              disabled={!fundAmount}
              className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                fundAmount
                  ? 'bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-gray-900'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add Funds
            </button>
            
            <button
              onClick={() => {
                const nextState = !showAddFundHistory;
                setShowAddFundHistory(!showAddFundHistory);
                toast.success(`${nextState ? 'Showing' : 'Hiding'} Fund History`);
              }}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300"
            >
              {showAddFundHistory ? 'Hide' : 'View'} Fund History
            </button>
          </div>
        </div>
      </div>
      {showAddFundHistory && <FundHistory fundHistory={fundHistory} type='add' />}
      
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import FundHistory from './fundhistory';
import toast from 'react-hot-toast';
import PaymentOptions from '../components/PaymentOptions';


const Dashboard: React.FC = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showAddFundHistory, setShowAddFundHistory] = useState(false);
  const [fundAmount, setFundAmount] = useState<number>(0);
  const [userProfile, setUserProfile] = useState({
    name: "",
    totalIncome: `₹0`,
    walletBalance: "₹0",
    totalWithdrawal: "₹0",
    country: "",
    joinDate: "",
    activeDate: "",
    referralLink: ""
  });
  const [metrics, setMetrics] = useState([
    { title: 'Total Team', value: '0', change: '+0', icon: 'users' },
    { title: 'Active Team', value: '0', change: '+0', icon: 'users' },
    { title: 'Total Referrals', value: '0', change: '+0', icon: 'user-plus' },
    { title: 'Active Referrals', value: '0', change: '+0', icon: 'user-check' },
  ]);
  
  // Updated to match the FundHistory component interface
  const [fundHistory, setFundHistory] = useState<Array<{
    id: string;
    amount: string;
    date: string;
    method: string;
    status: 'completed' | 'pending' | 'failed';
  }>>([]);
  
  const [loading, setLoading] = useState(true);
  const [fundHistoryLoading, setFundHistoryLoading] = useState(false);
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Retrieve the access token from localStorage
      const accessToken = localStorage.getItem('accessToken');
      
      // Check if the access token exists
      if (!accessToken) {
        console.error('No access token found in localStorage.');
        toast.error('Authentication error. Please login again.');
        setLoading(false);
        return;
      }
      
      try {
        // Fetch both profile and stats data simultaneously
        await Promise.all([
          fetchProfileData(accessToken),
          fetchStatsData(accessToken)
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Connection error. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Existing functions for fetching profile and stats data
  const fetchProfileData = async (accessToken: string) => {
    try {
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        updateProfileWithApiData(data);
      } else {
        console.error('Failed to fetch profile data. Status:', response.status);
        toast.error('Failed to load profile data. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw error;
    }
  };

  const fetchStatsData = async (accessToken: string) => {
    try {
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/stats/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        updateMetricsWithApiData(data);
      } else {
        console.error('Failed to fetch stats data. Status:', response.status);
        toast.error('Failed to load statistics. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching stats data:', error);
      throw error;
    }
  };

  // Modified function to fetch fund history and transform the data for the FundHistory component
  const fetchFundHistory = async () => {
    setFundHistoryLoading(true);
    
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      console.error('No access token found in localStorage.');
      toast.error('Authentication error. Please login again.');
      setFundHistoryLoading(false);
      return;
    }
    
    try {
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/transaction/history/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fund history API response:', data);
        
        const transformedData = (data.results || data || []).map((item: any) => ({
          id: item.transaction_id || item.id || String(Math.random()).substr(2, 8),
          amount: formatCurrency(item.amount || 0),
          date: formatDate(item.created_at || item.date || new Date().toISOString()),
          method: item.payment_method || item.method || 'Bank Transfer',
          status: mapTransactionStatus(item.status || 'completed')
        }));
        
        setFundHistory(transformedData);
      } else {
        console.error('Failed to fetch fund history. Status:', response.status);
        toast.error('Failed to load fund history. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching fund history:', error);
      toast.error('Connection error. Please check your internet connection.');
    } finally {
      setFundHistoryLoading(false);
    }
  };
  
  // Helper function to map API status to component status
  const mapTransactionStatus = (status: string): 'completed' | 'pending' | 'failed' => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'successful':
        return 'completed';
      case 'pending':
      case 'processing':
      case 'in_progress':
        return 'pending';
      case 'failed':
      case 'failure':
      case 'error':
        return 'failed';
      default:
        return 'pending';
    }
  };
  
  // Existing helper functions
  const updateProfileWithApiData = (data: any) => {
    if (data) {
      setUserProfile({
        name: data.username || "User",
        totalIncome: formatCurrency(data.total_income) || "₹0",
        walletBalance: formatCurrency(data.wallet_balance) || "₹0",
        totalWithdrawal: formatCurrency(data.total_withdrawal) || "₹0",
        country: data.country || "India", 
        joinDate: data.join_date ? data.join_date.split("T")[0] : "",
        activeDate: data.activation_date ? data.activation_date.split("T")[0] : "",
        referralLink: data.referralLink || `https://sharkfund.in//ref/auth/${data.username}` 
      });
    }
  };

  const updateMetricsWithApiData = (data: any) => {
    if (data) {
      setMetrics([
        { 
          title: 'Total Team', 
          value: data.total_teams?.toString() || '0', 
          change: formatChange(data.total_team_change) || '+0', 
          icon: 'users' 
        },
        { 
          title: 'Active Team', 
          value: data.active_teams?.toString() || '0', 
          change: formatChange(data.active_team_change) || '+0', 
          icon: 'users' 
        },
        { 
          title: 'Total Referrals', 
          value: data.total_referrals?.toString() || '0', 
          change: formatChange(data.total_referrals_change) || '+0', 
          icon: 'user-plus' 
        },
        { 
          title: 'Active Referrals', 
          value: data.active_referrals?.toString() || '0', 
          change: formatChange(data.active_referrals_change) || '+0', 
          icon: 'user-check' 
        },
      ]);
    }
  };
  
  const formatCurrency = (value: number | string) => {
    if (value === undefined || value === null) return "₹0";
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numberValue) ? "₹0" : `₹${numberValue.toLocaleString()}`;
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    } catch (error) {
      return dateString;
    }
  };
  
  const formatChange = (value: number) => {
    if (value === undefined || value === null) return "+0";
    return value > 0 ? `+${value}` : `${value}`;
  };

  const handleAddFund = () => {
    if (!fundAmount) {
      toast.error('Please enter an amount to add');
      return;
    }
    setShowPaymentForm(true);
  };

  // Toggle fund history visibility and fetch data if needed
  const toggleFundHistory = async () => {
    const nextState = !showAddFundHistory;
    
    if (nextState && fundHistory.length === 0) {
      await fetchFundHistory();
    }
    
    setShowAddFundHistory(nextState);
    toast.success(`${nextState ? 'Showing' : 'Hiding'} Fund History`);
  };

  // Existing icon renderer
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
  
  // Loading state
  if (loading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto"></div>
          <p className="mt-4 text-teal-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Main component render
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to your cloud management portal</p>
      </div>

      {/* Mobile-specific order: User Profile first, Metrics second */}
      <div className="block md:hidden">
        {/* User Card - For Mobile */}
        <div className="grid grid-cols-1 gap-6 mb-10">
          {/* User Profile */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-shadow duration-300 hover:shadow-2xl">
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
                    onChange={(e) => setFundAmount(Number(e.target.value))}
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
                onClick={toggleFundHistory}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300"
              >
                {showAddFundHistory ? 'Hide' : 'View'} Fund History
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards for mobile (after user profile) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
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
      </div>

      {/* Desktop layout (original order): Metrics first, User Profile second */}
      <div className="hidden md:block">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
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
                <div className="text-gray-400 text-sm">Username</div>
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
                    onChange={(e) => setFundAmount(Number(e.target.value))}
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
                onClick={toggleFundHistory}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300"
              >
                {showAddFundHistory ? 'Hide' : 'View'} Fund History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fund History Section */}
      {showAddFundHistory && (
        <div className="mb-10">
          {fundHistoryLoading ? (
            <div className="bg-gray-800 rounded-xl p-6 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
              <p className="ml-3 text-teal-400">Loading fund history...</p>
            </div>
          ) : (
            <FundHistory type="deposit" />
          )}
        </div>
      )}
      <div>
      {showPaymentForm && (
          <PaymentOptions 
            amount={fundAmount} 
            onClose={() => setShowPaymentForm(false)} 
          />
        )}
      </div>

      
      
    </div>
  );
};

export default Dashboard;
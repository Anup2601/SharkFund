import React, { useState, useEffect } from 'react';
import FundHistory from './fundhistory';
import toast from 'react-hot-toast';
import Scanner from '../assets/scanner2.0.png';
import { QrCode, ImagePlus, X, Check, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  

  const [animationProgress, setAnimationProgress] = useState(0);
  const [showAddFundHistory, setShowAddFundHistory] = useState(false);
  const [fundAmount, setFundAmount] = useState<number | undefined>();
  const [paymentMethod, setPaymentMethod] = useState('scan');
  const [uploadedScreenshot, setUploadedScreenshot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dots, setDots] = useState('.');
  const [timeLeft, setTimeLeft] = useState({
  hours: 48,
  minutes: 0,
  seconds: 0
  });

  const [userProfile, setUserProfile] = useState({
    name: "",
    totalIncome: `₹1`,
    walletBalance: "₹3",
    totalWithdrawal: "₹2",
    country: "",
    joinDate: "",
    activeDate: "",
    referralLink: ""
  });
  const [metrics, setMetrics] = useState([
    { title: 'Total Team', value: '1', change: '+1', icon: 'users' },
    { title: 'Active Team', value: '3', change: '+2', icon: 'users' },
    { title: 'Total Referrals', value: '2', change: '+1', icon: 'user-plus' },
    { title: 'Active Referrals', value: '1', change: '+2', icon: 'user-check' },
  ]);

  const bankDetails = {
    PayBYLInk :"https://cfpe.me/sharkfund"
  };

  const [fundHistory, setFundHistory] = useState<Array<{
    id: string;
    amount: string;
    date: string;
    method: string;
    status: 'completed' | 'pending' | 'failed';
  }>>([]);

  const [loading, setLoading] = useState(true);
  const [fundHistoryLoading, setFundHistoryLoading] = useState(false);

  const API_URLS = [
    'https://sharkfund.priyeshpandey.in/api/v1/payments/upload/',
    'https://sharkfund.priyeshpandey.in/api/v1/payments/upload/',
    'https://sharkfund.priyeshpandey.in/api/v1/payments/upload/'
  ];

  // Progressive dots animation effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (submitting) {
      interval = setInterval(() => {
        setDots((prev) => {
          if (prev === '...') return '.';
          if (prev === '..') return '...';
          return '..';
        });
      }, 500);
    } else {
      setDots('.'); 
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [submitting]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer logic
useEffect(() => {
  // Calculate end time (48 hours from now)
  const endTime = new Date();
  endTime.setHours(endTime.getHours() + 48);
  
  const interval = setInterval(() => {
    const now = new Date();
    const difference = endTime.getTime() - now.getTime();
    
    if (difference <= 0) {
      clearInterval(interval);
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    setTimeLeft({ hours, minutes, seconds });
  }, 1000);
  
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('[FetchData] No access token found in localStorage.');
        toast.error('Authentication error. Please login again.');
        setLoading(false);
        return;
      }
      try {
        await Promise.all([
          fetchProfileData(accessToken),
          fetchStatsData(accessToken)
        ]);
      } catch (error) {
        console.error('[FetchData] Error fetching data:', error);
        toast.error('Connection error. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchProfileData = async (accessToken: string) => {
    try {
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const responseText = await response.text();
      console.log('[FetchProfile] Response:', response.status, responseText);
      if (response.ok) {
        const data = JSON.parse(responseText);
        updateProfileWithApiData(data);
      } else {
        console.error('[FetchProfile] Failed to fetch profile data. Status:', response.status);
        toast.error('Failed to load profile data. Please try again.');
      }
    } catch (error) {
      console.error('[FetchProfile] Error:', error);
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
      const responseText = await response.text();
      console.log('[FetchStats] Response:', response.status, responseText);
      if (response.ok) {
        const data = JSON.parse(responseText);
        updateMetricsWithApiData(data);
      } else {
        console.error('[FetchStats] Failed to fetch stats data. Status:', response.status);
        toast.error('Failed to load statistics. Please try again.');
      }
    } catch (error) {
      console.error('[FetchStats] Error:', error);
      throw error;
    }
  };

  const fetchFundHistory = async () => {
    setFundHistoryLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('[FetchFundHistory] No access token found in localStorage.');
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
      const responseText = await response.text();
      console.log('[FetchFundHistory] Response:', response.status, responseText);
      if (response.ok) {
        const data = JSON.parse(responseText);
        const transformedData = (data.results || data || []).map((item: any) => ({
          id: item.transaction_id || item.id || String(Math.random()).substr(2, 8),
          amount: formatCurrency(item.amount || 0),
          date: formatDate(item.created_at || item.date || new Date().toISOString()),
          method: item.payment_method || item.method || 'Bank Transfer',
          status: mapTransactionStatus(item.status || 'completed')
        }));
        setFundHistory(transformedData);
      } else {
        console.error('[FetchFundHistory] Failed to fetch fund history. Status:', response.status);
        toast.error('Failed to load fund history. Please try again.');
      }
    } catch (error) {
      console.error('[FetchFundHistory] Error:', error);
      toast.error('Connection error. Please check your internet connection.');
    } finally {
      setFundHistoryLoading(false);
    }
  };

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
        referralLink: data.referralLink || `https://sharkfund.in/ref/auth/${data.username}`
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
      return date.toISOString().split('T')[0];
    } catch (error) {
      return dateString;
    }
  };

  const formatChange = (value: number) => {
    if (value === undefined || value === null) return "+0";
    return value > 0 ? `+${value}` : `${value}`;
  };

  const handleAddFund = async () => {
    if (submitting) {
      console.warn('[AddFund] Submission already in progress');
      return;
    }
    if ((paymentMethod === 'scan' || paymentMethod === 'bank') && !uploadedScreenshot) {
      console.warn('[AddFund] No screenshot uploaded');
      toast.error('Please upload payment screenshot');
      return;
    }
    if (!fundAmount || fundAmount <= 0) {
      console.warn('[AddFund] Invalid fund amount:', fundAmount);
      toast.error('Please enter a valid fund amount');
      return;
    }

    setSubmitting(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('[AddFund] No access token found in localStorage');
        toast.error('Please log in to submit payment');
        return;
      }
      console.log('[AddFund] Access token found:', accessToken.slice(0, 20) + '...');

      const base64Response = await fetch(uploadedScreenshot!);
      const blob = await base64Response.blob();
      console.log('[AddFund] Converted screenshot to blob:', blob.type, blob.size);

      const file = new File([blob], `payment_screenshot_${Date.now()}.jpg`, { type: 'image/jpeg' });
      const formData = new FormData();
      formData.append('amount', fundAmount.toString());
      formData.append('screenshot', file);

      console.log('[AddFund] Preparing FormData:');
      console.log(`- amount: ${fundAmount}`);
      console.log(`- screenshot: ${file.name}, ${file.size} bytes`);

      for (const url of API_URLS) {
        console.log(`[AddFund] Attempting to send request to: ${url}`);
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
            body: formData,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          const responseText = await response.text();
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${responseText}`);
          }

          const result = JSON.parse(responseText);
          toast.success(result.message || 'Payment will be updated soon on the dashboard');
          setUploadedScreenshot(null);
          setFundAmount(undefined);
          setPaymentMethod('scan');
          await fetchFundHistory();
          return;
        } catch (error) {
          if (error instanceof Error) {
            console.error(`[AddFund] Error with ${url}:`, error.message);
          } else {
            console.error(`[AddFund] Error with ${url}:`, error);
          }
          if (url === API_URLS[API_URLS.length - 1]) {
            throw error;
          }
          console.log('[AddFund] Trying next URL...');
        }
      }
    } catch (error) {
      console.error('[AddFund] Final error:', error);
      toast.error(
        `Failed to submit payment: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      console.log(`[FileUpload] Selected file: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
      if (!file.type.includes('image/')) {
        console.error('[FileUpload] Invalid file type');
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.error('[FileUpload] File size exceeds 5MB limit');
        toast.error('File size must not exceed 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          console.log('[FileUpload] File read successfully as Data URL');
          setUploadedScreenshot(event.target.result as string);
          toast.success('Screenshot uploaded!');
        }
      };
      reader.onerror = () => {
        console.error('[FileUpload] Failed to read file');
        toast.error('Failed to read file');
      };
      reader.readAsDataURL(file);
    } else {
      console.warn('[FileUpload] No file selected');
    }
  };

  const resetScreenshot = () => {
    console.log('[ResetScreenshot] Clearing uploaded screenshot');
    setUploadedScreenshot(null);
  };

  const toggleFundHistory = async () => {
    const nextState = !showAddFundHistory;
    if (nextState && fundHistory.length === 0) {
      await fetchFundHistory();
    }
    setShowAddFundHistory(nextState);
    toast.success(`${nextState ? 'Showing' : 'Hiding'} Fund History`);
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

  const renderScreenshotUpload = () => (
    <div className="mt-4">
      {uploadedScreenshot ? (
        <div className="text-center">
          <div className="relative w-48 h-48 mx-auto mb-2">
            <img
              src={uploadedScreenshot}
              alt="Payment Screenshot"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={resetScreenshot}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex items-center justify-center text-teal-400 text-sm">
            <Check size={16} className="mr-1" />
            <span>Screenshot uploaded</span>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <label className="cursor-pointer flex flex-col items-center justify-center bg-gray-800 border border-dashed border-gray-600 rounded-lg p-4 hover:bg-gray-700 transition-colors">
            <ImagePlus className="h-8 w-8 text-teal-400 mb-2" />
            <span className="text-sm text-gray-300">Upload payment screenshot</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );

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

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard (Version 1.2)</h1>
        <p className="text-gray-400 mt-1">Welcome to your cloud management portal</p>
      </div>

      <div className="block md:hidden">
        <div className="grid grid-cols-1 gap-6 mb-10">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-shadow duration-300 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-wide text-teal-400">
                User Profile
              </h2>
              {/* <div className="px-3 py-1 bg-gray-700 rounded-full text-teal-400 text-sm">
                Active
              </div> */}
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
                  onClick={() => {
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
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
              Add Funds
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={fundAmount || ''}
                  onChange={(e) => setFundAmount(parseFloat(e.target.value) || undefined)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <div className="flex mb-4">
                  <button
                    onClick={() => {
                      setPaymentMethod('scan');
                      resetScreenshot();
                    }}
                    className={`flex-1 py-2 px-2 rounded-l-lg font-medium transition-all duration-300 flex items-center justify-center ${
                      paymentMethod === 'scan'
                        ? 'bg-teal-500 text-gray-900'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <QrCode size={16} className="mr-1" />
                    <span className="text-xs sm:text-sm">Scan to Pay</span>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('bank');
                      resetScreenshot();
                    }}
                    className={`flex-1 py-2 px-2 rounded-r-lg font-medium transition-all duration-300 flex items-center justify-center ${
                      paymentMethod === 'bank'
                        ? 'bg-teal-500 text-gray-900'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Building size={16} className="mr-1" />
                    <span className="text-xs sm:text-sm">Bank Payment</span>
                  </button>
                </div>
                {paymentMethod === 'scan' && (
                  <div className="mt-4">
                    <div className="text-center p-4">
                      <div className="bg-white p-2 rounded-lg mx-auto w-48 h-48 mb-3 flex items-center justify-center relative">
                        <img
                          src={Scanner}
                          alt="QR Code"
                          className="w-48 h-48 mr-1 inline-block "
                        />
                         
                       
                      </div>
                      <p className="text-sm text-gray-400 mb-3 ">
                        Scan the QR code and upload payment screenshot
                      </p>
                    </div>
                    {renderScreenshotUpload()}
                  </div>
                )}
                {paymentMethod === 'bank' && (
                  <div className="mt-4">
                    <div className="bg-gray-800 p-4 rounded-lg mb-4">
                      <h3 className="text-teal-400 text-md font-medium mb-3">Bank Details</h3>
                      <div className="space-y-2 text-sm">
                        {/* <div className="flex justify-between">
                          <span className="text-gray-400">Account Holder:</span>
                          <span className="text-white">{bankDetails.accountHolder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Number:</span>
                          <span className="text-white">{bankDetails.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bank Name:</span>
                          <span className="text-white">{bankDetails.bankName}</span>
                        </div> */}
                        
                        <div className="flex justify-between">
                          <Link to="https://cfpe.me/sharkfund"><span className="text-gray-400">IFSC Code:</span></Link>
                          <span className="text-gray-400">Pay Here</span>
                          {/* <span className="text-white">{bankDetails.PayBYLInk}</span> */}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 text-center">
                      Make a transfer and upload payment screenshot
                    </p>
                    {renderScreenshotUpload()}
                  </div>
                )}
              </div>
              <button
                onClick={handleAddFund}
                disabled={!fundAmount || !uploadedScreenshot || submitting}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                  fundAmount && uploadedScreenshot && !submitting
                    ? 'bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-gray-900'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-75'
                }`}
              >
                {submitting ? (
                  <span>Submitting{dots}</span>
                ) : (
                  'Submit Payment'
                )}
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

      <div className="hidden md:block">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-shadow duration-300 hover:shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-wide text-teal-400">
                User Profile
              </h2>
              {/* <div className="px-3 py-1 bg-gray-700 rounded-full text-teal-400 text-sm">
                Active
              </div> */}
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
                  onClick={() => {
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
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
              Add Funds
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={fundAmount || ''}
                  onChange={(e) => setFundAmount(parseFloat(e.target.value) || undefined)}
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <div className="flex mb-4">
                  <button
                    onClick={() => {
                      setPaymentMethod('scan');
                      resetScreenshot();
                    }}
                    className={`flex-1 py-2 px-2 rounded-l-lg font-medium transition-all duration-300 flex items-center justify-center ${
                      paymentMethod === 'scan'
                        ? 'bg-teal-500 text-gray-900'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <QrCode size={16} className="mr-1" />
                    <span className="text-xs sm:text-sm">Scan to Pay</span>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('bank');
                      resetScreenshot();
                    }}
                    className={`flex-1 py-2 px-2 rounded-r-lg font-medium transition-all duration-300 flex items-center justify-center ${
                      paymentMethod === 'bank'
                        ? 'bg-teal-500 text-gray-900'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Building size={16} className="mr-1" />
                    <span className="text-xs sm:text-sm">Bank Payment</span>
                  </button>
                </div>
                {paymentMethod === 'scan' && (
                  <div className="mt-4">
                    <div className="text-center p-4">
                      <div className="bg-white p-2 rounded-lg mx-auto w-48 h-48 mb-3 flex items-center justify-center relative">
                        <img
                          src={Scanner}
                          alt="QR Code"
                          className="w-48 h-48 mr-1 inline-block "
                        />
                         
                        
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        Scan the QR code and upload payment screenshot
                      </p>
                    </div>
                    {renderScreenshotUpload()}
                  </div>
                )}
                {paymentMethod === 'bank' && (
                  <div className="mt-4">
                    <div className="bg-gray-800 p-4 rounded-lg mb-4">
                      <h3 className="text-teal-400 text-md font-medium mb-3">Bank Details</h3>
                      <div className="space-y-2 text-sm">
                        {/* <div className="flex justify-between">
                          <span className="text-gray-400">Account Holder:</span>
                          <span className="text-white">{bankDetails.accountHolder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Account Number:</span>
                          <span className="text-white">{bankDetails.accountNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Bank Name:</span>
                          <span className="text-white">{bankDetails.bankName}</span>
                        </div> */}
                        <div className="flex justify-between">
                          <Link to="https://cfpe.me/sharkfund"><span className="text-gray-400">Pay Here</span></Link>
                          {/* <span className="text-gray-400">IFSC Code:</span> */}
                          {/* <span className="text-white">{bankDetails.PayBYLInk}</span> */}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 text-center">
                      Make a transfer and upload payment screenshot
                    </p>
                    {renderScreenshotUpload()}
                  </div>
                )}
              </div>
              <button
                onClick={handleAddFund}
                disabled={!fundAmount || !uploadedScreenshot || submitting}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                  fundAmount && uploadedScreenshot && !submitting
                    ? 'bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-gray-900'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-75'
                }`}
              >
                {submitting ? (
                  <span>Submitting{dots}</span>
                ) : (
                  'Submit Payment'
                )}
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

      {showAddFundHistory && (
        <div className="bg-gray-800 rounded-xl shadow-lg">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleFundHistory}
              className="text-gray-400 hover:text-teal-400"
            >
              <X size={20} />
            </button>
          </div>
          {fundHistoryLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-400"></div>
            </div>
          ) : (
            <FundHistory type='deposit' />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
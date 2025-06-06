import React, { useEffect, useState } from "react";
import axios from "axios";
import Start_Investor from "../assets/level-1.png"
import Beginner from "../assets/level-0.png"
import Advanced_Investor from "../assets/level-2.png"
import Eliter_Investor from "../assets/level-3.png"

const InvestmentLevel: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<{
    level: number;
    image: string;
    label: string;
    color: string;
    total_deposit: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurrentInvestmentLevel();
  }, []);

  const fetchCurrentInvestmentLevel = async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No authentication token found. Please log in.");
      }

      // Fetch the latest monthly earnings data
      const response = await axios.get('https://sharkfund.priyeshpandey.in/api/v1/profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      
      if (!response.data || typeof response.data !== 'object') {
      throw new Error("Invalid data received from the server.");
    }
    const latestMonthData = response.data;
      
      // Determine the level based on the monthly payout
      const levelData = determineLevel(latestMonthData.total_deposit);
      
      // Set the current level with all relevant information
      setCurrentLevel({
        ...levelData,
        total_deposit: latestMonthData.total_deposit
      });
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else if (err.response?.status === 404) {
          setError("Endpoint not found. Please check the API URL.");
        } else {
          setError(err.response?.data?.detail || "Failed to fetch investment level data.");
        }
      } else {
        setError((err as Error).message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const determineLevel = (payout: string): { level: number; image: string; label: string; color: string } => {
    const payoutValue = typeof payout === 'string' ? parseFloat(payout.replace(/[^0-9.]/g, '')) : payout;
    
    if (payoutValue >= 3000) {
      return { 
        level: 3, 
        image: Eliter_Investor, 
        label: "Level 3 - Elite Investor",
        color: "text-purple-400"
      };
    } else if (payoutValue >= 2000) {
      return { 
        level: 2, 
        image: Advanced_Investor, 
        label: "Level 2 - Advanced Investor",
        color: "text-blue-400"
      };
    } else if (payoutValue >= 1000) {
      return { 
        level: 1, 
        image: Start_Investor, 
        label: "Level 1 - Starter Investor",
        color: "text-green-400"
      };
    } else {
      return { 
        level: 0, 
        image: Beginner, 
        label: "Beginner",
        color: "text-gray-400"
      };
    }
  };

  const retryFetch = () => {
    fetchCurrentInvestmentLevel();
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white mb-10 transition-all duration-500">
      <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
        Your Investment Level
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="text-center text-yellow-400 mb-4">
              <p>{error}</p>
              <button
                onClick={retryFetch}
                className="mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {!error && !currentLevel && (
            <div className="text-center text-gray-400 py-4">
              No investment level data available.
            </div>
          )}

          {!error && currentLevel && (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative mb-6">
                <img 
                  src={currentLevel.image} 
                  alt={`Level ${currentLevel.level}`} 
                  className="w-64 h-64 rounded-full "
                />
              </div>
              
              <h3 className={`text-2xl font-bold mb-2 ${currentLevel.color}`}>
                {currentLevel.label}
              </h3>
              
              <p className="text-gray-300 mb-4">
                Invested Amount: <span className="font-semibold">{currentLevel.total_deposit}</span>
              </p>
              
              
              <div className="w-full max-w-md bg-gray-700 rounded-full h-4 mt-4">
                <div 
                  className={`h-4 rounded-full ${
                    currentLevel.level === 3 ? 'bg-purple-400' : 
                    currentLevel.level === 2 ? 'bg-blue-400' : 
                    currentLevel.level === 1 ? 'bg-green-400' : 
                    'bg-gray-500'
                  }`}
                  style={{ width: `${Math.min(100, (currentLevel.level / 3) * 100)}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between w-full max-w-md mt-2 px-2 text-xs text-gray-400">
                <span>Beginner</span>
                <span>Level 1</span>
                <span>Level 2</span>
                <span>Level 3</span>
              </div>
              
              {currentLevel.level < 3 && (
                <div className="mt-6 text-center">
                  <p className="text-gray-300 mb-2">
                    {currentLevel.level === 0 && "You need ₹1,000+ Investment to reach Level 1"}
                    {currentLevel.level === 1 && "You need ₹2,000+ Investment to reach Level 2"}
                    {currentLevel.level === 2 && "You need ₹3,000+ Investment to reach Level 3"}
                  </p>
                  <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">
                    Upgrade Your Investment
                  </button>
                </div>
              )}
              
              {currentLevel.level === 3 && (
                <div className="mt-6 text-center">
                  <p className="text-purple-300 font-semibold">
                    Congratulations! You've reached the Elite Investor level!
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InvestmentLevel;
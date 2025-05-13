import React, { useState, useEffect } from "react";

interface EarningStats {
  totalEarnings: string;
  monthlyEarnings: string;
  monthlyPayout: string;
  level: number;
  batch: string;
}

interface LevelData {
  level: string;
  monthlyPayout: string;
  monthlyEarned: string;
  totalEarned: string;
}

const EarningsDashboard: React.FC = () => {
  const [stats, setStats] = useState<EarningStats>({
    totalEarnings: "0",
    monthlyEarnings: "0",
    monthlyPayout: "0",
    level: 1,
    batch: "Bronze"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessToken = localStorage.getItem('accessToken');

  // Level data from the provided table
  const levelsData: LevelData[] = [
    { level: "1st", monthlyPayout: "₹200", monthlyEarned: "₹200", totalEarned: "₹200" },
    { level: "2nd", monthlyPayout: "₹500", monthlyEarned: "₹500", totalEarned: "₹700" },
    { level: "3rd", monthlyPayout: "₹1,000", monthlyEarned: "₹1,000", totalEarned: "₹1,700" },
    { level: "4th", monthlyPayout: "₹2,000", monthlyEarned: "₹2,000", totalEarned: "₹3,700" },
    { level: "5th", monthlyPayout: "₹3,000", monthlyEarned: "₹3,000", totalEarned: "₹6,700" },
    { level: "6th", monthlyPayout: "₹5,000", monthlyEarned: "₹5,000", totalEarned: "₹11,700" },
    { level: "7th", monthlyPayout: "₹6,000", monthlyEarned: "₹6,000", totalEarned: "₹17,700" },
    { level: "8th", monthlyPayout: "₹7,000", monthlyEarned: "₹7,000", totalEarned: "₹24,700" },
    { level: "9th", monthlyPayout: "₹10,300", monthlyEarned: "₹10,300", totalEarned: "₹35,000" },
  ];

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual earnings API endpoint
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/earnings/stats/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch earnings data: ${response.status}`);
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching earnings data:', err);
      setError('Failed to load earnings data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    fetchEarningsData();
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
        </div>
      ) : error ? (
        <div className="text-center py-6 text-red-400 bg-gray-800 rounded-xl shadow-lg p-6">
          <p>{error}</p>
          <button 
            onClick={retryFetch}
            className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Earnings Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-all duration-500 hover:shadow-teal-500/20">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Total Earnings</h3>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-teal-400">₹{stats.totalEarnings}</span>
              </div>
            </div>

            {/* Monthly Earnings Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-all duration-500 hover:shadow-teal-500/20">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Monthly Earnings</h3>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-teal-400">₹{stats.monthlyEarnings}</span>
              </div>
            </div>

            {/* Monthly Payout Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-all duration-500 hover:shadow-teal-500/20">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Monthly Payout</h3>
              <div className="flex items-end">
                <span className="text-2xl font-bold text-teal-400">₹{stats.monthlyPayout}</span>
              </div>
            </div>

            {/* Level & Batch Card */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-all duration-500 hover:shadow-teal-500/20">
              <h3 className="text-gray-400 text-sm font-medium mb-2">Current Level & Batch</h3>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-teal-400">Level {stats.level}</span>
                <span className="text-lg font-medium text-yellow-400">({stats.batch})</span>
              </div>
            </div>
          </div>

          {/* Level Earnings Table */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white transition-all duration-500">
            <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">Level Earnings Chart</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="pb-3 px-4">Mahina</th>
                    <th className="pb-3 px-4">Monthly Payout</th>
                    <th className="pb-3 px-4">Is Mahine Mila</th>
                    <th className="pb-3 px-4">Ab Tak Total Mila</th>
                  </tr>
                </thead>
                <tbody>
                  {levelsData.map((level, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-700 hover:bg-gray-700 ${stats.level === index + 1 ? 'bg-gray-700' : ''}`}
                    >
                      <td className="py-4 px-4 font-medium">{level.level}</td>
                      <td className="py-4 px-4 font-medium">{level.monthlyPayout}</td>
                      <td className="py-4 px-4 font-medium">{level.monthlyEarned}</td>
                      <td className="py-4 px-4 font-medium">{level.totalEarned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EarningsDashboard;
import React, { useState, useEffect } from "react";

const accessToken = localStorage.getItem('accessToken');

interface FundItem {
  serial_number: string;
  amount: string;
  timestamp: string;
  method: string;
  status: 'Completed' | 'Pending' | 'failed';
}

const sampleFundHistory: FundItem[] = [
  {
    serial_number: "TXN123456",
    amount: "₹2,000",
    timestamp: "2025-03-10T14:22:00",
    method: "UPI",
    status: "Completed",
  },
  {
    serial_number: "TXN123457",
    amount: "₹1,500",
    timestamp: "2025-03-12T09:45:00",
    method: "Bank Transfer",
    status: "Pending",
  },
  {
    serial_number: "TXN123458",
    amount: "₹3,200",
    timestamp: "2025-03-14T17:30:00",
    method: "Wallet",
    status: "failed",
  },
];

interface FundHistoryProps {
  initialFundHistory?: FundItem[];
  type: "add" | "withdraw" | "deposit";
}

const FundHistory: React.FC<FundHistoryProps> = ({ initialFundHistory, type }) => {
  const [fundHistory, setFundHistory] = useState<FundItem[]>(initialFundHistory || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title =
    type === 'add' ? 'Add Fund History' :
    type === 'deposit' ? 'Deposit Fund History' :
    'Withdraw Fund History';

  useEffect(() => {
    if (type === 'withdraw') {
      fetchWithdrawalHistory();
    } else if (type === 'deposit') {
      fetchDepositHistory();
    } else if (type === 'add') {
      // console.log("Using sample data for type: add");
      setFundHistory(sampleFundHistory);
    }
  }, [type]);

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/withdrawal/history/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch withdrawal history: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched withdrawal history:", data);
      setFundHistory(data);
    } catch (err) {
      console.error('Error fetching withdrawal history:', err);
      setError('Failed to load withdrawal history. Showing sample data.');
      setFundHistory(sampleFundHistory);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepositHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      // Purposely using broken URL for testing fallback
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/transaction/history/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch deposit history: ${response.status}`);
      }

      const data = await response.json();
      setFundHistory(data);
    } catch (err) {
      console.error('Error fetching deposit history:', err);
      setError('Failed to load deposit history. Showing sample data.');
      setFundHistory(sampleFundHistory);
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    if (type === 'withdraw') {
      fetchWithdrawalHistory();
    } else if (type === 'deposit') {
      fetchDepositHistory();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white mb-10 transition-all duration-500">
      <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
        {title}
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
        </div>
      ) : error ? (
        <div className="text-center py-6 text-red-400">
          <p>{error}</p>
          <button 
            onClick={retryFetch}
            className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : fundHistory.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p>No {type} history available.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 px-2">ID</th>
                <th className="pb-3 px-2">Amount</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Method</th>
                <th className="pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {fundHistory.map((item) => (
                <tr key={item.serial_number} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-4 px-2">{item.serial_number}</td>
                  <td className="py-4 px-2">{item.amount}</td>
                  <td className="py-4 px-2">{item.timestamp.split("T")[0]}</td>
                  <td className="py-4 px-2">{item.method}</td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Completed'
                          ? 'bg-green-900 text-green-300'
                          : item.status === 'Pending'
                          ? 'bg-yellow-900 text-yellow-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FundHistory;

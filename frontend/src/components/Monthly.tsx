import React, { useEffect, useState } from "react";
import axios from "axios";

interface MonthlyIncomeItem {
  month: string;
  monthlyPayout: string;
  monthlyIncome: string;
  totalIncome: string;
}

const MonthlyIncomeHistory: React.FC = () => {
  const [incomeHistory, setIncomeHistory] = useState<MonthlyIncomeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  const fetchMonthlyIncome = async () => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.get("http://sharkfund.priyeshpandey.in/api/v1/earnings/monthly/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Ensure the response data is an array
      if (!Array.isArray(response.data)) {
        throw new Error("Unexpected response format: Data should be an array.");
      }

      setIncomeHistory(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else if (err.response?.status === 404) {
          setError("Endpoint not found. Please check the API URL.");
        } else {
          setError(err.response?.data?.detail || "Failed to fetch monthly income data.");
        }
      } else {
        setError(
          typeof err === "object" && err !== null && "message" in err
            ? String((err as { message?: unknown }).message)
            : "An unexpected error occurred."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    fetchMonthlyIncome();
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white mb-10 transition-all duration-500">
      <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
        Monthly Income History
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
                Retry Fetch
              </button>
            </div>
          )}

          {!error && incomeHistory.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No monthly income data available.
            </div>
          )}

          {!error && incomeHistory.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="pb-3 px-2">Month</th>
                    <th className="pb-3 px-2">Monthly Payout</th>
                    <th className="pb-3 px-2">Monthly Income</th>
                    <th className="pb-3 px-2">Total Income</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeHistory.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-4 px-2">{item.month}</td>
                      <td className="py-4 px-2">{item.monthlyPayout}</td>
                      <td className="py-4 px-2">{item.monthlyIncome}</td>
                      <td className="py-4 px-2">{item.totalIncome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MonthlyIncomeHistory;
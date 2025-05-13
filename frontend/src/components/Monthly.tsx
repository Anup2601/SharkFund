import React, { useEffect, useState } from "react";

const accessToken = localStorage.getItem("accessToken");

interface MonthlyIncomeItem {
  month: string;
  monthlyPayout: string;
  monthlyIncome: string;
  totalIncome: string;
  level: number;
  batch: string;
}

const sampleData: MonthlyIncomeItem[] = [
  {
    month: "January 2025",
    monthlyPayout: "₹5,000",
    monthlyIncome: "₹8,000",
    totalIncome: "₹8,000",
    level: 1,
    batch: "Bronze",
  },
  {
    month: "February 2025",
    monthlyPayout: "₹6,500",
    monthlyIncome: "₹9,000",
    totalIncome: "₹17,000",
    level: 2,
    batch: "Silver",
  },
  {
    month: "March 2025",
    monthlyPayout: "₹8,000",
    monthlyIncome: "₹11,000",
    totalIncome: "₹28,000",
    level: 3,
    batch: "Gold",
  },
];

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

      const response = await fetch("https://sharkfund.priyeshpandey.in/api/v1/earnings/monthly/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      setIncomeHistory(data);
    } catch (err) {
      console.error("Error fetching data. Using sample fallback:", err);
      setError("Failed to load data. Showing sample information.");
      setIncomeHistory(sampleData);
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="pb-3 px-2">Month</th>
                  <th className="pb-3 px-2">Monthly Payout</th>
                  <th className="pb-3 px-2">Monthly Income</th>
                  <th className="pb-3 px-2">Total Income</th>
                  <th className="pb-3 px-2">Level</th>
                  <th className="pb-3 px-2">Batch</th>
                </tr>
              </thead>
              <tbody>
                {incomeHistory.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-4 px-2">{item.month}</td>
                    <td className="py-4 px-2">{item.monthlyPayout}</td>
                    <td className="py-4 px-2">{item.monthlyIncome}</td>
                    <td className="py-4 px-2">{item.totalIncome}</td>
                    <td className="py-4 px-2">{item.level}</td>
                    <td className="py-4 px-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.batch === "Gold"
                            ? "bg-yellow-900 text-yellow-300"
                            : item.batch === "Silver"
                            ? "bg-gray-700 text-gray-300"
                            : item.batch === "Bronze"
                            ? "bg-orange-900 text-orange-300"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {item.batch}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyIncomeHistory;

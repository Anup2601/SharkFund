import React, { useState, useEffect } from "react";

const WithdrawSection = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/profile/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile data: ${response.status}`);
      }

      const data = await response.json();
      setWalletBalance(data.wallet_balance || 0);
      setTotalWithdrawal(data.total_withdrawal || 0);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to load wallet information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Convert to number for comparison
    const amountToWithdraw = parseFloat(withdrawAmount);
    
    // Basic frontend validation
    if (!amountToWithdraw || amountToWithdraw <= 0) {
      setError("Please enter a valid withdrawal amount");
      return;
    }
    
    if (amountToWithdraw > walletBalance) {
      setError("Insufficient balance in your wallet");
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/withdrawal/request/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountToWithdraw
        })
      });
      
      const responseData = await response.json(); // Parse response JSON

      if (!response.ok) {
        // Handle backend validation errors
        if (responseData.non_field_errors) {
          // Display the first non_field_error from the backend
          setError(responseData.non_field_errors[0]);
        } else if (responseData.detail) {
          // Handle other possible error formats (e.g., authentication issues)
          setError(responseData.detail);
        } else {
          // Fallback for unexpected error formats
          setError('Failed to process withdrawal request. Please try again.');
        }
        throw new Error(`Withdrawal request failed: ${response.status}`);
      }
      
      // Success case
      setSuccessMessage(`Withdrawal request for ₹${amountToWithdraw} submitted successfully! Transaction ID: ${responseData.transaction_id}`);
      setWithdrawAmount("");
      
      // Refresh profile data to get updated wallet balance
      fetchProfileData();
      
    } catch (err) {
      console.error('Error submitting withdrawal request:', err);
      if (!error) {
        // Fallback error if no specific error was set
        setError('Failed to process withdrawal request. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white mb-10 transition-all duration-500">
      <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
        Withdraw Funds
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Wallet Balance</div>
              <div className="text-2xl font-bold text-teal-400">₹{walletBalance.toLocaleString()}</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Total Withdrawals</div>
              <div className="text-2xl font-bold text-teal-400">₹{totalWithdrawal.toLocaleString()}</div>
            </div>
          </div>

          <form onSubmit={handleWithdrawSubmit}>
            <div className="mb-6">
              <label htmlFor="withdrawAmount" className="block text-gray-400 mb-2">
                Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                id="withdrawAmount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter amount to withdraw"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                <strong>Notice:</strong> {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-green-900/50 border border-green-700 text-green-300 rounded-lg">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full rounded-lg py-3 px-4 font-medium ${
                submitting 
                  ? "bg-gray-600 cursor-not-allowed" 
                  : "bg-teal-600 hover:bg-teal-700 transition-colors"
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                  Processing...
                </span>
              ) : (
                "Request Withdrawal"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WithdrawSection;
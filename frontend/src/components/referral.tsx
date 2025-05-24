import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Referral {
  id: string;
  login: string;
  name: string;
  mobile: string;
  status: 'Active' | 'Not Active';
  joinDate: string;
}

interface ReferralProps {
  referral?: Referral;
}

const Referral: React.FC<ReferralProps> = ({ }) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        // Make the API request with Axios
        const response = await axios.get('https://sharkfund.priyeshpandey.in/api/v1/my-referrals/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('API Response:', response.data);

        // Map the API response to the Referral interface
        const mappedReferrals: Referral[] = response.data.map((item: any) => ({
          id: item.username, 
          login: item.username,
          name: item.name,
          mobile: item.mobile_number,
          joinDate: new Date(item.join_date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          status: item.status === 'Inactive' ? 'Not Active' : 'Active', 
        }));

        setReferrals(mappedReferrals);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.detail || 'Failed to fetch referrals. Please try again.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []); 

  if (loading) {
    return <div className="text-white">Loading referrals...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white mb-10 transition-all duration-500">
      <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
        My Referral
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-3 px-2">S.No.</th> 
              <th className="pb-3 px-2">Login Id</th>
              <th className="pb-3 px-2">Name</th>
              <th className="pb-3 px-2">Mobile No.</th>
              <th className="pb-3 px-2">Join Date</th>
              <th className="pb-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-4 px-2">{index + 1}</td>
                <td className="py-4 px-2">{item.login}</td>
                <td className="py-4 px-2">{item.name}</td>
                <td className="py-4 px-2">{item.mobile}</td>
                <td className="py-4 px-2">{item.joinDate}</td>
                {/* <td className="py-4 px-2">{item.activeDate}</td> */}
                <td className="py-4 px-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Active'
                        ? 'bg-green-900 text-green-300'
                        : item.status === 'Not Active'
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
    </div>
  );
};

export default Referral;
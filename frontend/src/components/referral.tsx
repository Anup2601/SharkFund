interface Referral {
    id: string;
    login: string;
    name: string;
    mobile: string;
    status: 'Active' | 'Not Active';
    joinDate: string;
    activeDate: string;
  }

  interface ReferralIdProps {
    referral: Referral[];
    
  }
  
  const Referral: React.FC<ReferralIdProps> = ({ referral}) => {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white mb-10 transition-all duration-500">
        <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
          My Referral
        </h2>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3 px-2">ID</th>
                <th className="pb-3 px-2">Login Id</th>
                <th className="pb-3 px-2">Name</th>
                <th className="pb-3 px-2">Mobile No.</th>
                <th className="pb-3 px-2">Join Date</th>
                <th className="pb-3 px-2">Active Date</th>
                <th className="pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {referral.map((item) => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-4 px-2">{item.id}</td>
                  <td className="py-4 px-2">{item.login}</td>
                  <td className="py-4 px-2">{item.name}</td>
                  <td className="py-4 px-2">{item.mobile}</td>
                  {/* <td className="py-4 px-2">{item.status}</td> */}
                  <td className="py-4 px-2">{item.joinDate}</td>
                  <td className="py-4 px-2">{item.activeDate}</td>
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
  
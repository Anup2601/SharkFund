interface FundItem {
    id: string;
    amount: string;
    date: string;
    method: string;
    status: 'completed' | 'pending' | 'failed';
  }
  
  interface FundHistoryProps {
    fundHistory: FundItem[];
    type: "add"| "withdraw" | "deposit";
  }
  
  const FundHistory: React.FC<FundHistoryProps> = ({ fundHistory ,type }) => {
    const title =
    type === 'add' ? 'Add Fund History' : type === 'deposit' ? 'Deposit Fund History' : 'Withdraw Fund History';
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 text-white mb-10 transition-all duration-500">
        <h2 className="text-xl font-bold tracking-wide text-teal-400 mb-6">
          {title}
        </h2>
  
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
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-4 px-2">{item.id}</td>
                  <td className="py-4 px-2">{item.amount}</td>
                  <td className="py-4 px-2">{item.date}</td>
                  <td className="py-4 px-2">{item.method}</td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'completed'
                          ? 'bg-green-900 text-green-300'
                          : item.status === 'pending'
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
  
  export default FundHistory;
  
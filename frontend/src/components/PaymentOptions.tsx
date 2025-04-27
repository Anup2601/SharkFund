import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface PaymentOptionsProps {
  amount: number;
  onClose: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ amount, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [formData, setFormData] = useState({
    upi: {
      upiId: '',
    },
    bank: {
      accountNumber: '',
      ifsc: '',
      accountName: '',
    },
    card: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
    },
    crypto: {
      walletAddress: '',
      network: 'ETH',
    }
  });

  const handleInputChange = (method: 'upi' | 'bank' | 'card' | 'crypto', field: string, value: string) => {
    setFormData({
      ...formData,
      [method]: {
        ...formData[method],
        [field]: value
      }
    });
  };

  const handleSubmit = () => {
    // Validate inputs based on selected method
    if (selectedMethod === 'upi' && !formData.upi.upiId) {
      toast.error('Please enter a valid UPI ID');
      return;
    }
    
    if (selectedMethod === 'bank') {
      if (!formData.bank.accountNumber || !formData.bank.ifsc || !formData.bank.accountName) {
        toast.error('Please fill all bank details');
        return;
      }
    }
    
    if (selectedMethod === 'card') {
      if (!formData.card.cardNumber || !formData.card.expiryDate || !formData.card.cvv || !formData.card.nameOnCard) {
        toast.error('Please fill all card details');
        return;
      }
    }
    
    if (selectedMethod === 'crypto' && !formData.crypto.walletAddress) {
      toast.error('Please enter a valid wallet address');
      return;
    }

    // Mock API call for payment processing
    toast.success(`Processing ₹${amount} payment via ${selectedMethod.toUpperCase()}`);
    // In a real app, you would make an API call here to process the payment
    
    setTimeout(() => {
      toast.success('Payment initiated successfully!');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md text-white">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-teal-400">Add ₹{amount}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 mb-3">Select payment method:</p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              className={`py-3 px-4 rounded-lg flex items-center justify-center transition-all ${selectedMethod === 'upi' ? 'bg-teal-500 text-gray-900' : 'bg-gray-700 text-white'}`}
              onClick={() => setSelectedMethod('upi')}
            >
              <span className="font-medium">UPI</span>
            </button>
            <button 
              className={`py-3 px-4 rounded-lg flex items-center justify-center transition-all ${selectedMethod === 'bank' ? 'bg-teal-500 text-gray-900' : 'bg-gray-700 text-white'}`}
              onClick={() => setSelectedMethod('bank')}
            >
              <span className="font-medium">Bank Transfer</span>
            </button>
            <button 
              className={`py-3 px-4 rounded-lg flex items-center justify-center transition-all ${selectedMethod === 'card' ? 'bg-teal-500 text-gray-900' : 'bg-gray-700 text-white'}`}
              onClick={() => setSelectedMethod('card')}
            >
              <span className="font-medium">Credit/Debit Card</span>
            </button>
            <button 
              className={`py-3 px-4 rounded-lg flex items-center justify-center transition-all ${selectedMethod === 'crypto' ? 'bg-teal-500 text-gray-900' : 'bg-gray-700 text-white'}`}
              onClick={() => setSelectedMethod('crypto')}
            >
              <span className="font-medium">Cryptocurrency</span>
            </button>
          </div>
        </div>

        {/* UPI Form */}
        {selectedMethod === 'upi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">UPI ID</label>
              <input
                type="text"
                value={formData.upi.upiId}
                onChange={(e) => handleInputChange('upi', 'upiId', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="yourname@upi"
              />
            </div>
          </div>
        )}

        {/* Bank Transfer Form */}
        {selectedMethod === 'bank' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Account Holder Name</label>
              <input
                type="text"
                value={formData.bank.accountName}
                onChange={(e) => handleInputChange('bank', 'accountName', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Account Holder Name"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Account Number</label>
              <input
                type="text"
                value={formData.bank.accountNumber}
                onChange={(e) => handleInputChange('bank', 'accountNumber', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Account Number"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">IFSC Code</label>
              <input
                type="text"
                value={formData.bank.ifsc}
                onChange={(e) => handleInputChange('bank', 'ifsc', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="IFSC Code"
              />
            </div>
          </div>
        )}

        {/* Card Form */}
        {selectedMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Card Number</label>
              <input
                type="text"
                value={formData.card.cardNumber}
                onChange={(e) => handleInputChange('card', 'cardNumber', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={formData.card.expiryDate}
                  onChange={(e) => handleInputChange('card', 'expiryDate', e.target.value)}
                  className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">CVV</label>
                <input
                  type="password"
                  value={formData.card.cvv}
                  onChange={(e) => handleInputChange('card', 'cvv', e.target.value)}
                  className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Name on Card</label>
              <input
                type="text"
                value={formData.card.nameOnCard}
                onChange={(e) => handleInputChange('card', 'nameOnCard', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Full Name"
              />
            </div>
          </div>
        )}

        {/* Crypto Form */}
        {selectedMethod === 'crypto' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Network</label>
              <select
                value={formData.crypto.network}
                onChange={(e) => handleInputChange('crypto', 'network', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="ETH">Ethereum (ETH)</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="BNB">Binance Coin (BNB)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Wallet Address</label>
              <input
                type="text"
                value={formData.crypto.walletAddress}
                onChange={(e) => handleInputChange('crypto', 'walletAddress', e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="0x..."
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={onClose}
            className="w-1/2 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-1/2 py-3 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-gray-900 rounded-lg font-bold transition-all duration-300"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
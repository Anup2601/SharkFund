import React, { useState } from 'react';
import { X, ImagePlus, Check, QrCode, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentProps {
  amount: number;
  onClose: () => void;
}

const Payment: React.FC<PaymentProps> = ({ amount, onClose }) => {
  const [activeTab, setActiveTab] = useState('qrcode');
  const [uploadedScreenshot, setUploadedScreenshot] = useState<string | null>(null);

  const bankDetails = {
    bankName: "State Bank of India",
    accountNumber: "1234567890",
    accountName: "Shark Fund Ltd.",
    ifscCode: "SBIN0001234",
    branchName: "Main Branch, Mumbai"
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (!file.type.includes('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          if (typeof event.target.result === 'string') {
            setUploadedScreenshot(event.target.result);
          } else {
            toast.error('Failed to read the file as a string');
          }
          toast.success('Payment screenshot uploaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPayment = () => {
    if (!uploadedScreenshot) {
      toast.error('Please upload payment screenshot first');
      return;
    }
    
    // Here you would typically send the payment confirmation to the backend
    toast.success('Payment verification submitted successfully!');
    setTimeout(() => onClose(), 1500);
  };

  const resetScreenshot = () => {
    setUploadedScreenshot(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold text-teal-400 mb-4">
          Payment Options - ₹{amount}
        </h2>
        
        {/* Payment Method Tabs */}
        <div className="flex mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('qrcode')}
            className={`flex-1 py-3 font-medium transition-all duration-300 ${
              activeTab === 'qrcode'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <QrCode size={16} className="mr-2" />
              Scan to Pay
            </div>
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 py-3 font-medium transition-all duration-300 ${
              activeTab === 'bank'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <div className="flex items-center justify-center">
              <CreditCard size={16} className="mr-2" />
              Bank Transfer
            </div>
          </button>
        </div>
        
        {/* QR Code Payment */}
        {activeTab === 'qrcode' && (
          <div className="text-center">
            <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 mb-4 flex items-center justify-center">
              <QrCode className="text-gray-900 w-40 h-40" />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Scan the QR code above to make payment of ₹{amount}
            </p>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <p className="text-gray-300 text-sm mb-4">
                After payment, please upload the screenshot:
              </p>
              
              {uploadedScreenshot ? (
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <img 
                      src={uploadedScreenshot} 
                      alt="Payment Screenshot" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={resetScreenshot}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-center text-teal-400 text-sm mb-4">
                    <Check size={16} className="mr-1" />
                    <span>Screenshot uploaded</span>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center bg-gray-700 border border-dashed border-gray-500 rounded-lg p-4 mb-4 hover:bg-gray-600 transition-colors">
                  <ImagePlus className="h-8 w-8 text-teal-400 mb-2" />
                  <span className="text-sm text-gray-300">Upload payment screenshot</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          </div>
        )}
        
        {/* Bank Transfer */}
        {activeTab === 'bank' && (
          <div>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Bank Account Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Bank Name:</span>
                  <span className="text-white font-medium">{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Number:</span>
                  <span className="text-white font-medium">{bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account Name:</span>
                  <span className="text-white font-medium">{bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">IFSC Code:</span>
                  <span className="text-white font-medium">{bankDetails.ifscCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Branch:</span>
                  <span className="text-white font-medium">{bankDetails.branchName}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-4">
              <p className="text-gray-300 text-sm mb-4">
                After transferring ₹{amount}, please upload the payment screenshot:
              </p>
              
              {uploadedScreenshot ? (
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <img 
                      src={uploadedScreenshot} 
                      alt="Payment Screenshot" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={resetScreenshot}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-center text-teal-400 text-sm mb-4">
                    <Check size={16} className="mr-1" />
                    <span>Screenshot uploaded</span>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center bg-gray-700 border border-dashed border-gray-500 rounded-lg p-4 mb-4 hover:bg-gray-600 transition-colors">
                  <ImagePlus className="h-8 w-8 text-teal-400 mb-2" />
                  <span className="text-sm text-gray-300">Upload payment screenshot</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <button
          onClick={handleSubmitPayment}
          disabled={!uploadedScreenshot}
          className={`w-full py-3 rounded-lg font-bold transition-all duration-300 mt-4 ${
            uploadedScreenshot
              ? 'bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-gray-900'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Payment Verification
        </button>
      </div>
    </div>
  );
};

export default Payment;
import React, { useState, useEffect } from 'react';
import Avatar from "../assets/avatar.png";
import toast from 'react-hot-toast';

// Profile Page Component
export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    joiningDate: "",
    activationDate: "",
    sponsorName: "",
    sponsorEmail: "",
    email: "",
    mobile: "",
    country: "",
    walletBalance: "",
    totalIncome: "",
    profileImage: Avatar,
    payment_detail: {
      account_number: "",
      ifsc_code: "",
      account_holder_name: ""
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

   // Fetch user data from API
   useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/edit/information/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`,
            'Content-Type': 'application/json',
          }
        });
        // console.log("Batch 1: ",response);
        

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();


        // console.log(data);

        setUserData({
          ...data,
          profileImage: data.profileImage || Avatar
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6 bg-[#222831] min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-gray-400 mt-1">View and manage your profile information</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ADB5]"></div>
        </div>
      ) : isEditing ? (
        <UpdateProfileForm 
          userData={userData} 
          onCancel={() => setIsEditing(false)}
          onSuccess={(updatedData) => {
            setUserData({...userData, ...updatedData});
            setIsEditing(false);
          }}
        />
      ) : (
        <ViewProfile 
          userData={userData} 
          onEdit={() => setIsEditing(true)} 
          animationProgress={animationProgress}
        />
      )}
    </div>
  );
};

// View Profile Component
interface ViewProfileProps {
  userData: any;
  onEdit: () => void;
  animationProgress: number;
}

const ViewProfile: React.FC<ViewProfileProps> = ({ userData, onEdit, animationProgress }) => {
  return (
    <div 
      className="transition-all duration-500"
      style={{
        opacity: animationProgress === 100 ? 1 : 0,
        transform: `translateY(${animationProgress === 100 ? '0' : '20px'})`,
      }}
    >
      <div className="bg-[#393E46] rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-[#00ADB5] to-[#00FFF5] p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-[#222831] p-1">
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#222831]">{userData.name}</h2>
              <p className="text-[#222831] opacity-80">Member since {new Date(userData.join_date).toLocaleDateString()}</p>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-[#222831] text-[#00FFF5] px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
                <span className="bg-[#222831] text-[#00FFF5] px-3 py-1 rounded-full text-sm font-medium">
                Balance: {userData.balance}
                </span>
              </div>
            </div>
            <div className="md:ml-auto">
              <button
                onClick={onEdit}
                className="bg-[#222831] hover:bg-opacity-80 text-[#00FFF5] py-2 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#00ADB5] mb-6 border-b border-[#00ADB5] pb-2">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Name</div>
              <div className="text-white font-medium mt-1">{userData.name}</div>
            </div>
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Email ID</div>
              <div className="text-white font-medium mt-1">{userData.email}</div>
            </div>
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Mobile Number</div>
              <div className="text-white font-medium mt-1">{userData.mobile_number}</div>
            </div>
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Country</div>
              <div className="text-white font-medium mt-1">{userData.country}</div>
            </div>
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Joining Date</div>
              <div className="text-white font-medium mt-1">{userData.join_date.split("T")[0] ?? "Loading..."}
              </div>
            </div>
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Activation Date</div>
              <div className="text-white font-medium mt-1">{userData.activation_date.split("T")[0] ?? "Loading..."}
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-[#00ADB5] mt-8 mb-6 border-b border-[#00ADB5] pb-2">
            Sponsor Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Sponsor Name</div>
              <div className="text-white font-medium mt-1">{userData.sponsored_name}</div>
            </div>
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Sponsor Email ID</div>
              <div className="text-white font-medium mt-1">{userData.sponsored_email}</div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-[#00ADB5] mt-8 mb-6 border-b border-[#00ADB5] pb-2">
            Financial Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Wallet Balance</div>
              <div className="text-white font-medium mt-1">{userData.walletBalance}</div>
            </div>
            <div className="bg-[#222831] p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Total Income</div>
              <div className="text-white font-medium mt-1">{userData.totalIncome}</div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#00ADB5] mt-8 mb-6 border-b border-[#00ADB5] pb-2">
                      Payment Methods
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Bank Details */}
                      <div className="bg-[#222831] p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">Account Holder Name</div>
                        <div className="text-white font-medium mt-1">
                          {userData.payment_detail?.account_holder_name || "Not provided"}
                        </div>
                      </div>
                      <div className="bg-[#222831] p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">Account Number</div>
                        <div className="text-white font-medium mt-1">
                          {userData.payment_detail?.account_number ? 
                            userData.payment_detail.account_number.replace(/\d(?=\d{4})/g, "*") : 
                            "Not provided"}
                        </div>
                      </div>
                      <div className="bg-[#222831] p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">IFSC Code</div>
                        <div className="text-white font-medium mt-1">
                          {userData.payment_detail?.ifsc_code || "Not provided"}
                        </div>
                      </div>
                      
                      {/* UPI Details */}
                      <div className="bg-[#222831] p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">UPI ID</div>
                        <div className="text-white font-medium mt-1">
                          {userData.payment_detail?.upi_id || "Not provided"}
                        </div>
                      </div>
                      
                      {/* Card Details */}
                      <div className="bg-[#222831] p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">Card Number</div>
                        <div className="text-white font-medium mt-1">
                          {userData.payment_detail?.card_number ? 
                            "xxxx xxxx xxxx " + userData.payment_detail.card_number.slice(-4) : "Not provided"}
                        </div>
                      </div>
                      <div className="bg-[#222831] p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">Card Holder Name</div>
                        <div className="text-white font-medium mt-1">
                          {userData.payment_detail?.name_on_card || "Not provided"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          };

// Update Profile Form Component
interface UpdateProfileFormProps {
  userData: any;
  onCancel: () => void;
  onSuccess: (updatedData: any) => void;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({ userData, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    mobile_number: userData.mobile_number,
    country: userData.country,
    profileImage: userData.profileImage,
    joiningDate: userData.join_date,
    activationDate: userData.activation_date,
    payment_detail: {
      account_number: userData.payment_detail?.account_number || "",
      ifsc_code: userData.payment_detail?.ifsc_code || "",
      account_holder_name: userData.payment_detail?.account_holder_name || "",
      upi_id: userData.payment_detail?.upi_id || "",
      card_number: userData.payment_detail?.card_number || "",
      expiry_date: userData.payment_detail?.expiry_date || "",
      cvv: userData.payment_detail?.cvv || "",
      name_on_card: userData.payment_detail?.name_on_card || ""
    }
  });

  const [imagePreview, setImagePreview] = useState(userData.profileImage);

  // Countries list
  const countries = [
    "USA", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "Japan", "China", "India", "Brazil", "Mexico",
    "South Africa", "Nigeria", "Egypt", "UAE", "Singapore"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      payment_detail: {
        ...formData.payment_detail,
        [name]: value
      }
    });
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      payment_detail: {
        ...formData.payment_detail,
        [name]: value
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/edit/information/', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          mobile_number: formData.mobile_number,
          country: formData.country,
          payment_detail: {
            account_holder_name: formData.payment_detail.account_holder_name,
            account_number: formData.payment_detail.account_number,
            ifsc_code: formData.payment_detail.ifsc_code,
            upi_id: formData.payment_detail.upi_id,
            card_number: formData.payment_detail.card_number,
            expiry_date: formData.payment_detail.expiry_date,
            name_on_card: formData.payment_detail.name_on_card
          }
        }),
      });
      

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      toast.success("Profile Updated Successfully");
      onSuccess(updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };


  return (
    <div className="bg-[#393E46] rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-[#00ADB5] to-[#00FFF5] p-6">
        <h2 className="text-2xl font-bold text-[#222831]">Update Your Profile</h2>
        <p className="text-[#222831] opacity-80">Make changes to your profile information</p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-[#222831] p-1">
                <img 
                  src={imagePreview} 
                  alt="Profile" 
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-[#00ADB5] hover:bg-[#00FFF5] text-[#222831] p-2 rounded-full cursor-pointer transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input 
                id="profile-image" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-[#00FFF5] text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                  required
                />
              </div>
              
              {/* Email Field - Read-only */}
              <div>
                <label htmlFor="email" className="block text-[#00FFF5] text-sm font-medium mb-2">
                  Email ID (Read-only)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  className="w-full bg-[#222831] text-gray-400 px-4 py-3 rounded-lg border border-gray-700 cursor-not-allowed"
                  readOnly
                />
              </div>
              
              {/* Mobile Field */}
              <div>
                <label htmlFor="mobile" className="block text-[#00FFF5] text-sm font-medium mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                  required
                />
              </div>
              
              {/* Country Field */}
              <div>
                <label htmlFor="country" className="block text-[#00FFF5] text-sm font-medium mb-2">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Sponsor Information - Read Only Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#00ADB5] mb-4 border-b border-[#00ADB5] pb-2">
                Sponsor Information (Read-only)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                    Sponsor Name
                  </label>
                  <input
                    type="text"
                    value={userData.sponsorName}
                    className="w-full bg-[#222831] text-gray-400 px-4 py-3 rounded-lg border border-gray-700 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                    Sponsor Email
                  </label>
                  <input
                    type="text"
                    value={userData.sponsorEmail}
                    className="w-full bg-[#222831] text-gray-400 px-4 py-3 rounded-lg border border-gray-700 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            {/* Dates Information - Read Only Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#00ADB5] mb-4 border-b border-[#00ADB5] pb-2">
                Account Information 
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                    Joining Date
                  </label>
                  <input
                    type="text"
                    value={userData.join_date.split("T")[0] ?? "Loading..."}
                    className="w-full bg-[#222831] text-gray-400 px-4 py-3 rounded-lg border border-gray-700 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                    Activation Date
                  </label>
                  <input
                    type="text"
                    value={userData.activation_date.split("T")[0] ?? "Loading..."}
                    className="w-full bg-[#222831] text-gray-400 px-4 py-3 rounded-lg border border-gray-700 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/*  Bank Details Section - Optional */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-[#00ADB5] mb-4 border-b border-[#00ADB5] pb-2">
                  Payment Details (Optional)
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Add your payment details to auto-fill payment information when adding funds
                </p>
                
                <div className="mb-6">
                  <h4 className="text-[#00FFF5] font-semibold mb-4">Bank Account</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                        Account Holder Name 
                      </label>
                      <input
                        type="text"
                        name="account_holder_name"
                        value={formData.payment_detail.account_holder_name}
                        onChange={handleChange}
                         className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                        Account Number 
                      </label>
                      <input
                        type="text"
                        name="account_number"
                        value={formData.payment_detail.account_number}
                        onChange={handleChange}
                         className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                        placeholder="Account Number"
                      />
                    </div>
                    <div>
                      <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                        IFSC Code 
                      </label>
                      <input
                        type="text"
                        name="ifsc_code"
                        value={formData.payment_detail.ifsc_code}
                        onChange={handleChange}
                         className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                        placeholder="IFSC Code"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-[#00FFF5] font-semibold mb-4">UPI</h4>
                  <div>
                    <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                      UPI ID 
                    </label>
                    <input
                      type="text"
                      name="upi_id"
                      value={formData.payment_detail.upi_id}
                      onChange={handleChange}
                      className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                      placeholder="username@upi"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[#00FFF5] font-semibold mb-4">Card Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="card_number"
                        value={formData.payment_detail.card_number}
                        onChange={handleCardDetailsChange}
                        className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="name_on_card"
                        value={formData.payment_detail.name_on_card}
                        onChange={handleCardDetailsChange}
                        className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry_date"
                        value={formData.payment_detail.expiry_date}
                        onChange={handleCardDetailsChange}
                        className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-[#00FFF5] text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.payment_detail.cvv}
                        onChange={handleCardDetailsChange}
                        className="w-full bg-[#222831] text-white px-4 py-3 rounded-lg border border-[#00ADB5] focus:outline-none focus:ring-2 focus:ring-[#00FFF5]"
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              </div>

            
            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="bg-[#222831] hover:bg-opacity-80 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={()=>toast.success("Profile Updated")}
                className="bg-gradient-to-r from-[#00ADB5] to-[#00FFF5] hover:from-[#00899E] hover:to-[#00D8DC] text-[#222831] py-3 px-6 rounded-lg font-bold transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
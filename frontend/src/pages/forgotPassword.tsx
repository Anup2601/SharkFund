import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import axios, { AxiosError } from 'axios';

// Define the error response structure for Axios
interface ErrorResponse {
  errors?: {
    email?: string[];
    otp?: string[];
    create_password?: string[];
    confirm_password?: string[];
    general?: string[];
    [key: string]: any;
  };
  [key: string]: any;
}

export default function ForgotPassword() {
  const [floatY, setFloatY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    newpassword: '',
    confirmpassword: ''
  });

  const BASE_URL = 'https://sharkfund.priyeshpandey.in';

  // Animation for floating elements
  useEffect(() => {
    const floatInterval = setInterval(() => {
      setFloatY(prev => (prev === 0 ? 20 : 0));
    }, 2000);
    
    const rotateInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    
    return () => {
      clearInterval(floatInterval);
      clearInterval(rotateInterval);
    };
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  // Send OTP to backend
  const handleSendOtp = async () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid Email format");

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/forget-password/`, {
        email: formData.email
      });
      setIsOtpSent(true);
      toast.success(response.data.message || "OTP sent to your email!");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errors = axiosError.response?.data?.errors || {};
      const errorMessage = errors.email?.[0] || errors[0] || "Failed to send OTP";
      toast.error(errorMessage);
    }
  };

  // Verify OTP with backend
  const handleVerifyOtp = async () => {
    if (!otp.trim()) return toast.error("OTP is required");

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/verify-otp/`, {
        email: formData.email,
        otp
      });
      setIsOtpVerified(true);
      toast.success(response.data.message || "OTP verified!");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errors = axiosError.response?.data?.errors || {};
      const errorMessage = errors.otp?.[0] || errors.email?.[0] || "Invalid OTP";
      toast.error(errorMessage);
    }
  };

  // Handle form submission to reset password
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.newpassword) return toast.error("Password is required");
    if (formData.newpassword.length < 8) return toast.error("Password must be at least 8 characters");
    if (!formData.confirmpassword) return toast.error("Confirm Password is required");
    if (formData.confirmpassword.length < 8) return toast.error("Confirm Password must be at least 8 characters");
    if (formData.newpassword !== formData.confirmpassword) return toast.error("Passwords do not match");

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/reset-password/`, {
        email: formData.email,
        create_password: formData.newpassword,
        confirm_password: formData.confirmpassword
      });
      toast.success(response.data.message || "Password changed successfully!");
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errors = axiosError.response?.data?.errors || {};
      const errorMessage = 
        errors.create_password?.[0] ||
        errors.confirm_password?.[0] ||
        errors.email?.[0] ||
        errors.general?.[0] ||
        errors[0] ||
        "Failed to reset password";
      toast.error(errorMessage);
    }
  };

  // Handle cursor movement for button animation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              background: `radial-gradient(circle, rgba(0,173,181,0.1) 0%, rgba(0,255,245,0.05) 70%, rgba(0,0,0,0) 100%)`,
              transform: `scale(${Math.random() * 2 + 0.5})`,
              animation: `floatBubble ${Math.random() * 20 + 10}s linear infinite`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-auto p-4 md:p-0 z-10 h-full min-h-screen">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-800 bg-opacity-90 flex flex-col justify-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <div className="mb-8">
            <Link to={"/"}> 
                <h1 className="text-3xl md:text-4xl font-bold text-teal-300 mb-2">SharkFund</h1>
            </Link>
            <p className="text-gray-300">Welcome back to change your password</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Input */}
            <div>
              <label className="block text-teal-300 mb-2" htmlFor="email">Email Address</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-white'/>
                </div>
                <input
                  className="w-full bg-gray-700 rounded p-3 pl-10 text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Enter Your Email'
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isOtpSent}
                />
              </div>
            </div>
            
            {/* Send OTP Button */}
            {!isOtpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                className="mt-4 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
              >
                Send OTP
              </button>
            )}

            {/* OTP Input */}
            {isOtpSent && !isOtpVerified && (
              <div className="mt-4">
                <label className="block text-teal-300 mb-2" htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-gray-700 rounded p-3 text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
                  placeholder="Enter the OTP"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="mt-3 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {isOtpVerified && (
              <>
                <div>
                  <label className="block text-teal-300 mb-2" htmlFor="newpassword">New Password</label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Lock className='size-5 text-white'/>
                    </div>
                    <input
                      className="w-full bg-gray-700 rounded p-3 pl-10 text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
                      type={showPassword ? "text" : "password"}
                      id="newpassword"
                      name="newpassword"
                      placeholder='Enter Your New Password'
                      value={formData.newpassword}
                      onChange={handleChange}
                    />
                    <button 
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='size-5 text-white'/>
                      ) : (
                        <Eye className='size-5 text-white'/>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-teal-300 mb-2" htmlFor="confirmpassword">Confirm Password</label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <Lock className='size-5 text-white'/>
                    </div>
                    <input
                      className="w-full bg-gray-700 rounded p-3 pl-10 text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
                      type={showPassword ? "text" : "password"}
                      id="confirmpassword"
                      name="confirmpassword"
                      placeholder='Enter Your Confirm Password'
                      value={formData.confirmpassword}
                      onChange={handleChange}
                    />
                    <button 
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className='size-5 text-white'/>
                      ) : (
                        <Eye className='size-5 text-white'/>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
            
            {isOtpVerified && (
              <div className="relative overflow-hidden pt-4">
                <button 
                  type="submit" 
                  className="w-full relative bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 text-white py-3 px-6 rounded font-bold transition-all duration-300 transform hover:scale-105"
                >
                  <span>Save Change</span>
                  <div className="absolute inset-0 bg-white opacity-10 rounded-full w-12 h-12 pointer-events-none" 
                    style={{
                      left: `${cursorPosition.x % 200}px`,
                      top: `${cursorPosition.y % 50}px`,
                      transition: 'all 0.2s ease'
                    }}
                  ></div>
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Animated Illustration Section */}
        <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center relative rounded-t-lg md:rounded-l-lg md:rounded-tr-none order-1 md:order-1">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Orbiting Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-4/5 h-4/5 border border-teal-400 rounded-full opacity-20"
                  style={{ transform: `rotate(${rotation * 0.5}deg)` }}></div>
                <div className="absolute w-3/5 h-3/5 border border-teal-300 rounded-full opacity-30"
                  style={{ transform: `rotate(${-rotation * 0.7}deg)` }}></div>
                <div className="absolute w-2/5 h-2/5 border border-teal-200 rounded-full opacity-40"
                  style={{ transform: `rotate(${rotation}deg)` }}></div>
              </div>
              
              {/* Central Element */}
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `translateY(${floatY * 0.5}px)` }}>
                <div className="w-1/4 h-1/4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg shadow-lg shadow-teal-400/50"
                  style={{ transform: `rotate(${rotation}deg)` }}></div>
              </div>
              
              {/* Orbiting Nodes */}
              {[...Array(6)].map((_, i) => {
                const angle = (rotation + (i * 60)) * Math.PI / 180;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <div key={i} className="absolute flex items-center justify-center"
                    style={{
                      left: 'calc(50% + ' + x + 'px)',
                      top: 'calc(50% + ' + y + 'px)',
                      transform: `translate(-50%, -50%) translateY(${Math.sin(rotation/30 + i) * 10}px)`,
                      transition: 'all 0.3s ease-out'
                    }}>
                    <div className="w-4 h-4 bg-teal-300 rounded-full shadow-md shadow-teal-300/50 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                );
              })}
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: `rotate(${rotation * 0.2}deg)` }}>
                {[...Array(12)].map((_, i) => {
                  const angle1 = ((i * 30) % 360) * Math.PI / 180;
                  const angle2 = ((i * 30 + 120) % 360) * Math.PI / 180;
                  const radius = 120;
                  
                  const x1 = Math.cos(angle1) * radius + (radius + 20);
                  const y1 = Math.sin(angle1) * radius + (radius + 20);
                  const x2 = Math.cos(angle2) * radius + (radius + 20);
                  const y2 = Math.sin(angle2) * radius + (radius + 20);
                  
                  return (
                    <line 
                      key={i}
                      x1={x1} 
                      y1={y1} 
                      x2={x2} 
                      y2={y2} 
                      stroke="#00ADB5" 
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      strokeOpacity="0.4"
                    />
                  );
                })}
              </svg>
              
              {/* Floating Data Particles */}
              {[...Array(15)].map((_, i) => (
                <div 
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-teal-400"
                  style={{
                    width: `${Math.random() * 4 + 2}px`,
                    height: `${Math.random() * 4 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.2,
                    animation: `floatParticle ${Math.random() * 10 + 5}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes floatBubble {
          0% { transform: translate(0, 0) scale(1); opacity: 0.05; }
          50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(1.2); opacity: 0.1; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.05; }
        }
        
        @keyframes floatParticle {
          0% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); }
          50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); }
          75% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
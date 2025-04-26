import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail, Phone, Share2Icon, User } from 'lucide-react';
import axios from 'axios';

export default function Registration() {
  const [floatY, setFloatY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    Referral: '', // Keep as Referral for form state
    mobile: '',
    address: '',
    acceptedTerms: false,
  });

  // Check for referral in the location state and update form data
  useEffect(() => {
    if (location.state?.Referrer) {
      setFormData(prev => ({
        ...prev,
        Referral: location.state.Referrer
      }));
    }
  }, [location.state]);

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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  // Handle form submission with API integration
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // Frontend validation
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid Email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
    if (formData.password !== formData.confirmPassword) return toast.error("Passwords do not match");
    if (!formData.acceptedTerms) return toast.error("Please accept the Terms and Conditions");

    setIsLoading(true);
    setFieldErrors({});
    
    try {
      // Prepare the data for the API format
      const apiData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        address: formData.address || '', // Use empty string if address is not provided
        mobile_number: formData.mobile || '',
        referred_by: formData.Referral || '', // Map Referral to referred_by
      };
      
      // Make the API request
      const response = await axios.post(
        'https://sharkfund.priyeshpandey.in/api/v1/register/',
        apiData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true // Ensure cookies are sent/received
        }
      );
      
      toast.success('Registration successful! Redirecting...');
      
      // Store username in localStorage (optional, since tokens are in cookies)
      localStorage.setItem('userData', JSON.stringify({
        username: response.data.user.username,
        email: formData.email
      }));
      
      // Redirect to /home after a delay (user is authenticated via cookies)
      setTimeout(() => navigate('/home'), 1500);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle API error responses
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        // Map referred_by errors to Referral for display
        const mappedErrors = {
          ...errors,
          Referral: errors.referred_by || errors.Referral,
        };
        setFieldErrors(mappedErrors);
        
        // Show the first error as a toast
        const firstErrorField = Object.keys(mappedErrors)[0];
        const firstError = mappedErrors[firstErrorField][0];
        toast.error(firstError);
      } else {
        toast.error('Registration failed. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cursor movement for button animation
  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
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
            <Link to={"/"} >
              <h1 className="text-3xl md:text-4xl font-bold text-teal-300 mb-2">SharkFund</h1>
            </Link>
            <p className="text-gray-300">Create your account to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-teal-300 mb-2" htmlFor="name">Name</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-white'/>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded p-3 pl-10 text-white border ${fieldErrors.name ? 'border-red-500' : 'border-gray-600'} focus:border-teal-400 focus:outline-none`}
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Enter your name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name[0]}</p>}
            </div>
            
            <div>
              <label className="block text-teal-300 mb-2" htmlFor="email">Email Address</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-white'/>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded p-3 pl-10 text-white border ${fieldErrors.email ? 'border-red-500' : 'border-gray-600'} focus:border-teal-400 focus:outline-none`}
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email[0]}</p>}
            </div>
            
            <div>
              <label className="block text-teal-300 mb-2" htmlFor="mobile">Mobile Number</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Phone className='size-5 text-white'/>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded p-3 pl-10 text-white border ${fieldErrors.mobile_number ? 'border-red-500' : 'border-gray-600'} focus:border-teal-400 focus:outline-none`}
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder='Enter your mobile number'
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.mobile_number && <p className="text-red-500 text-sm mt-1">{fieldErrors.mobile_number[0]}</p>}
            </div>

            <div>
              <label className="block text-teal-300 mb-2" htmlFor="address">Address</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-white'/>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded p-3 pl-10 text-white border ${fieldErrors.address ? 'border-red-500' : 'border-gray-600'} focus:border-teal-400 focus:outline-none`}
                  type="text"
                  id="address"
                  name="address"
                  placeholder='Enter your address'
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {fieldErrors.address && <p className="text-red-500 text-sm mt-1">{fieldErrors.address[0]}</p>}
            </div>

            <div>
              <label className="block text-teal-300 mb-2" htmlFor="Referral">Referral Username (Optional)</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Share2Icon className='size-5 text-white'/>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded p-3 pl-10 text-white border ${fieldErrors.Referral ? 'border-red-500' : 'border-gray-600'} focus:border-teal-400 focus:outline-none`}
                  type="text"
                  id="Referral"
                  name="Referral"
                  placeholder='Enter your Referral ID (optional)'
                  value={formData.Referral}
                  onChange={handleChange} // Removed readOnly to allow manual input
                />
              </div>
              {fieldErrors.Referral && <p className="text-red-500 text-sm mt-1">{fieldErrors.Referral[0]}</p>}
            </div>
            
            <div>
              <label className="block text-teal-300 mb-2" htmlFor="password">Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-white'/>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded p-3 pl-10 text-white border ${fieldErrors.password ? 'border-red-500' : 'border-gray-600'} focus:border-teal-400 focus:outline-none`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder='Enter your password (min 8 characters)'
                  value={formData.password}
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
              {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password[0]}</p>}
            </div>
            
            <div>
              <label className="block text-teal-300 mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-white'/>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded p-3 pl-10 text-white border ${fieldErrors.confirm_password ? 'border-red-500' : 'border-gray-600'} focus:border-teal-400 focus:outline-none`}
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder='Confirm your password'
                  value={formData.confirmPassword}
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
              {fieldErrors.confirm_password && <p className="text-red-500 text-sm mt-1">{fieldErrors.confirm_password[0]}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptedTerms"
                name="acceptedTerms"
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-teal-500"
              />
              <label htmlFor="acceptedTerms" className="text-gray-300 text-sm">
                I accept the <a href="/terms" className="text-teal-400 underline hover:text-teal-300">Terms and Conditions</a>
              </label>
            </div>
            
            {/* Display general errors if any */}
            {fieldErrors.general && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 p-3 rounded">
                {fieldErrors.general.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            
            <div className="relative overflow-hidden pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full relative bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 text-white py-3 px-6 rounded font-bold transition-all duration-300 transform ${isLoading ? 'opacity-70' : 'hover:scale-105'}`}
              >
                <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                <div className="absolute inset-0 bg-white opacity-10 rounded-full w-12 h-12 pointer-events-none" 
                  style={{
                    left: `${cursorPosition.x % 200}px`,
                    top: `${cursorPosition.y % 50}px`,
                    transition: 'all 0.2s ease'
                  }}
                ></div>
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-gray-400">
            Already have an account? <Link to="/login" className="text-teal-300 hover:underline">Sign in</Link>
          </p>
        </div>
        
        {/* Animated Illustration Section */}
        <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center relative rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <div className="w-full h-full flex items-center justify-center">
            {/* Digital Network Animation */}
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
      
      <style >{`
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
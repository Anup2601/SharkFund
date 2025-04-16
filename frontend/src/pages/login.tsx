import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const [floatY, setFloatY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    rememberMe: false
  });

  const API_BASE_URL = "https://sharkfund.priyeshpandey.in";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const isEmail = (login: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.login.trim()) {
      return toast.error("Email or Username is required");
    }
  
    if (!formData.password) {
      return toast.error("Password is required");
    }
  
    try {
      setIsLoading(true);
  
      const response = await axios.post(
        `${API_BASE_URL}/api/token/`,
        {
          username: formData.login,
          password: formData.password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
  
      console.log('Login Response:', response.data);
      localStorage.setItem('accessToken', response.data.access);
      toast.success('Login successful!');
      setTimeout(() => navigate('/home'), 1000);
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        if (errorData?.detail) {
          toast.error(errorData.detail);
        } else if (errorData?.non_field_errors) {
          toast.error(errorData.non_field_errors[0]);
        } else {
          toast.error('Login failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col overflow-hidden" onMouseMove={handleMouseMove}>
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

      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto my-auto p-4 md:p-0 z-10 h-full min-h-screen">
        
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-800 bg-opacity-90 flex flex-col justify-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <div className="mb-8">
            <Link to={"/"}> 
                <h1 className="text-3xl md:text-4xl font-bold text-teal-300 mb-2">SharkFund</h1>
            </Link>
            <p className="text-gray-300">Welcome back! Log in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">

          <div>
              <label className="block text-teal-300 mb-2" htmlFor="login">Email or Username</label>
              <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                  <Mail className='size-5 text-white '/>
                </div>
              <input
                className="w-full bg-gray-700 rounded p-3 pl-10 text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
                type="text"
                id="login"
                name="login"
                placeholder='Enter Your Email or Username'
                value={formData.login}
                onChange={handleChange}
              />
              </div>
            </div>
            
            <div>
              <label className="block text-teal-300 mb-2" htmlFor="password">Password </label>
              <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                  <Lock className='size-5 text-white '/>
                </div>
              <input
                className="w-full bg-gray-700 rounded p-3 pl-10 text-white border border-gray-600 focus:border-teal-400 focus:outline-none"
                type={showPassword?"text":"password"}
                id="password"
                name="password"
                placeholder='Enter Your password'
                value={formData.password}
                onChange={handleChange}
              />
              <button 
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center '
                  onClick={()=> setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='size-5 text-white  '/>
                  ) : (
                    <Eye className='size-5 text-white '/>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-500 focus:ring-teal-400 border-gray-500 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgotpassword" className="text-teal-300 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div className="relative overflow-hidden pt-4">
              <button 
                type="submit" 
                className="w-full relative bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 text-white py-3 px-6 rounded font-bold transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
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
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => toast('🚧 Google Sign-in coming soon!')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#ffffff"/>
                </svg>
              </button>
              
              <button
                type="button"
                onClick={() => toast('🚧 GitHub Sign-in coming soon!')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <span className="sr-only">Sign in with GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#ffffff"/>
                </svg>
              </button>
              
              <button
                type="button"
                onClick={() => toast('🚧 Microsoft Sign-in coming soon!')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <span className="sr-only">Sign in with Microsoft</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" fill="#ffffff"/>
                </svg>
              </button>
            </div>
          </div>
          
          <p className="mt-6 text-center text-gray-400">
            Don't have an account? <a href="/register" className="text-teal-300 hover:underline">Sign up</a>
          </p>
        </div>
        
        <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center relative rounded-t-lg md:rounded-l-lg md:rounded-tr-none order-1 md:order-1">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-4/5 h-4/5 border border-teal-400 rounded-full opacity-20"
                  style={{ transform: `rotate(${rotation * 0.5}deg)` }}></div>
                <div className="absolute w-3/5 h-3/5 border border-teal-300 rounded-full opacity-30"
                  style={{ transform: `rotate(${-rotation * 0.7}deg)` }}></div>
                <div className="absolute w-2/5 h-2/5 border border-teal-200 rounded-full opacity-40"
                  style={{ transform: `rotate(${rotation}deg)` }}></div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `translateY(${floatY * 0.5}px)` }}>
                <div className="w-1/4 h-1/4 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg shadow-lg shadow-teal-400/50"
                  style={{ transform: `rotate(${rotation}deg)` }}></div>
              </div>
              
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
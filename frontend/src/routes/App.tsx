import { Route, Routes, useNavigate, useParams, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Registration from '../pages/register'
import Login from '../pages/login'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import TermsAndConditions from '../pages/TermsAndConditions'
import ForgotPassword from '../pages/forgotPassword'
import Demo2 from '../pages/landing'
import HomeLayout from '../pages/home'
import Profile from '../components/profile'
import { useEffect, useState } from 'react'
import Disclaimer from '../pages/Disclaimer'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import CookiePolicy from '../pages/CookiePolicy'

// Protected Route component
import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }
      
      try {
        // Optional: Verify token validity with your backend
        const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/auth/verify-token/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        // If token is valid
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // If token is invalid or expired, clear it
          localStorage.removeItem('accessToken');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  if (loading) {
    // Show loading state while checking authentication
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }
  
  return children;
};

// Redirect function inside App file
function RedirectToRegister() {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (username) {
      navigate('/register', { state: { Referrer: username } })
    }
  }, [username, navigate])
  
  return null
}

function App() {
  // State to store user data from API
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    profileImage: '/api/placeholder/32/32', // Retain mock profileImage as API doesn't provide it
  });

  // Fetch user details from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.error('No access token found in localStorage');
          return;
        }
        
        const response = await fetch('https://sharkfund.priyeshpandey.in/api/v1/edit/information/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('User Details:', data); // Log the full response for debugging
        
        // Update currentUser with only name and email from the API response
        setCurrentUser({
          name: data.name || '',
          email: data.email || '',
          profileImage: '/api/placeholder/32/32', // Retain mock profileImage
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Demo2/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/terms" element={<TermsAndConditions/>}/>
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
        {/* Protected home route */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeLayout currentUser={currentUser}/>
            </ProtectedRoute>
          }
        />
        <Route path="/ref/auth/:username" element={<RedirectToRegister />} />
        {/* Catch-all route for redirecting unknown paths to home or login based on auth status */}
        <Route path="*" element={
          localStorage.getItem('accessToken') ? <Navigate to="/home" /> : <Navigate to="/login" />
        } />
      </Routes>
    </>
  )
}

export default App
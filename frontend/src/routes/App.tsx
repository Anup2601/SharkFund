import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

// Pages
import Demo2 from '../pages/landing';
import Registration from '../pages/register';
import Login from '../pages/login';
import ForgotPassword from '../pages/forgotPassword';
import TermsAndConditions from '../pages/TermsAndConditions';
import Disclaimer from '../pages/Disclaimer';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CookiePolicy from '../pages/CookiePolicy';
import HomeLayout from '../pages/home';

// Components
import Profile from '../components/profile';

// Styles
import './App.css';

// Redirect function component
function RedirectToRegister() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (username) {
      navigate('/register', { state: { Referrer: username } });
    }
  }, [username, navigate]);
  
  return null;
}

function App() {
  // State for user data
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    profileImage: '/api/placeholder/32/32',
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
        console.log('User Details:', data);
        
        setCurrentUser({
          name: data.name || '',
          email: data.email || '',
          profileImage: '/api/placeholder/32/32',
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
        {/* Public routes */}
        <Route path="/" element={<Demo2 />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        
        {/* Legal pages */}
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        
        {/* Protected routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomeLayout currentUser={currentUser} />} />
        
        {/* Special routes */}
        <Route path="/ref/auth/:username" element={<RedirectToRegister />} />
      </Routes>
    </>
  );
}

export default App;
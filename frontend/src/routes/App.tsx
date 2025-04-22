import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router-dom'
import './App.css'
import Registration from '../pages/register'
import Login from '../pages/login'
import { Toaster } from 'react-hot-toast'
import TermsAndConditions from '../pages/TermsAndConditions'
import ForgotPassword from '../pages/forgotPassword'
import Landing from '../pages/landing'
import HomeLayout from '../pages/home'
import Profile from '../components/profile'
import { useEffect, useState } from 'react'

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
  }, []); // Empty dependency array to run only once on mount
  
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/terms" element={<TermsAndConditions/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* Wrap your home page with HomeLayout and pass user data */}
        <Route
          path="/home"
          element={
            <HomeLayout currentUser={currentUser}/>
          }
        />
        <Route path="/ref/auth/:username" element={<RedirectToRegister />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </>
  )
}

export default App
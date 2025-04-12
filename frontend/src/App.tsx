import { Route, Routes } from 'react-router-dom'
import './App.css'
import Registration from './pages/register'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import TermsAndConditions from './pages/TermsAndConditions'
import ForgotPassword from './pages/forgotPassword'
import Landing from './pages/landing'
import HomeLayout from './pages/home'
import Profile from './components/profile'

function App() {
   // Mock user data — in a real app, you'd fetch this from context or auth
   const currentUser = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    profileImage: '/api/placeholder/32/32',
  };
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
      </Routes>
    </>
    
  )
}

export default App
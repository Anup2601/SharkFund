import { Route, Routes } from 'react-router-dom'
import './App.css'
import Registration from './pages/register'
import Login from './pages/login'
import { Toaster } from 'react-hot-toast'
import TermsAndConditions from './pages/TermsAndConditions'
import ForgotPassword from './pages/forgotPassword'

function App() {
  return (
    <>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/terms" element={<TermsAndConditions/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      </Routes>
    </>
    
  )
}

export default App
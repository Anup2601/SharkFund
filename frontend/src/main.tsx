import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useNavigate, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing.tsx'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <App />
    
  </BrowserRouter> 
  </StrictMode>,
)



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './components/User';
import Driver from './components/Driver';
import Login from './login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import Location from './Location';
import LoginDashboard from './LoginDashboard';
import Bookings from './Bookings';
import ResetPassword from './ResetPassword';
import AdminDashboard from './AdminDashboard';
import Contact from './Contact';
import About from './About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

// Auth callback handler component for Supabase OAuth redirects
const AuthCallback = () => {
  const navigate = React.useNavigate();
  
  React.useEffect(() => {
    // The actual auth state is handled by the AuthContext
    // This component just redirects after the callback is processed
    console.log('Auth callback received - processing OAuth redirect');
    
    // Check if we have hash or query parameters indicating auth
    const hasAuthParams = window.location.hash || window.location.search.includes('access_token');
    
    // If auth is successful, redirect to dashboard after a short delay
    // The delay allows the AuthContext to update first
    const timer = setTimeout(() => {
      console.log('Redirecting to dashboard after auth callback');
      navigate('/dashboard');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Completing Login...</h2>
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<LoginDashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/location" element={<Location />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/logindashboard" element={<LoginDashboard />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            pauseOnHover
            draggable
          />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

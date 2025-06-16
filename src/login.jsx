import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from './context/ThemeContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://vipreshana-3.onrender.com/login', formData);
      const { redirectUrl, message } = response.data;
      localStorage.setItem('userPhone', formData.phone);

      toast.success(`🎉 ${message}`, {
        toastId: 'login-success',
        position: 'top-center',
        autoClose: 3000,
        style: {
          backgroundColor: '#28a745',
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '12px',
          textAlign: 'center',
        },
      });

      setTimeout(() => {
        setIsLoading(false);
        navigate(redirectUrl);
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      if (!toast.isActive('login-error')) {
        toast.error('⚠️ Login failed! Please try again.', {
          toastId: 'login-error',
          position: 'top-center',
          autoClose: 3000,
          style: {
            backgroundColor: '#e60023',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            borderRadius: '12px',
            textAlign: 'center',
          },
        });
      }
    }
  };

  const isDisabled = !formData.phone || !formData.password;

  return (
    <div
      className={`relative h-screen bg-cover bg-center transition-all duration-300 ${
        isDark ? 'brightness-75' : 'brightness-100'
      }`}
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg')",
      }}
    >
      <div
        className={`absolute inset-0 ${
          isDark ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-60'
        } flex items-center justify-center`}
      >
        <button
          onClick={toggleTheme}
          className={`absolute top-6 right-6 p-3 rounded-full ${
            isDark
              ? 'bg-yellow-400 text-black hover:bg-yellow-300'
              : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
          }`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <div
          className={`p-10 rounded-2xl shadow-2xl w-96 ${
            isDark ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900'
          }`}
        >
          <h1
            className={`text-4xl font-bold text-center mb-2 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            Welcome Back!
          </h1>
          <p
            className={`text-md text-center mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Please enter your credentials to login.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="phone"
                className={`block text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                📞 Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-xl shadow-sm p-3 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200'
                }`}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className={`block text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                🔒 Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-xl shadow-sm p-3 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 focus:ring focus:ring-blue-400'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-200'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-10 text-lg ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isDisabled || isLoading}
              className={`w-full font-semibold py-3 rounded-xl ${
                isDisabled || isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isDark
                  ? 'bg-blue-500 hover:bg-blue-400 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p
            className={`text-center text-sm mt-4 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Don’t have an account?{' '}
            <Link
              to="/register"
              className={`font-semibold hover:underline ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              Register
            </Link>
          </p>
          <p
            className={`text-center text-sm mt-2 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <Link
              to="/forgot-password"
              className={`font-semibold hover:underline ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

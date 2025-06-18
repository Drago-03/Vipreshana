import React, { useEffect, useState } from 'react';
import { useTheme } from './context/ThemeContext'; 
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { theme } = useTheme();
    const { isAuthenticated } = useAuth();
    const isDark = theme === 'dark';
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <>
            <Navbar />
            <div
                className={`relative h-screen bg-cover bg-center transition-all duration-700 ease-out font-inter ${
                    isDark ? 'brightness-30' : 'brightness-70'
                }`}
                style={{ backgroundImage: "url('https://img.freepik.com/free-photo/scene-with-photorealistic-logistics-operations-proceedings_23-2151468862.jpg?size=626&ext=jpg&ga=GA1.1.1861036275.1716800359&semt=ais_hybrid-rr-similar')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1
                            className={`text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 transition-all duration-1000 transform ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                        >
                            Welcome to Vipreshana
                        </h1>
                        <p
                            className={`text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 transform ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            Your one-stop solution for convenient campus transportation.
                            Book rides, track vehicles, and travel safely around the campus.
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 transform ${
                            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                            style={{ transitionDelay: '600ms' }}
                        >
                            {isAuthenticated ? (
                                <Link
                                    to="/dashboard"
                                    className={`group relative px-6 py-2 rounded-xl font-semibold text-lg tracking-wide transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 ${
                                        isDark
                                            ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-2 border-gray-600 hover:from-gray-700 hover:to-gray-800 hover:border-gray-500 hover:shadow-xl hover:shadow-gray-800/30'
                                            : 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white hover:shadow-xl hover:shadow-white/30'
                                    }`}
                                >
                                    <span className="relative z-10 flex items-center gap-1 font-medium">
                                        Go to Dashboard
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </span>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className={`group relative px-6 py-2 rounded-xl font-semibold text-lg tracking-wide transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 ${
                                            isDark
                                                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-2 border-gray-600 hover:from-gray-700 hover:to-gray-800 hover:border-gray-500 hover:shadow-xl hover:shadow-gray-800/30'
                                                : 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white hover:shadow-xl hover:shadow-white/30'
                                        }`}
                                    >
                                        <span className="relative z-10 flex items-center gap-1 font-medium">
                                            Register Now
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                        </span>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </Link>
                                    
                                    <Link
                                        to="/login"
                                        className={`group relative px-6 py-2 rounded-xl font-semibold text-lg tracking-wide transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 ${
                                            isDark
                                                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-2 border-gray-600 hover:from-gray-700 hover:to-gray-800 hover:border-gray-500 hover:shadow-xl hover:shadow-gray-800/30'
                                                : 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white hover:shadow-xl hover:shadow-white/30'
                                        }`}
                                    >
                                        <span className="relative z-10 flex items-center gap-1 font-medium">
                                            Login
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                        </span>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
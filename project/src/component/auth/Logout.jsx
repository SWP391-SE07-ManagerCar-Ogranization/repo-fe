import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 transition-colors duration-1000">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.937l3-2.646z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Logging Out...</h2>
      </div>
    </div>
  );
};

export default Logout;

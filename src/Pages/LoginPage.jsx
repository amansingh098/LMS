import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    navigate('/admin-dashboard/allCourses'); // Redirect to dashboard after successful login
  };

  return (
    <div>
 <Navbar/>
   <div className="bg-gray-900 min-h-screen flex items-center justify-center">
       
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
            <input type="text" id="username" name="username" className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input type="password" id="password" name="password" className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 w-full rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">Login</button>
        </form>
        <p className="text-gray-400 text-sm mt-4">Don't have an account? <span className="text-purple-600 cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span></p>
      </div>
    </div>
    <Footer/>
    </div>
  
  );
};

export default LoginPage;

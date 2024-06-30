import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Handle signup logic here
    navigate('/login'); // Redirect to dashboard after successful signup
  };

  return (
    <div>
        <Navbar/>
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-300 mb-2">Full Name</label>
            <input type="text" id="fullname" name="fullname" className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input type="email" id="email" name="email" className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input type="password" id="password" name="password" className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 w-full rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">Sign Up</button>
        </form>
        <p className="text-gray-400 text-sm mt-4">Already have an account? <span className="text-purple-600 cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
      </div>
    </div>
    <Footer/>
    </div>
   
  );
};

export default SignupPage;

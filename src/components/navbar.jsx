import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaBell, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate function from React Router
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change to true/false based on actual authentication state

  const handleLogout = () => {
    setIsLoggedIn(false); // Update authentication state
    // Perform logout logic (clear tokens, etc.)
    // Redirect or update state as needed after logout
  };

  return (
    <nav className="bg-gray-900 text-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="text-xl font-bold text-white focus:outline-none"
        >
          Learning Destiny
        </button>
        <div className="relative text-gray-600">
  <input
    type="text"
    className="bg-gray-800 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-96" // Increased width to w-96
    placeholder="Search for anything"
  />
  <button
    type="submit"
    onClick={() => console.log('Search clicked')} // Replace with search logic
    className="absolute right-0 top-0 mt-3 mr-4"
  >
    <FaSearch className="text-gray-400" />
  </button>
</div>

      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="hover:text-white focus:outline-none"
        >
          Learning Destiny Business
        </button>
        <button
          onClick={() => navigate('/')}
          className="hover:text-white focus:outline-none"
        >
          Teach on Learning Destiny
        </button>
        <button
          onClick={() => navigate('/')}
          className="hover:text-white focus:outline-none"
        >
          My learning
        </button>
        <FaBell className="hover:text-white cursor-pointer" />
        <FaShoppingCart className="hover:text-white cursor-pointer" />
        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle className="hover:text-white cursor-pointer" />
            <FaChevronDown className="absolute right-0 top-0 mt-2 text-gray-400" />
            <ul className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
              <li>
                <button
                  onClick={() => navigate('/profile')}
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white focus:outline-none"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-white focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <button
              onClick={() => navigate('/login')}
              className="hover:text-white focus:outline-none"
            >
              Login
            </button>
            <span className="text-gray-400 mx-2">/</span>
            <button
              onClick={() => navigate('/signup')}
              className="hover:text-white focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

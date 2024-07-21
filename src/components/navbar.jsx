import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaBell, FaUserCircle, FaChevronDown, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform logout logic (clear tokens, etc.)
    // Redirect or update state as needed after logout
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className={`bg-${isDarkMode ? 'gray-900' : 'gray-100'} text-${isDarkMode ? 'gray-200' : 'gray-900'} px-4 py-3`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Search */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} focus:outline-none`}
          >
            Learning Destiny
          </button>
          <div className="relative text-gray-600 ml-4 hidden md:block">
            <input
              type="text"
              className={`bg-${isDarkMode ? 'gray-800' : 'gray-200'} h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-96`}
              placeholder="Search for anything"
            />
            <button
              type="submit"
              onClick={() => console.log('Search clicked')}
              className="absolute right-0 top-0 mt-3 mr-4"
            >
              <FaSearch className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Hamburger Menu (visible on mobile) */}
        <div className="md:hidden">
          {!showMenu ? (
            <button
              onClick={() => setShowMenu(true)}
              className="text-gray-400 focus:outline-none"
            >
              <FaBars className="text-2xl" />
            </button>
          ) : (
            <button
              onClick={closeMenu}
              className="text-gray-400 focus:outline-none"
            >
              <FaTimes className="text-2xl" />
            </button>
          )}
        </div>

        {/* Right Side Menu Items */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate('/BusinessForm')}
            className="hover:text-white focus:outline-none"
          >
            Learning Destiny Business
          </button>
          <button
            onClick={() => navigate('/teach')}
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
          <button onClick={toggleTheme} className="focus:outline-none">
            {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-500" />}
          </button>
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
            <div className="flex items-center">
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
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-16 left-0 right-0 bg-${isDarkMode ? 'gray-900' : 'gray-100'} z-10 md:hidden ${showMenu ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-center py-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white focus:outline-none mb-4"
          >
            Learning Destiny Business
          </button>
          <button
            onClick={() => navigate('/teach')}
            className="text-gray-300 hover:text-white focus:outline-none mb-4"
          >
            Teach on Learning Destiny
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white focus:outline-none mb-4"
          >
            My learning
          </button>
          <FaBell className="text-gray-300 hover:text-white cursor-pointer mb-4" />
          <FaShoppingCart className="text-gray-300 hover:text-white cursor-pointer mb-4" />
          {isLoggedIn ? (
            <div className="relative">
              <FaUserCircle className="text-gray-300 hover:text-white cursor-pointer mb-4" />
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
            <div className="flex items-center">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                Login
              </button>
              <span className="text-gray-400 mx-2">/</span>
              <button
                onClick={() => navigate('/signup')}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
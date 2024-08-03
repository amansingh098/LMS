import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-white">Learning Destiny</div>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/" className="hover:text-white">Courses</a></li>
            <li><a href="./Aboutus" className="hover:text-white">About Us</a></li>
            <li><a href="/" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <hr className="my-4 border-gray-700" />
        <div className="text-sm flex justify-between items-center">
          <div>&copy; 2024 Learning Destiny. All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-white">Privacy Policy</a>
            <span className="text-gray-400">|</span>
            <a href="/" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import Navbar from "../components/navbar.jsx"; // Import Navbar if you have it, or remove if not needed

const backgroundImageUrl = 'https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg'; // Replace with your Google image URL

const SignupPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set user display name
      await updateProfile(user, { displayName: username });

      // Create a document in the users collection
      await setDoc(doc(firestore, 'users', user.uid), {
        userId: user.uid,
        username: username,
        email: email,
        createdAt: new Date().toISOString()
      });

      console.log('User signed up and document created:', user);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <Navbar className="bg-black text-white py-4" /> {/* Adjust classes for black and white theme */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"> {/* Adjust background and text colors */}
          <h2 className="text-3xl font-bold mb-6 text-black text-center">Sign Up</h2> {/* Adjust text color */}
          {/* Error handling */}
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label> {/* Adjust label color */}
              <input type="text" id="username" className="bg-gray-200 h-10 px-3 rounded-lg w-full text-black outline-none focus:ring-2 focus:ring-purple-600" required /> {/* Adjust input field colors */}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label> {/* Adjust label color */}
              <input type="email" id="email" className="bg-gray-200 h-10 px-3 rounded-lg w-full text-black outline-none focus:ring-2 focus:ring-purple-600" required /> {/* Adjust input field colors */}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label> {/* Adjust label color */}
              <input type="password" id="password" className="bg-gray-200 h-10 px-3 rounded-lg w-full text-black outline-none focus:ring-2 focus:ring-purple-600" required /> {/* Adjust input field colors */}
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 w-full rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-600">Sign Up</button> {/* Adjust button colors */}
          </form>
          <p className="text-gray-500 text-sm mt-4">Already have an account? <span className="text-purple-600 cursor-pointer" onClick={() => navigate('/login')}>Login</span></p> {/* Adjust text color */}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
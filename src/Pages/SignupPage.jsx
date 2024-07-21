import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import Navbar from "../components/navbar.jsx"; // Import Navbar if you have it, or remove if not needed
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const backgroundImageUrl = 'https://static.vecteezy.com/system/resources/previews/004/461/779/non_2x/abstract-wavy-background-in-pastel-color-design-sweet-color-free-vector.jpg';

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
      toast.success('Signup successful!', {
        position: toast.POSITION.TOP_CENTER,
      });

      // Navigate to the login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
      toast.error(`Error: ${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      {/* Add Navbar if needed */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-6 text-black text-center">Sign Up</h2>
          {/* Error handling */}
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                className="bg-gray-200 h-10 px-3 rounded-lg w-full text-black outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                className="bg-gray-200 h-10 px-3 rounded-lg w-full text-black outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                className="bg-gray-200 h-10 px-3 rounded-lg w-full text-black outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 w-full rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Sign Up
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            Already have an account? <span className="text-purple-600 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
      <ToastContainer />
      {/* Add Footer if needed */}
    </div>
  );
};

export default SignupPage;
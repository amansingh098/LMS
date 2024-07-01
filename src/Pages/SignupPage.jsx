import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

function SignupPage() {
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
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Sign Up</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
            <input type="text" id="username" ref={usernameRef} className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
            <input type="email" id="email" ref={emailRef} className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <input type="password" id="password" ref={passwordRef} className="bg-gray-700 h-10 px-3 rounded-lg w-full text-white outline-none focus:ring-2 focus:ring-purple-600" required />
          </div>
          <button type="submit" className="bg-purple-600 text-white py-2 px-4 w-full rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">Sign Up</button>
        </form>
        <p className="text-gray-400 text-sm mt-4">Already have an account? <span className="text-purple-600 cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
      </div>
    </div>
  );
}

export default SignupPage;

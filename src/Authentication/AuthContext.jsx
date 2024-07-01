import React, { useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase'; // Assuming firestore is imported from firebase

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        console.log('Current User:', user); 
      } else {
        setCurrentUser(null); // Ensure currentUser is explicitly set to null on logout or if no user is authenticated
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signup(email, password, username) {
    try {
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      await createUserDocument(credential.user, username);
      return credential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }
  
  async function createUserDocument(user, username) {
    try {
      await firestore.collection('users').doc(user.uid).set({
        username: username,
        email: user.email
        // You can add more fields as needed
      });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

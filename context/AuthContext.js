import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FB_AUTH } from '../firebaseconfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Inscription d'un nouvel utilisateur
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(FB_AUTH, email, password);
  };

  // Connexion d'un utilisateur
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(FB_AUTH, email, password);
  };

  // Déconnexion de l'utilisateur
  const logOut = () => {
    return signOut(FB_AUTH);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FB_AUTH, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logOut,
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};

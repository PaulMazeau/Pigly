import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import { setDoc } from 'firebase/firestore';

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

  // Rester d'un password oublié par email de l'utilisateur
  const resetPassword = (email) => {
    return sendPasswordResetEmail(FB_AUTH, email);
  }

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
    resetPassword,
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};

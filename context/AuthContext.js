import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import { setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState({});

  // Inscription d'un nouvel utilisateur
  const signUp = async (email, password, firstName, lastName) => {
    const userCredential = await createUserWithEmailAndPassword(FB_AUTH, email, password);
    const user = userCredential.user;
  
    // Enregistrement des informations de l'utilisateur dans Firestore
    await setDoc(doc(FB_DB, 'users', user.uid), {
      FirstName: firstName,
      LastName: lastName,
      // Vous pouvez ajouter d'autres champs si nécessaire
    });
  
    return user;
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
    const unsubscribe = onAuthStateChanged(FB_AUTH, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userProfileRef = doc(FB_DB, 'users', user.uid);
        const userProfileSnap = await getDoc(userProfileRef);
        if (userProfileSnap.exists()) {
          setProfile(userProfileSnap.data());
        } else {
          setProfile({});
        }
      } else {
        setProfile({});
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    profile,
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

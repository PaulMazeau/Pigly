import { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FB_AUTH, FB_DB } from '../firebaseconfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FB_AUTH, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Récupération des données de profil de l'utilisateur depuis Firestore
        const userProfileRef = doc(FB_DB, 'users', user.uid);
        const userProfileSnap = await getDoc(userProfileRef);
        if (userProfileSnap.exists()) {
          setProfile(userProfileSnap.data());
        } else {
          // Pas de document pour cet utilisateur, vous pouvez choisir de le créer ici si nécessaire
          setProfile({});
        }
      } else {
        setProfile({});
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    profile,
    // Ajoutez des fonctions pour s'inscrire, se connecter, se déconnecter si nécessaire
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

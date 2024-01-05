import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { useAuth } from './AuthContext';

const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let unsubscribeFromUser = () => {};

    if (currentUser) {
      const userProfileRef = doc(FB_DB, 'users', currentUser.uid);

      // S'abonner aux mises à jour du document utilisateur
      unsubscribeFromUser = onSnapshot(userProfileRef, (doc) => {
        if (doc.exists()) {
          setProfile({
            ...doc.data(),
            uid: currentUser.uid
          });
        } else {
          console.log("No such user!");
        }
      });
    }

    return () => {
      unsubscribeFromUser(); // Nettoyer l'abonnement lors du démontage du composant
    };
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);
  const value = {
    profile,
    location,
  };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
  };
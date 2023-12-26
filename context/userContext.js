import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { doc, getDoc } from 'firebase/firestore';
import { FB_DB } from '../firebaseconfig';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({});
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const userProfileRef = doc(FB_DB, 'users', currentUser.uid);
        console.log("currentUser.uid :",currentUser.uid);
        const userProfileSnap = await getDoc(userProfileRef);
        if (userProfileSnap.exists()) {
          setProfile(userProfileSnap.data());
        }
      }
    };

    fetchProfile();
  }, [currentUser]);
  console.log("Profile :",profile);

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

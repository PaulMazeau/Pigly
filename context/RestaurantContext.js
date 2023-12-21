import React, { createContext, useState, useEffect } from 'react';
import { FB_DB } from '../firebaseconfig'; // Ajustez le chemin selon la structure de votre projet
import { collection, onSnapshot } from 'firebase/firestore';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const restaurantsCollectionRef = collection(FB_DB, 'restaurants');

  useEffect(() => {
    const fetchRestaurants = () => {
      onSnapshot(restaurantsCollectionRef, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRestaurants(data);
      });
    };

    fetchRestaurants();

    // Détacher le listener lorsque le composant est démonté
    return () => {
      restaurantsCollectionRef();
    };
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;

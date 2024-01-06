// Dans MenuContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { FB_DB } from "../firebaseconfig";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Créer une fonction pour affiché les catégories basées sur l'ID du restaurant
  const fetchCategories = useCallback(async (restaurantId) => {
    if (restaurantId) {
      const docSnap = await getDocs(
        collection(FB_DB, "restaurants", restaurantId, "Categories")
      );
      if (docSnap.empty) {
        console.log("No matching documents.");
        return;
      }
      let fetchedData = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const orderedData = reorderCategories(fetchedData);
      setCategories(orderedData);
    }
  });
  // Ordre souhaité des catégories
  const ORDERED_CATEGORIES = [
    "aperitif",
    "entrees",
    "plats",
    "spécialite",
    "dessert",
    "alcool",
    "boissons",
  ];
  // Fonction pour réordonner les catégories
  const reorderCategories = (categories) => {
    // Normaliser et trier sans modifier les IDs originaux
    const orderedCategories = categories
      .map((category) => ({
        ...category,
        normalizedId: category.id
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      }))
      .sort((a, b) => {
        const indexA = ORDERED_CATEGORIES.indexOf(a.normalizedId);
        const indexB = ORDERED_CATEGORIES.indexOf(b.normalizedId);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });

    // Retirer le champ normalizedId pour ne pas le rendre avec les données
    return orderedCategories.map(({ normalizedId, ...rest }) => rest);
  };

  const [categoryItems, setCategoryItems] = useState([]);
  // Fonctions pour Affiché les Entrées, Dessert ect Saufs les Plats car les plats on a une sous-catégorie
  const fetchCategoryItems = useCallback(async (restaurantId, categoryId) => {
    try {
      // Récupérer la catégorie
      const categoryDocRef = doc(
        FB_DB,
        "restaurants",
        restaurantId,
        "Categories",
        categoryId
      );
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (!categoryDocSnap.exists()) {
        console.log("Document de catégorie non trouvé.");
        return;
      }

      // Accéder à la sous-collection unique (supposons que son nom est identique à l'ID de catégorie en minuscules)
      const subCollectionName = categoryId.toLowerCase();
      const itemsCollectionRef = collection(categoryDocRef, subCollectionName);
      const querySnapshot = await getDocs(itemsCollectionRef);

      // Récupérer et stocker les données des éléments de catégorie
      const itemsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategoryItems(itemsData); // Mettre à jour l'état avec les éléments récupérés
    } catch (error) {
      console.error("Erreur de récupération des éléments de catégorie:", error);
    }
  }, []);

  return (
    <MenuContext.Provider
      value={{ categories, categoryItems, fetchCategories, fetchCategoryItems }}
    >
      {children}
    </MenuContext.Provider>
  );
};

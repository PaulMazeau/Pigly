import { createContext, useState, useEffect, useContext } from "react";
import { FB_DB } from "../firebaseconfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  doc,
  count,
} from "firebase/firestore";

const AvisContext = createContext();

export const useAvis = () => useContext(AvisContext);

export const AvisProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour ajouter un nouvel avis ou mettre à jour un avis existant
  const addOrUpdateReview = async (restaurantId, userId, score, comment) => {
    setIsLoading(true);
    try {
      const userRef = doc(FB_DB, "users", userId);
      const userSnap = await getDoc(userRef);

      let userReviews = userSnap.exists() ? userSnap.data().reviews || [] : [];
      let existingReview = userReviews.find(
        (review) => review.restaurantId === restaurantId
      );

      if (existingReview) {
        // Mise à jour de l'avis existant
        const reviewRef = doc(FB_DB, "reviews", existingReview.reviewId);
        await updateDoc(reviewRef, { score, comment, date: new Date() });
        console.log("Avis mis à jour");
      } else {
        // Ajout d'un nouvel avis
        const reviewRef = await addDoc(collection(FB_DB, "reviews"), {
          restaurantId,
          userId,
          score,
          comment,
          date: new Date(),
        });
        userReviews.push({ restaurantId, reviewId: reviewRef.id });
        await updateDoc(userRef, { Reviews: userReviews });
        console.log("Nouvel avis ajouté");
      }

      const recommendationScore = count > 0 ? (totalScore / (count * 2)) * 100 : 0; // Formule pour le pourcentage

      // Mise à jour du restaurant avec le nouveau score
      const restaurantRef = doc(FB_DB, "restaurants", restaurantId);
      await updateDoc(restaurantRef, {
        recommendationScore,
      });

      console.log(
        `Mise à jour réussie : Le restaurant est recommandé à ${recommendationScore}%`
      );
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout ou de la mise à jour de l'avis:",
        error
      );
    }
    setIsLoading(false);
  };

  return (
    <AvisContext.Provider value={{ addOrUpdateReview, isLoading }}>
      {children}
    </AvisContext.Provider>
  );
};

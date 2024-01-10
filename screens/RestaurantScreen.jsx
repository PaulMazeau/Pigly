import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RestaurantDescription from '../components/Restaurant/RestaurantDescription';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import RestaurantMap from '../components/Restaurant/RestaurantMap';
import RestaurantReview from '../components/Restaurant/RestaurantReview';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';
import RestaurantContext from '../context/RestaurantContext';
import Rating from '../components/Restaurant/RestaurantRating';

import Like from '../assets/icons/LikeThis.svg';
import Liked from '../assets/icons/LikedThis.svg';
import Dislike from '../assets/icons/DisLikeThis.svg';
import DisLiked from '../assets/icons/DisLikedThis.svg';
import Love from '../assets/icons/LoveThis.svg';
import Loved from '../assets/icons/LovedThis.svg';

import { FB_DB } from '../firebaseconfig';
import { useUser } from '../context/UserContext';
import { updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';

const RestaurantScreen = () => {

  const { restaurants } = useContext(RestaurantContext);
  const { profile } = useUser();
  

  // Utiliser useRoute pour accéder aux paramètres de la route
  const route = useRoute(); 
  
  // Récupérer l'ID du restaurant passé en paramètre
  const restaurantId = route.params?.restaurantId; 

  
  // Trouver le restaurant correspondant par ID
  const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId);
  
  console.log("Data du resto...");

  // Avis déjà posé ou non ?
  const [hasReviewed, setHasReviewed] = useState(false);
  useEffect(() => {
      console.log('Vérification des avis pour le restaurant', restaurantId, profile?.uid);
  
      const existingReview = profile?.Reviews?.find(review => review.restaurantId === restaurantId);
  
      if (existingReview) {
          setHasReviewed(true);
          console.log('Avis déjà posté pour ce restaurant', restaurantId, existingReview);
      } else {
          setHasReviewed(false);
          console.log('Avis non posté pour ce restaurant', restaurantId);
      }
  }, [restaurantId, profile?.uid, profile?.Reviews]);

  const [isFavorite, setIsFavorite] = useState(false);

  // Vérifier si le restaurant actuel est dans les favoris
  useEffect(() => {
    console.log('Vérification des favoris pour le restaurant', restaurant.id );
    if (profile?.Favoris?.includes(restaurant.id)) {
      setIsFavorite(true);
      console.log('Restaurant dans les favoris', restaurant.id, profile.Favoris);
    } else {
      setIsFavorite(false);
      console.log('Restaurant pas dans les favoris', restaurant.id, profile.Favoris);
    }
  }, [profile, restaurantId]);
  
  // Fonction pour ajouter aux favoris
  const addToFavorites = async () => {
    if (profile && profile.uid && restaurant.id) {
      const userRef = doc(FB_DB, 'users', profile.uid);
      try {
        await updateDoc(userRef, {
          Favoris: arrayUnion(restaurant.id)
        });
        setIsFavorite(true); // Mettre à jour l'état
        console.log(`Restaurant ID: ${restaurant.id} ajouté aux favoris!`);
      } catch (error) {
        console.error('Erreur lors de l\'ajout aux favoris:', error);
      }
    } else {
      console.log('Informations manquantes pour ajouter aux favoris');
    }
  };

  // Fonction pour supprimer des favoris
  const removeFromFavorites = async () => {
    if (profile && profile.uid && restaurant.id) {
      const userRef = doc(FB_DB, 'users', profile.uid);
      try {
        await updateDoc(userRef, {
          Favoris: arrayRemove(restaurant.id)
        });
        setIsFavorite(false); // Mettre à jour l'état
        console.log(`Restaurant ID: ${restaurant.id} retiré des favoris!`);
      } catch (error) {
        console.error('Erreur lors du retrait des favoris:', error);
      }
    } else {
      console.log('Informations manquantes pour retirer des favoris');
    }
  };

  const navigation = useNavigation();
  const UserId = profile.uid;
  // Fonction pour rediriger vers la page de dépôt d'avis
  const reviewRedirection = () => {
    navigation.navigate('ReviewScreen', { restaurantId: restaurantId, userId: UserId });
  };
  const handleRating = (newRating) => {
    // Ici, vous pouvez appeler votre fonction back-end pour enregistrer la nouvelle note
    console.log(`Nouvel avis pour le restaurant ${restaurantId} : ${newRating}`);
    // Par exemple : updateRestaurantRating(restaurantId, newRating);
  };

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
      <Image source={{ uri: restaurant?.photo[0] }} style={styles.image} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.title}>{restaurant?.nom}</Text>

        <View style={styles.tagContainer}>
          {restaurant.tag.map((tag, index) => {
            return (
              // Afficher dynamiquement les tags
              <View key={index}>
                <RestaurantTag text={tag} />
              </View>
            );
          })}
        </View>
        {isFavorite ? (
          <Button title="Retirer des favoris" onPress={removeFromFavorites} />
        ) : (
          <Button title="Ajouter aux favoris" onPress={addToFavorites} />
        )}
        
        <Button
                title={hasReviewed ? "Mettre à jour l'avis" : "Poster un avis"}
                onPress={reviewRedirection}
            />
        <Rating onRating={handleRating} />
        <View style={styles.gridContainer}>
          <View style={styles.leftColumn}>
            <RestaurantDescription />
            <RestaurantReview />
          </View>
          <View style={styles.rightColumn}>
            <RestaurantMap />
          </View>
        </View>
        <RestaurantMenu restaurantId={restaurantId} />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 14
  },
  image: {
    width: '100%',
    height: 435,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 20,
    marginBottom: 10
  },
  leftColumn: {
    flex: 1,
    paddingRight: 5
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 5
  }
});

export default RestaurantScreen;
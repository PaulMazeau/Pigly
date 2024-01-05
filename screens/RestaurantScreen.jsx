import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RestaurantDescription from '../components/Restaurant/RestaurantDescription';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import RestaurantMap from '../components/Restaurant/RestaurantMap';
import RestaurantReview from '../components/Restaurant/RestaurantReview';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';
import RestaurantContext from '../context/RestaurantContext';
import { FB_DB } from '../firebaseconfig';
import { useUser } from '../context/userContext';
import { updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';
import { useMenu } from '../context/MenuContext';

const RestaurantScreen = () => {

  const { restaurants } = useContext(RestaurantContext);
  const { profile } = useUser();
  
  // Récupérer les catégories du menu
  const { categories, fetchCategories } = useMenu();

  // Utiliser useRoute pour accéder aux paramètres de la route
  const route = useRoute(); 
  
  // Récupérer l'ID du restaurant passé en paramètre
  const restaurantId = route.params?.restaurantId; 

  
  // Trouver le restaurant correspondant par ID
  const restaurant = restaurants.find(restaurant => restaurant.id === restaurantId);
  
  console.log("Data du resto...");
  
  // Affiché les menus pour RestaurantMenu.jsx
  useEffect(() => {
    if (restaurantId) {
      fetchCategories(restaurantId);
    }
  }, [restaurantId]);

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
        <View style={styles.gridContainer}>
          <View style={styles.leftColumn}>
            <RestaurantDescription />
            <RestaurantReview />
          </View>
          <View style={styles.rightColumn}>
            <RestaurantMap />
          </View>
        </View>
        <RestaurantMenu categories={categories} restaurantId={restaurantId} />
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
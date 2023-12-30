import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import RestaurantDescription from '../components/Restaurant/RestaurantDescription';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import RestaurantMap from '../components/Restaurant/RestaurantMap';
import RestaurantReview from '../components/Restaurant/RestaurantReview';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';
import RestaurantContext from '../context/RestaurantContext';
import { FB_DB } from '../firebaseconfig';
import { useUser } from '../context/UserContext';
import { updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';

const RestaurantScreen = () => {

  const { restaurants } = useContext(RestaurantContext);
  const { profile } = useUser();
  const restaurant = restaurants[0];

  const [isFavorite, setIsFavorite] = useState(false);

  // Vérifier si le restaurant actuel est dans les favoris
  useEffect(() => {
    if (profile?.Favoris?.includes(restaurant.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [profile, restaurant.id]);

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
          <RestaurantTag text="Bruyant" />
          <RestaurantTag text="Food market" />
          <RestaurantTag text="Italien" />
          <RestaurantTag text="Italien" />
          <RestaurantTag text="€€€€" />
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

        <RestaurantMenu />
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

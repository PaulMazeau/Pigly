import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RestaurantDescription from '../components/Restaurant/RestaurantDescription';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import RestaurantMap from '../components/Restaurant/RestaurantMap';
import RestaurantReview from '../components/Restaurant/RestaurantReview';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';
import RestaurantContext from '../context/RestaurantContext';
import { useUser } from '../context/UserContext';

const RestaurantScreen = () => {
  const { restaurants } = useContext(RestaurantContext);
  const { likes, addLike, removeLike } = useUser();

  const route = useRoute();
  const restaurantId = route.params?.restaurantId;
  const restaurant = restaurants.find(r => r.id === restaurantId);

  const isFavorite = likes.includes(restaurantId);

  
  const addToFavorites = () => {
    addLike(restaurantId);
  };

  const removeFromFavorites = () => {
    removeLike(restaurantId);
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
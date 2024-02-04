import React, { useContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableWithoutFeedback, Vibration } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import RestaurantDescription from '../components/Restaurant/RestaurantDescription';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import RestaurantMap from '../components/Restaurant/RestaurantMap';
import RestaurantReview from '../components/Restaurant/RestaurantReview';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';
import RestaurantContext from '../context/RestaurantContext';
import RestaurantRating from '../components/Restaurant/RestaurantRating';
import { useUser } from '../context/UserContext';
import Save from '../assets/icons/Save.svg';
import SaveFill from '../assets/icons/SaveFill.svg';
import * as Haptics from 'expo-haptics';

const RestaurantScreen = () => {
  const { restaurants } = useContext(RestaurantContext);

  const route = useRoute();
  const restaurantId = route.params?.restaurantId;
  const restaurant = restaurants.find(r => r.id === restaurantId);

  const { likes, addLike, removeLike, profile } = useUser(); // Utilisez useUser
  const [isSaved, setIsSaved] = useState(likes.includes(restaurantId));

  useEffect(() => {
    setIsSaved(likes.includes(restaurantId)); // Mettez à jour isSaved lorsque les likes changent
  }, [likes, restaurantId]);

  const handleSaveClick = () => {
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
    if (isSaved) {
      removeLike(restaurantId); // Appeler removeLike si le restaurant est déjà en favori
    } else {
      addLike(restaurantId); // Appeler addLike si le restaurant n'est pas en favori
    }
  };

  const navigation = useNavigation();
  const UserId = profile.uid;

  // Logique des pouces qui redirige vers ReviewScreen en fonction du pouce sélectionné
  const handleRating = (rating) => {
    let score;
    switch (rating) {
      case 'dislike':
        score = 0;
        break;
      case 'like':
        score = 1;
        break;
      case 'love':
        score = 2;
        break;
      default:
        score = 0; // Par défaut, si aucun cas ne correspond
    }
  
    navigation.navigate('ReviewScreen', { restaurantId: restaurantId, userId: UserId, initialScore: score });
  };

  return (
    <View style={styles.page}>
      <StatusBar style="light" />
        
        <Image source={{ uri: restaurant?.photo[0] }} style={styles.image} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.row}>
      <Text style={styles.title}>{restaurant?.nom}</Text>
      <TouchableWithoutFeedback onPress={handleSaveClick} >
          {isSaved ? <SaveFill style={styles.save} width={48} height={48} /> : <Save style={styles.save} width={48} height={48}/>}
      </TouchableWithoutFeedback>
      </View>
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
        

        <RestaurantRating onRating={handleRating} />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  save: {
    marginTop: -10,
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
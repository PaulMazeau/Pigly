import React, {useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import RestaurantDescription from '../components/Restaurant/RestaurantDescription';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import RestaurantMap from '../components/Restaurant/RestaurantMap';
import RestaurantReview from '../components/Restaurant/RestaurantReview';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';
import RestaurantContext from '../context/RestaurantContext';

const RestaurantScreen = () => {

  const { restaurants } = useContext(RestaurantContext);
  const restaurant = restaurants[0];

  return (
    <View style={styles.page}>
      <StatusBar style="light"/>
      <Image source={{ uri: restaurant?.photo[0] }} style={styles.image}/>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}> 
        <Text style={styles.title}>{restaurant?.nom}</Text>
        <View style={styles.tagContainer}>
          <RestaurantTag text="Bruyant" />
          <RestaurantTag text="Food market" />
          <RestaurantTag text="Italien" />
          <RestaurantTag text="Italien" />
          <RestaurantTag text="€€€€" />
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.leftColumn}>
            <RestaurantDescription />
            <RestaurantReview />
          </View>
          <View style={styles.rightColumn}>
            <RestaurantMap />
          </View>
        </View>

        <RestaurantMenu/>
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

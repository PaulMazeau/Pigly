import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import RestaurantContext from '../context/RestaurantContext';
import RestaurantCard from '../components/Home/RestaurantCard';
import Header from '../components/Reusable/Header';

export default function Map({ navigation }) {
  const { restaurants } = useContext(RestaurantContext);
  console.log("Data des restaurants pour Map :",{ restaurants });
  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.subTitle}>Tous nos restaurants</Text>
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  space: {
    height: 20,
  },
});

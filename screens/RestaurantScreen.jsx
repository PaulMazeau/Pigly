import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import RestaurantDescription from '../components/Restaurant/RestaurantDescription';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import RestaurantMap from '../components/Restaurant/RestaurantMap';
import RestaurantReview from '../components/Restaurant/RestaurantReview';
import RestaurantMenu from '../components/Restaurant/RestaurantMenu';

const RestaurantScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <Image source={require('../assets/images/La_Felicita.jpg')} style={styles.image}/>
      <ScrollView showsVerticalScrollIndicator={false}> 
        <Text style={styles.title}>La felicita</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 435,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 20
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

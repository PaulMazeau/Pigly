import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import RestaurantCarroussel from '../components/Home/RestaurantCarroussel';
import { main } from '../constants/color';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import ImageCarroussel from '../components/Home/ImageCarroussel';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageCarroussel/>
      <Button 
        title="Aller sur une page restaurant" 
        onPress={() => navigation.navigate('RestaurantScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.BgColor,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

import { StyleSheet, View, Button, Text } from 'react-native';
import React from 'react';
import Header from '../components/Reusable/Header';
import RestaurantCarroussel from '../components/Home/RestaurantCarroussel';
import RestaurantTag from '../components/Restaurant/RestaurantTag';
import Top10Slider from '../components/Home/Top10Slider';


export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header/>
      <RestaurantCarroussel/>
      <View style={styles.subTitleBlock}>
        <Text style={styles.subTitle}>Les 10 meilleurs</Text>
        <RestaurantTag text='Lyon'/>
      </View>
      <Top10Slider/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  subTitleBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700'
  }
});

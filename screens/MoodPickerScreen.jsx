import React, { useState, useRef } from 'react';
import { StyleSheet, Text, Animated, Button, View } from 'react-native';
import BarMoodCard from '../components/MoodPicker/BarMoodCard';
import RestaurantMoodCard from '../components/MoodPicker/RestaurantMoodCard';
import Header from '../components/Reusable/Header'

export default function MoodPickerScreen() {


  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.description}>Donne nous ton mood on te propose une liste d’établissement autour de toi. </Text>
      <RestaurantMoodCard/>
      <BarMoodCard/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14
  },
  description: {
    marginTop: 32,
    marginBottom: 40,
  },
 
});

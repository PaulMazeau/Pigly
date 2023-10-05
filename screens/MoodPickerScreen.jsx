import React, { useState, useRef } from 'react';
import { StyleSheet, Text, Animated, Button, View } from 'react-native';
import MoodCard from '../components/MoodPicker/MoodCard';


export default function MoodPickerScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const position = useRef(new Animated.Value(0)).current; // 0: superposé, 1: déplié

  const toggleCards = () => {
    console.log('test')
  };

  const card1Style = {
    backgroundColor: 'blue'
  };

  const card2Style = {
    backgroundColor: 'green'
  };

  const card3Style = {
    backgroundColor: 'red'
  };

  return (
    <View style={styles.container}>
      <View style={styles.TitleContainer}>
        <Text>Restaurant</Text>
        <Button title="Voir plus" onPress={toggleCards} />
      </View>
      <MoodCard style={card1Style} text="Card 1" />
      <MoodCard style={card2Style} text="Card 2" />
      <MoodCard style={card3Style} text="Card 3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: 'auto',
    alignItems: 'center'
  },
  card: {
    width: '90%',
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
});

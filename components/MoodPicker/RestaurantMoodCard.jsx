import React, { useState, useRef } from 'react';
import { StyleSheet, Text, Animated, View, Button, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RestaurantMoodCard() {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const position = useRef(new Animated.Value(0)).current; // 0: superposé, 1: déplié

  const toggleCards = () => {
    Animated.spring(position, {
      toValue: isExpanded ? 0 : 1,
      useNativeDriver: false, // À noter que spring ne supporte pas useNativeDriver: true
      friction: 5, // contrôle "l'effet rebondissant"
      tension: 20, // contrôle la vitesse
    }).start();

    setIsExpanded(!isExpanded);
  };

  const cardShadow = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2, // Pour Android
  };

  const containerHeight = position.interpolate({
    inputRange: [0, 1],
    outputRange: [180, 300]  // Remplacez par les valeurs réelles que vous voulez
  });

  const card1Style = {
    transform: [{
      translateY: position.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0], // Ne bouge pas
      })
    }],
    backgroundColor: 'blue',
    zIndex: 3,
  };

  const card2Style = {
    transform: [{
      translateY: position.interpolate({
        inputRange: [0, 1],
        outputRange: [-60, 0], // Bouge vers le haut
      }),
    }],
    width: position.interpolate({
      inputRange: [0, 1],
      outputRange: ['95%', '100%'], // Réduire la width quand ce n'est pas étendu
    }),
    backgroundColor: 'green',
    zIndex: 2,
  };

  const card3Style = {
    transform: [{
      translateY: position.interpolate({
        inputRange: [0, 1],
        outputRange: [-120, 0], // Bouge encore plus vers le haut
      }),
    }],
    width: position.interpolate({
      inputRange: [0, 1],
      outputRange: ['90%', '100%'], // Réduire davantage la width quand ce n'est pas étendu
    }),
    backgroundColor: 'red',
    zIndex: 1,
  };

  return (
    <Animated.View style={{ ...styles.container, height: containerHeight }}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>Restaurant</Text>
        <Button title={isExpanded ? "Voir moins" : "Voir plus"} onPress={toggleCards} />
      </View>
      <View style={styles.cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('HomeScreen')}><Animated.View style={[styles.card, card1Style, cardShadow]}/></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('HomeScreen')}><Animated.View style={[styles.card, card2Style, cardShadow]}/></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('HomeScreen')}><Animated.View style={[styles.card, card3Style, cardShadow]}/></TouchableWithoutFeedback>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({

  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginHorizontal: 'auto',
    alignItems: 'center',
    marginBottom: 20
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 12,
  },
  Title: {
    fontSize: 20,
    fontWeight: '700'
  }
});

export default RestaurantMoodCard;

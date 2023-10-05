import React from 'react';
import { StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Card({ style, text }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.touchable} onPress={() => navigation.navigate('HomeScreen')}>
      <Animated.View style={[styles.card, style]}>
        <Text>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    width: '90%',
    alignItems: 'center',
  },
  card: {
    width: '100%', 
    height: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Card;

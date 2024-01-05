import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Map({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Ici il y aura une map</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

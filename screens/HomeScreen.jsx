import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur Pigly app, l'app pour bien manger</Text>
      <Button 
        title="Aller au MoodPicker" 
        onPress={() => navigation.navigate('RestaurantScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

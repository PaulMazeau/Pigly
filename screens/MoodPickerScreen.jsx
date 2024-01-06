import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, Alert } from 'react-native';
import Header from '../components/Reusable/Header';
import RestaurantMoodCard from '../components/MoodPicker/RestaurantMoodCard';
import BarMoodCard from '../components/MoodPicker/BarMoodCard';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';

export default function MoodPickerScreen() {
  const navigation = useNavigation();
  const { profile, location } = useUser();

  const formattedLocation = location
    ? `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
    : 'Localisation non disponible';

  console.log({ formattedLocation });

  const [isLoading, setIsLoading] = useState(false);

  const callHelloWorldFunction = async () => {
    setIsLoading(true);
    try {
      // Remplacez l'URL par celle de votre fonction Cloud
      const response = await fetch('https://us-central1-pigly-7ae8a.cloudfunctions.net/helloWorld', {
        method: 'GET', // ou 'POST' si votre fonction attend une requête POST
      });

      if (!response.ok) {
        throw new Error('Problème de réponse du serveur');
      }

      const data = await response.text();
      Alert.alert('Réponse de la fonction:', data);
    } catch (error) {
      Alert.alert('Erreur', error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text>Bonjour {profile.FirstName} {profile.LastName}!</Text>
      <Text style={styles.description}>Donne nous ton mood on te propose une liste d’établissement autour de toi.</Text>
      <RestaurantMoodCard />
      <BarMoodCard />
      <Button
        title="Dire Bonjour"
        onPress={callHelloWorldFunction}
        disabled={isLoading}
      />
      {isLoading && <Text>Chargement de la réponse...</Text>}
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
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
});

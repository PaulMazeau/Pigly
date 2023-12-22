import React, { useEffect } from 'react';
import { StyleSheet, Text, Animated, Button, View } from 'react-native';
import BarMoodCard from '../components/MoodPicker/BarMoodCard';
import RestaurantMoodCard from '../components/MoodPicker/RestaurantMoodCard';
import Header from '../components/Reusable/Header'
import { signOut } from 'firebase/auth';
import { FB_AUTH } from '../firebaseconfig'; 
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext'; 

export default function MoodPickerScreen() {

  const navigation = useNavigation();
  const { profile, location } = useUser();

  const formattedLocation = location
  ? `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
  : 'Localisation non disponible';

  console.log({formattedLocation})

  const handleSignOut = () => {
    signOut(FB_AUTH)
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    })
    .catch((error) => {
      console.error('Erreur lors de la déconnexion:', error);
    });
  };

  //Etat de chargement o cas ou ca met du temps a charger
  if (!profile) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View style={styles.container}>
      <Header/>
      <Text>Bonjour {profile.FirstName} {profile.LastName}!</Text>
      <Text style={styles.description}>Donne nous ton mood on te propose une liste d’établissement autour de toi. </Text>
      <RestaurantMoodCard/>
      <BarMoodCard/>
    
      <Button
        title="Déconnexion"
        onPress={handleSignOut}
      />
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

import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import RestaurantContext from '../context/RestaurantContext';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map({ navigation }) {
  const [mapRegion, setMapRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { restaurants } = useContext(RestaurantContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission refusée", "L'accès à la localisation est nécessaire pour cette fonctionnalité.");
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        Alert.alert("Erreur", "Impossible de récupérer la localisation.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : mapRegion ? (
        <MapView
          style={{ alignSelf: 'stretch', height: '100%' }}
          region={mapRegion}
        >
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: restaurant.position.lat,
                longitude: restaurant.position.long,
              }}
            />
          ))}
        </MapView>
      ) : (
        <View>
          <Text>La map est en cours de chargement</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    flex: 1,
    position: 'relative', // Nécessaire pour le positionnement absolu des enfants
  },
});

import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Reusable/Header'
import { signOut } from 'firebase/auth';
import { FB_AUTH, FB_DB } from '../firebaseconfig';
import { onSnapshot, doc } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import RestaurantContext from '../context/RestaurantContext';
import RestaurantCard from '../components/Home/RestaurantCard';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { profile } = useUser();
    console.log({ profile });

    const { restaurants } = useContext(RestaurantContext);
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

    useEffect(() => {
        if (profile?.uid) {
            // abonner au document de l'utilisateur pour écouter les changements de favoris
            const unsubscribe = onSnapshot(doc(FB_DB, "users", profile.uid), (doc) => {
                const userFavoris = doc.data()?.Favoris || [];
                const updatedFavorites = restaurants.filter(restaurant =>
                    userFavoris.includes(restaurant.id)
                );
                setFavoriteRestaurants(updatedFavorites);
                console.log("Mise à jour des favoris en temps réel", updatedFavorites);
            });

            return () => unsubscribe();
        }
    }, [profile.uid, restaurants]);


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
        return <Text>Chargement..</Text>
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text>Bonjour {profile.FirstName} {profile.LastName}!</Text>
            <Text>ID du document Firebase: {profile.uid}</Text>
            <Text>Restaurants Favoris:</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerCarrousel}
                keyboardShouldPersistTaps="handled"
            >


                {favoriteRestaurants.length ? (
                    favoriteRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))
                ) : (
                    <Text>Aucun restaurant en favoris.</Text>
                )}
            </ScrollView>
            <Button
                title="Déconnexion"
                onPress={handleSignOut}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    containerCarrousel: {
        paddingTop: 10,
        flexDirection: 'row'
    },
    description: {
        marginTop: 32,
        marginBottom: 40,
    },
});
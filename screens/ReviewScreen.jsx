import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, TouchableOpacity, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Reusable/Header';
import { useUser } from '../context/UserContext';
import { useAvis } from '../context/AvisContext';

export default function Review({ navigation, route }) {
    const { restaurantId, userId } = route.params;
    const { profile } = useUser();
    const [score, setScore] = useState(1); // 0, 1, ou 2
    const [comment, setComment] = useState('');

    // Avis déjà posé ou non ?
    const [hasReviewed, setHasReviewed] = useState(false);
    useEffect(() => {
        console.log('Vérification des avis pour le restaurant', restaurantId, userId);
    
        const existingReview = profile?.Reviews?.find(review => review.restaurantId === restaurantId);
    
        if (existingReview) {
            setHasReviewed(true);
            console.log('Avis déjà posté pour ce restaurant', restaurantId, existingReview);
        } else {
            setHasReviewed(false);
            console.log('Avis non posté pour ce restaurant', restaurantId);
        }
    }, [restaurantId, userId, profile?.Reviews]);
    

    // Poster l'avis
    const handleSubmit = () => {
        console.log('Soumission de l\'avis...', restaurantId, userId, score, comment);
        addOrUpdateReview(restaurantId, userId, score, comment);
    };

    // Etat de chargement
    const { addOrUpdateReview, isLoading } = useAvis();
    if (isLoading) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.title}>ICI YAURA Lavis</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20 }}
                onChangeText={setComment}
                value={comment}
                placeholder="Votre avis..."
            />

            <TextInput
                style={{ height: 30, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20 }}
                onChangeText={(text) => setScore(Number(text))} // Convertit le texte en nombre
                value={String(score)}
                placeholder="Votre score 0,1,2"
                keyboardType="numeric"
            />
            {/* Bouton pour Soumettre l'Avis */}
            <Button
                title={hasReviewed ? "Mettre à jour l'avis" : "Poster un avis"}
                onPress={handleSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,
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

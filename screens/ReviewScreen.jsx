import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, TouchableOpacity, SafeAreaView, Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Reusable/Header';
import { useUser } from '../context/UserContext';
import { useAvis } from '../context/AvisContext';
import { main } from '../constants/color';
import LikeIcon from '../assets/icons/LikeThis.svg';
import DisLikeIcon from '../assets/icons/DisLikeThis.svg';
import LoveIcon from '../assets/icons/LoveThis.svg';

export default function Review({ navigation, route }) {
    const { profile } = useUser();
    const [comment, setComment] = useState('');
    const { restaurantId, userId, initialScore } = route.params;
    const [selectedScore, setSelectedScore] = useState(initialScore || 1); // J'ai changé 1 en 0 pour correspondre à votre gamme de scores

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

    // Animation state
    const scaleAnim = new Animated.Value(1);

    // Déclencher l'animation lors de la mise à jour du score
    const handlePress = (newScore) => {
        setSelectedScore(newScore);
        // Déclenche l'animation chaque fois qu'un score est sélectionné
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.5,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    // Fonction pour obtenir la couleur en fonction du score
    const getFillColor = (iconScore) => {
        switch (iconScore) {
            case 0:
                return selectedScore === 0 ? 'red' : 'grey'; // Dislike
            case 1:
                return selectedScore === 1 ? 'blue' : 'grey'; // Like
            case 2:
                return selectedScore === 2 ? 'green' : 'grey'; // Love
            default:
                return 'grey';
        }
    };

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
            <SafeAreaView style={styles.safeAreaView}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("RestaurantScreen", { restaurantId: restaurantId })}
                >
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <Text style={styles.title}>Ajouter un avis</Text>
            <View style={styles.sentimentContainer}>
                <TouchableOpacity onPress={() => handlePress(0)}>
                    <Animated.View style={[styles.iconWrapper, selectedScore === 0 && styles.selected]}>
                        <DisLikeIcon width={70} height={70} fill={getFillColor(0)} />
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(1)}>
                    <Animated.View style={[styles.iconWrapper, selectedScore === 1 && styles.selected]}>
                        <LikeIcon width={70} height={70} fill={getFillColor(1)} />
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(2)}>
                    <Animated.View style={[styles.iconWrapper, selectedScore === 2 && styles.selected]}>
                        <LoveIcon width={70} height={70} fill={getFillColor(2)} />
                    </Animated.View>
                </TouchableOpacity>

            </View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20 }}
                onChangeText={setComment}
                value={comment}
                placeholder="Votre avis..."
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
        backgroundColor: main.LogoBlack,
    },
    title: {
        color: '#fff', // Blanc
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sentimentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#ff69b4', // Rose
        borderRadius: 20,
        padding: 10,
        width: '80%', // ou la largeur souhaitée
    },
    iconWrapper: {
        padding: 10,
        // Ajouter d'autres styles si nécessaire
    },
    selected: {
        transform: [{ scale: 1.1 }], // Changez selon l'effet désiré
        // Ajouter d'autres styles pour l'icône sélectionnée
    },
    space: {
        height: 20,
    },
    backButton: {
        marginTop: 20,
        marginLeft: 10,
    },
    backText: {
        color: main.LogoPink,
        fontSize: 16,
    },
});

import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'

export default function Top10RestaurantCard({ restaurant }) {
    console.log("Data du restaurant pour RestaurantCard :",{ restaurant });
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/La_Felicita.jpg')} resizeMode="cover" style={styles.image}>
                <Text style={styles.RestaurantTitle}>{restaurant.nom}</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 128,
        height: 192,
        borderRadius: 11,
        backgroundColor: 'red',
        overflow: 'hidden',
        marginHorizontal: 4
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    RestaurantTitle: {
        padding: 10,
        color: 'white',
        fontSize: 12,
        fontWeight: '700'
    }
})

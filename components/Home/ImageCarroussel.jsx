import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import ArrowUp from '../../assets/icons/ArrowUp.svg'

function ImageCarroussel() {
    return (
        <View style={styles.container}>
           <ImageBackground source={require('../../assets/images/La_Felicita.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.bottom}>
                <View>
                    <Text style={styles.title}>La felicita</Text>
                    <Text style={styles.description}>
                        La Felicita, c'est un immense food-market en direct producteurs où tout est 100% fait maison.
                        4.500 m2, 8 cuisines...
                    </Text>
                </View>
            <ArrowUp width={48} height={48} color={'white'}/>
            </View>
            </ImageBackground> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 400,
        borderRadius: 25,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'flex-end',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 8,
    },
    description: {
        fontSize: 14,
        color: 'white',
        maxWidth: '85%'
    },
    bottom: {
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
});

export default ImageCarroussel;

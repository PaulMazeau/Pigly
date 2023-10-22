import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color'

export default function RestaurantDescription() {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>
                La Felicità, c'est un immense food-market en direct producteurs où tout est 100% fait maison. 4.500 m2, 8 cuisines...
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: main.LogoBlack,
        borderRadius: 14,
        padding: 8,
        marginBottom: 10
    },
    description: {
        fontSize: 16,
      }
})

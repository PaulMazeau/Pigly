import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color';

export default function RestaurantReview() {
    return (
        <View style={styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: main.LogoPink,
        height: 100,
        borderRadius: 14
    },
})

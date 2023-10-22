import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color';

export default function RestaurantMap() {
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
        height: 244,
        borderRadius: 14
    },
})

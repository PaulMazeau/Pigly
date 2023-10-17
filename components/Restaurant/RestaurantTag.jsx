import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color'

export default function RestaurantTag() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Italien</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: main.LogoBlack,
        height: 25,
        width: 60,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',     
    },
    text: {
        color: main.LogoPink,
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '600'
    }
})

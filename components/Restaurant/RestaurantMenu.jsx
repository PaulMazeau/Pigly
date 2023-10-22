import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color'

export default function RestaurantMenu() {
    return (
        <View style={styles.container}>
            <Text style={styles.Title}> Menu </Text>
            <View style={styles.RowMenu}>
            <View>
                <Text style={styles.TitrePlat}>Pizza bien</Text>
                <Text style={styles.DescriptionPlat}>sauce tomate</Text>
            </View>
                <Text style={styles.Prix}>22€</Text>
        </View>
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
    Title: {
        fontSize: 20,
        fontWeight: '600'
      },
      RowMenu: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop: 16,
    },
    TitrePlat: {
        color: 'black',
        fontSize: 16,
    },
    DescriptionPlat: {
        color: 'rgba(0, 0, 0, .6)',
    },
    Prix: {
        fontSize: 16,
        color: 'black'
    }
})

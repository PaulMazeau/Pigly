import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { main } from '../../constants/color'

export default function MoodTag() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Romantique</Text>
        </View>
    )
}

const styles = StyleSheet.create({    
container: {
    backgroundColor: main.LogoBlack,
    height: 32,
    width: 'auto',
    paddingHorizontal: 10,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',     
},
text: {
    color: main.LogoPink,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600'
}})

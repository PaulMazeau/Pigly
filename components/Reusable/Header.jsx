import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MoodTag from './MoodTag'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Pigly</Text>
      <MoodTag/>
    </SafeAreaView>
   )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000000', 
    paddingBottom: Platform.OS === 'android' ? 25 : -25,
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontSize: 20
  }
})

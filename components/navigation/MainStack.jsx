import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import HomeScreen from '../../screens/HomeScreen';
import MoodPickerScreen from '../../screens/MoodPickerScreen';
import RestaurantScreen from '../../screens/RestaurantScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import ProfileScreen from '../../screens/ProfileScreen';

export default function MainStackComponent() {
    const MainNavigation = createNativeStackNavigator();
    
    return (
        <MainNavigation.Navigator initialRouteName="Accueil" screenOptions={{ headerShown: false }}>
            <MainNavigation.Screen name="MoodPickerScreen" component={MoodPickerScreen} />
            <MainNavigation.Screen name="HomeScreen" component={HomeScreen} />
            <MainNavigation.Screen name="RestaurantScreen" component={RestaurantScreen} />
            <MainNavigation.Screen name="SettingsScreen" component={SettingsScreen} />
            <MainNavigation.Screen name="ProfileScreen" component={ProfileScreen} />
        </MainNavigation.Navigator>
    )
}

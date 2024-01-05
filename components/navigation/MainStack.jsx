import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantScreen from '../../screens/RestaurantScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import TabBarStackComponent from './TabBarStack';

const Stack = createNativeStackNavigator();

export default function MainStackComponent() {
    return (
        <Stack.Navigator initialRouteName="HomeTab">
            <Stack.Screen name="HomeTab" component={TabBarStackComponent} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

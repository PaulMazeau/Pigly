import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import RestaurantScreen from '../../screens/RestaurantScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import Map from '../../screens/Map';

import Home from '../../assets/icons/Home.svg';
import Profile from '../../assets/icons/Profile.svg';
import Search from '../../assets/icons/Search.svg';
import { main } from '../../constants/color';

const Tab = createBottomTabNavigator();

export default function TabBarStackComponent({ route }) {
    const initialRouteName = route.params?.screen || "MoodPickerScreen"; // Utilisez le paramètre 'screen' si disponible
    return (
        <Tab.Navigator 
            initialRouteName={initialRouteName}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: main.LogoBlack,
                    display: "flex",
                },
            }}
        >
            <Tab.Screen 
                name="HomeScreen" 
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Home stroke={main.LogoPink} width={24} height={24} />,
                }} 
            />
            <Tab.Screen 
                name="Map" 
                component={Map}
                options={{
                    tabBarIcon: () => <Search stroke={main.LogoPink} width={24} height={24} />,
                }} 
            />
            <Tab.Screen 
                name="ProfileScreen" 
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <Profile stroke={main.LogoPink} width={24} height={24} />,
                }} 
            />
            <Tab.Screen 
                name="RestaurantScreen" 
                component={RestaurantScreen}
                options={{ tabBarButton: () => null }}
            />
            <Tab.Screen 
                name="SettingsScreen" 
                component={SettingsScreen}
                options={{ tabBarButton: () => null }}
            />
        </Tab.Navigator>
    );
}

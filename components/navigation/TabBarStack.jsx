import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import Map from '../../screens/Map';

import Home from '../../assets/icons/Home.svg';
import Profile from '../../assets/icons/Profile.svg';
import Search from '../../assets/icons/Search.svg';
import { main } from '../../constants/color';

const Tab = createBottomTabNavigator();

export default function TabBarStackComponent() {
    return (
        <Tab.Navigator 
            initialRouteName="ProfileScreen"
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
        </Tab.Navigator>
    );
}

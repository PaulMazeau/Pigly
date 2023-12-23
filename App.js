import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackComponent from './components/navigation/AuthStack';
import MainStackComponent from './components/navigation/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
                name="Auth" 
                component={AuthStackComponent} 
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Main" 
                component={MainStackComponent} 
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </RestaurantProvider>
    </AuthProvider>
  );
}

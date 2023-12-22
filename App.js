import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackComponent from './components/Navigation/AuthStack';
import MainStackComponent from './components/Navigation/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import { UserProvider } from './context/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
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
      </UserProvider>
    </AuthProvider>
  );
}

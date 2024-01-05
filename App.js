import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackComponent from './components/navigation/AuthStack';
import MainStackComponent from './components/navigation/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
<<<<<<< HEAD
import { UserProvider } from './context/userContext';
=======
import { UserProvider } from './context/UserContext';
>>>>>>> 051f27d (La j'espere c bon)
import { MenuProvider } from './context/MenuContext';

const Stack = createNativeStackNavigator();

// Composant AppNavigator
const AppNavigator = () => {
  const { currentUser } = useAuth();

  return (
    <Stack.Navigator>
      {currentUser ? (
        <Stack.Screen 
          name="Main" 
          component={MainStackComponent} 
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen 
          name="Auth" 
          component={AuthStackComponent} 
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

// Composant App
export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RestaurantProvider>
      <MenuProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </MenuProvider>
        </RestaurantProvider>
      </UserProvider>
    </AuthProvider>
  );
}

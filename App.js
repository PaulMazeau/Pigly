import 'react-native-gesture-handler';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackComponent from './components/navigation/AuthStack';
import MainStackComponent from './components/navigation/MainStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RestaurantProvider } from './context/RestaurantContext';
import { UserProvider } from './context/UserContext';
import { MenuProvider } from './context/MenuContext';
import TastePickerScreen from './screens/TastePicker';

const Stack = createNativeStackNavigator();

// Composant AppNavigator
const AppNavigator = () => {
  const { currentUser, hasCompletedTastePicker, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {currentUser ? (
        hasCompletedTastePicker ? (
          <Stack.Screen 
            name="Main" 
            component={MainStackComponent} 
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen 
            name="TastePicker" 
            component={TastePickerScreen} 
            options={{ headerShown: false }}
          />
        )
      ) : (
        <Stack.Screen 
          name="Auth" 
          component={AuthStackComponent} 
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

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

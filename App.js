import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MainStackComponent from './components/Navigation/MainStack';
import AuthStackComponent from './components/Navigation/AuthStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainStackComponent} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
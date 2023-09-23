import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import AccueilIcon from '../../assets/icons/AccueilIcon';
import CourseIcon from '../../assets/icons/CourseIcon';
import DepenseIcon from '../../assets/icons/DepenseIcon';
import TacheIcon from '../../assets/icons/TacheIcon';
import TacheScreen from '../../screens/Tache';
import AccueilStackComponent from './AccueilStack';
import CourseStackComponent from './CourseStack';
import DepenseStackComponent from './DepenseStack';

export default function MainStackComponent() {
    const MainNavigation = createBottomTabNavigator;
    
    return (
        <MainNavigation.Navigator initialRouteName="Accueil" >
            <MainNavigation.Screen name="AccueilStack" component={AccueilStackComponent} options={{tabBarIcon: ({color}) => <AccueilIcon color={color}/>}} />
            <MainNavigation.Screen name="CourseStack" component={CourseStackComponent} options={{tabBarIcon: ({color}) => <CourseIcon color={color} />}} />
            <MainNavigation.Screen name="Tache" component={TacheScreen} options={{tabBarIcon: ({color}) => <TacheIcon color={color} />}}/>
            <MainNavigation.Screen name="DepenseStack" component={DepenseStackComponent} options={{tabBarIcon: ({color}) => <DepenseIcon color={color} />}}/>
        </MainNavigation.Navigator>
    )
}

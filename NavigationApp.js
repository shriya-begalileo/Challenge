import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeComponent from './Components/Home';
import Profile from './Components/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Components/LoginScreen';

const Stack = createNativeStackNavigator();

const NavigationApp = ()=>{
  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name= 'Profile'
            component={LoginScreen}
            options={{ title: 'My Profile' }}
            >
            </Stack.Screen>
            <Stack.Screen
            name= 'Dashboard'
            component={HomeComponent}
            options={{ title: 'My Profile' }}
            >

            </Stack.Screen>
        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default NavigationApp


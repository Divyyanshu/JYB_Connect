import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/SplashScreen';
import {DrawerNavigator} from './drawerNavigator';
import {MainNavigator} from './mainNavigator';
import {SCREENS} from '../utils/screens';
import {STACKS} from '../utils/stacks';

// Create Navigators
const Stack = createStackNavigator();

// Main Stack Navigation
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREENS.MAIN_STACK.SPLASH}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={SCREENS.MAIN_STACK.SPLASH}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={STACKS.MAIN_STACK}
          component={MainNavigator}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name={STACKS.DRAWER_STACK}
          component={DrawerNavigator}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

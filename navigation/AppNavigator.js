import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
const AuthStack = createStackNavigator({ SignIn: LoginScreen });

export default createSwitchNavigator(
    {
        App: MainTabNavigator,
        SignIn: AuthStack,
    },
    {
        initialRouteName: 'SignIn',
    }
);

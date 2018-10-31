import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignedInTabNavigator from "./SignedInTabNavigator";
const SignInStack = createStackNavigator({ SignIn: LoginScreen });
const SignUpStack = createStackNavigator({ SignUp: SignUpScreen });

export default createSwitchNavigator(
    {
        App: MainTabNavigator,
        SignIn: SignInStack,
        SignUp: SignUpStack,
        SignedIn: SignedInTabNavigator
    },
    {
        initialRouteName: 'App',
    }
);

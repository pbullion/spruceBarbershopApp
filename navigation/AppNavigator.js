import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpPageScreen from '../screens/SignUpPageScreen';
import SignedInTabNavigator from "./SignedInTabNavigator";
const SignInStack = createStackNavigator({ SignIn: LoginScreen });
const SignUpStack = createStackNavigator({ SignUp: SignUpScreen });
const SignUpPageStack = createStackNavigator({ SignUpPage: SignUpPageScreen });

export default createSwitchNavigator(
    {
        App: MainTabNavigator,
        SignIn: SignInStack,
        SignUp: SignUpStack,
        SignUpPage: SignUpPageStack,
        SignedIn: SignedInTabNavigator
    },
    {
        initialRouteName: 'App',
    }
);

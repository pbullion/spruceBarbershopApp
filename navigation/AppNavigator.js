import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignedInTabNavigator from "./SignedInTabNavigator";

export default createSwitchNavigator(
    {
        App: MainTabNavigator,
        SignedIn: SignedInTabNavigator,
    },
    {
        initialRouteName: 'App',
    }
);

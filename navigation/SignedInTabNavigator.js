import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/AuthWaitTimesScreen';
import StaffScreen from '../screens/StaffScreen';
import AuthWaitTimesScreen from '../screens/AuthWaitTimesScreen';
import ServicesScreen from "../screens/ServicesScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ServicesStack = createStackNavigator({
    Services: ServicesScreen,
});

ServicesStack.navigationOptions = {
    tabBarLabel: 'Services',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-leaf${focused ? '' : '-outline'}` : 'md-leaf'}
        />
    ),
};

const ProductsStack = createStackNavigator({
    Products: ProductsScreen,
});

ProductsStack.navigationOptions = {
    tabBarLabel: 'Products',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-leaf${focused ? '' : '-outline'}` : 'md-leaf'}
        />
    ),
};

const StaffStack = createStackNavigator({
  Staff: StaffScreen,
});

StaffStack.navigationOptions = {
  tabBarLabel: 'Staff',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts'}
    />
  ),
};

const AuthWaitTimesStack = createStackNavigator({
    WaitTimes: AuthWaitTimesScreen,
});

AuthWaitTimesStack.navigationOptions = {
    tabBarLabel: 'Wait Times',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-time${focused ? '' : '-outline'}` : 'md-time'}
        />
    ),
};

export default createBottomTabNavigator({
  HomeStack,
  AuthWaitTimesStack,
  ServicesStack,
  ProductsStack,
  StaffStack,
});

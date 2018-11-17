import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import StaffScreen from '../screens/StaffScreen';
import BarbersScreen from '../screens/staff/BarbersScreen';
import StylistsScreen from '../screens/staff/StylistsScreen';
import WaitTimesScreen from '../screens/WaitTimesScreen';
import ProductsScreen from "../screens/ProductsScreen";
import ServicesScreen from "../screens/ServicesScreen";
import HairServicesScreen from "../screens/services/HairServicesScreen";
import BeardServicesScreen from "../screens/services/BeardServicesScreen";
import ShaveServicesScreen from "../screens/services/ShaveServicesScreen";
import AdditionalServicesScreen from "../screens/services/AdditionalServicesScreen";
import ColoringServicesScreen from "../screens/services/ColoringServicesScreen";
import JoinWaitListScreen from "../screens/waitList/JoinWaitListScreen";

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
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
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
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
};

const ServicesStack = createStackNavigator({
    Home: ServicesScreen,
    Hair: HairServicesScreen,
    Beard: BeardServicesScreen,
    Shave: ShaveServicesScreen,
    Coloring: ColoringServicesScreen,
    Additional: AdditionalServicesScreen
});

ServicesStack.navigationOptions = {
    tabBarLabel: 'Services',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-leaf${focused ? '' : '-outline'}` : 'md-leaf'}
        />
    ),
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
};

const StaffStack = createStackNavigator({
  Home: StaffScreen,
  Barbers: BarbersScreen,
  Stylists: StylistsScreen
});

StaffStack.navigationOptions = {
  tabBarLabel: 'Staff',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contacts${focused ? '' : '-outline'}` : 'md-contacts'}
    />
  ),
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
};

const WaitTimesStack = createStackNavigator({
    WaitTimes: WaitTimesScreen,
});

WaitTimesStack.navigationOptions = {
  tabBarLabel: 'Wait Times',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-time${focused ? '' : '-outline'}` : 'md-time'}
    />
  ),
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
};

export default createBottomTabNavigator({
    HomeStack,
    StaffStack,
    WaitTimesStack,
    ServicesStack,
});

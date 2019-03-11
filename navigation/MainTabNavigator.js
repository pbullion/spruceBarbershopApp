import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
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
import JoinWaitListScreen2 from "../screens/waitList/JoinWaitListScreen2";
import JoinWaitListScreen3 from "../screens/waitList/JoinWaitListScreen3";
import JoinWaitListScreen4 from "../screens/waitList/JoinWaitListScreen4";
import JoinWaitListScreen5 from "../screens/waitList/JoinWaitListScreen5";
import JoinWaitListScreen6 from "../screens/waitList/JoinWaitListScreen6";
import JoinWaitListScreen7 from "../screens/waitList/JoinWaitListScreen7";
import WaitListSignUpScreen from "../screens/WaitListSignUpScreen";

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
            name={Platform.OS === 'ios' ? `ios-cut` : 'md-cut'}
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
            name={Platform.OS === 'ios' ? `ios-cut` : 'md-cut'}
        />
    ),
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
};

const MessagesStack = createStackNavigator({
    Home: MessagesScreen
});

MessagesStack.navigationOptions = {
    tabBarLabel: 'Messages',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-mail-open` : 'md-mail-open'}
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
      name={Platform.OS === 'ios' ? `ios-contacts` : 'md-contacts'}
    />
  ),
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
};

const WaitTimesStack = createStackNavigator({
    WaitTimeList: WaitTimesScreen,
    WaitTimes: JoinWaitListScreen,
    WaitTimes2: JoinWaitListScreen2,
    WaitTimes3: JoinWaitListScreen3,
    WaitTimes4: JoinWaitListScreen4,
    WaitTimes5: JoinWaitListScreen5,
    WaitTimes6: JoinWaitListScreen6,
    WaitTimes7: JoinWaitListScreen7,
    WaitListSignUp: WaitListSignUpScreen
});

WaitTimesStack.navigationOptions = {
  tabBarLabel: 'Wait Times',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-time` : 'md-time'}
    />
  ),
    tabBarOptions: {
        activeTintColor: '#2F553C',
        inactiveTintColor: '#a9a389',
    }
};

export default createBottomTabNavigator({
    HomeStack,
    MessagesStack,
    WaitTimesStack,
    StaffStack,
    ServicesStack,
});

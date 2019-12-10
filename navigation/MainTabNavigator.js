import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
// import SignUpScreen from '../screens/SignUpScreen';
import SettingsScreen from '../screens/SettingsScreen';
// import LoginScreen from '../screens/LoginScreen';
import HikesScreen from '../screens/HikesScreen';
import HikeScreen from '../screens/HikeScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

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

HomeStack.path = '';

// const SignUpStack = createStackNavigator(
//   {
//     SignUp: SignUpScreen,
//   },
//   config
// );

// SignUpStack.navigationOptions = {
//   tabBarLabel: 'SignUp',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
//   ),
// };

// SignUpStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

// const LoginStack = createStackNavigator(
//   {
//     Login: LoginScreen,
//   },
//   config
// );

// LoginStack.navigationOptions = {
//   tabBarLabel: 'Login',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };

// LoginStack.path = '';

// const HikeStack = createStackNavigator(
//   {
//     Hike: HikeScreen,
//   },
//   config
// );

// HikeStack.navigationOptions = {
//   tabBarLabel: 'Hike',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   ),
// };

// HikeStack.path = '';

const HikesStack = createStackNavigator(
  {
    Hikes: HikesScreen,
    Hike: HikeScreen
  },
  config,
);

HikesStack.navigationOptions = {
  tabBarLabel: 'Hikes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

HikesStack.path = '';


const tabNavigator = createBottomTabNavigator({
  HomeStack,
  // SignUpStack,
  SettingsStack,
  // LoginStack,
  HikesStack,
});

tabNavigator.path = '';

export default tabNavigator;

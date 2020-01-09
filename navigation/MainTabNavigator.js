import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
// import SignUpScreen from '../screens/SignUpScreen';
import SettingsScreen from '../screens/SettingsScreen';
// import LoginScreen from '../screens/LoginScreen';
import HikesScreen from '../screens/HikesScreen';
import HikeScreen from '../screens/HikeScreen';
import CameraScreen from '../screens/camerascreen';
import ClickedProfileScreen from '../screens/ClickedProfileScreen';
import StumpsScreen from '../screens/StumpsScreen';
import SubmitStumpScreen from '../screens/SubmitStumpScreen';
import StumpScreen from '../screens/StumpScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Hike: HikeScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
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

ProfileStack.path = '';

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
const CameraStack = createStackNavigator({
  CameraPage: CameraScreen,
  },
  config
);

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

CameraStack.path = '';

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
    Hike: HikeScreen,
    ClickedProfile: ClickedProfileScreen,
  },
  config,
);

HikesStack.navigationOptions = {
  tabBarLabel: 'Hikes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

const StumpsStack = createStackNavigator(
  {
    Submit: SubmitStumpScreen,
    Stumps: StumpsScreen,
    Stump: StumpScreen,
  },
  config
);

StumpsStack.navigationOptions = {
  tabBarLabel: 'Stumps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

StumpsStack.path = '';



const tabNavigator = createBottomTabNavigator({
  ProfileStack,
  // SignUpStack,
  // SettingsStack,
  // LoginStack,
  HikesStack,
  StumpsStack,
  // CameraStack,
});

tabNavigator.path = '';

export default tabNavigator;

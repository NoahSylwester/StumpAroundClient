import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
  });
  

const LoginStack = createStackNavigator(
    {
      Login: LoginScreen,
    },
    config
  );
  
  LoginStack.navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    ),
  };
  
  LoginStack.path = '';

const SignUpStack = createStackNavigator(
    {
      SignUp: SignUpScreen,
    },
    config
  );
  
  SignUpStack.navigationOptions = {
    tabBarLabel: 'SignUp',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
    ),
  };
  
  SignUpStack.path = '';

  const AuthNavigator = createStackNavigator({
    Login: LoginStack,
    SignUp: SignUpStack,
  });
  
  AuthNavigator.path = '';
  
  export default AuthNavigator;
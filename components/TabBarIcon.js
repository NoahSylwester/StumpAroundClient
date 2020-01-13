import React from 'react';
import { Ionicons, FontAwesome, Foundation } from '@expo/vector-icons';

import Colors from '../constants/Colors';

function I(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

function F(props) {
  return (
    <Foundation
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

export default TabBarIcon = { I, F };
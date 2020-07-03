import React, {Component} from 'react';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {
  NavigationScreens,
  NavigationParameter,
} from './NavigationConfiguration';
// import {getSvgAnimatingBottomBarStack} from '../lib/Navigators/NavigatorStack';

import {getSvgAnimatingBottomBarStack} from 'react-native-animating-bottom-tab-bar';

const BottomBarStack = getSvgAnimatingBottomBarStack(
  NavigationScreens,
  NavigationParameter,
);
const AppContainer = createAppContainer(BottomBarStack);

export default AppContainer;

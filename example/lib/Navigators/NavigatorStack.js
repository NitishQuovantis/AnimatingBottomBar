import React from 'react'; // if we remove this line, it will cause error
import {createBottomTabNavigator} from 'react-navigation';
import SvgAnimatingBottomBar from '../src/AnimatingSvgBottomBar';
import ExpandingLabelBottomBar from '../src/ExpandingLabelBottomBar';

export function getSvgAnimatingBottomBarStack(
  navigationScreens,
  navigationParameter,
  configData,
) {
  const navigatorStack = createBottomTabNavigator(navigationScreens, {
    tabBarComponent: (props) => {
      return (
        <SvgAnimatingBottomBar
          {...props}
          {...configData}
          routeData={navigationParameter}
        />
      );
    },

    backBehavior: 'history',
  });

  return navigatorStack;
}

export function getExpandingLabelBottomBar(
  navigationScreens,
  navigationParameter,
  configData,
) {
  const navigatorStack = createBottomTabNavigator(navigationScreens, {
    tabBarComponent: (props) => {
      return (
        <ExpandingLabelBottomBar
          {...props}
          {...configData}
          routeData={navigationParameter}
        />
      );
    },

    backBehavior: 'history',
  });

  return navigatorStack;
}

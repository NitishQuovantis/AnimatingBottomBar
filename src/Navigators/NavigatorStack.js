import React from 'react'; // if we remove this line, it will cause error
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SvgAnimatingBottomBar from '../src/AnimatingSvgBottomBar';
import ExpandingLabelBottomBar from '../src/ExpandingLabelBottomBar';
import AddExpandingBottomBar from '../src/AddExpandingBottomBar';

export const AnimationType = {
  SvgBottomBar: 'SvgBottomBar',
  ExpandingLabel: 'ExpandingLabel',
  // ContextMenu: 'ContextMenu',
};

export function getAnimatingBottomBar({
  type,
  navigationScreens,
  navigationParameter,
  configData,
}) {
  switch (type) {
    case AnimationType.SvgBottomBar:
      return getSvgAnimatingBottomBarStack(
        navigationScreens,
        navigationParameter,
        configData
      );

    case AnimationType.ExpandingLabel:
      return getExpandingLabelBottomBar(
        navigationScreens,
        navigationParameter,
        configData
      );

    case AnimationType.ContextMenu:
      return getAddExpandingBottomBar(
        navigationScreens,
        navigationParameter,
        configData
      );

    default:
      return getSvgAnimatingBottomBarStack(
        navigationScreens,
        navigationParameter,
        configData
      );
  }
}

function getSvgAnimatingBottomBarStack(
  navigationScreens,
  navigationParameter,
  configData
) {
  const initialRouteName = configData.bottomBarConfig.initialRouteName;

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

    initialRouteName: initialRouteName,
    backBehavior: 'history',
  });

  return navigatorStack;
}

function getExpandingLabelBottomBar(
  navigationScreens,
  navigationParameter,
  configData
) {
  const initialRouteName = configData.bottomBarConfig.initialRouteName;

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

    initialRouteName: initialRouteName,
    backBehavior: 'history',
  });

  return navigatorStack;
}

function getAddExpandingBottomBar(
  navigationScreens,
  navigationParameter,
  configData
) {
  const initialRouteName = configData.bottomBarConfig.initialRouteName;

  const navigationStack = createBottomTabNavigator(navigationScreens, {
    tabBarComponent: (props) => {
      return (
        <AddExpandingBottomBar
          {...props}
          {...configData}
          routeData={navigationParameter}
        />
      );
    },
    backBehavior: 'history',
    initialRouteName: initialRouteName,
  });

  return navigationStack;
}

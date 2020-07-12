import React from 'react';
import {createAppContainer} from 'react-navigation';
import {
  NavigationScreens,
  NavigationParameter,
  bottomBarConfig,
  extraTabs,
} from './NavigationConfiguration';
import AnimatingBottomBarContext from '../lib/Contexts/AnimatingBottomBarContext';

import {
  getSvgAnimatingBottomBarStack,
  getExpandingLabelBottomBar,
  getAddExpandingBottomBar,
} from '../lib/Navigators/NavigatorStack';

// import {getSvgAnimatingBottomBarStack} from 'react-native-animating-bottom-tab-bar';

const BottomBarStack = getAddExpandingBottomBar(
  NavigationScreens,
  NavigationParameter,
  {
    // bottomBarConfig,
    extraTabs,
  },
);

const AppContainer = createAppContainer(BottomBarStack);

export default class navigation extends React.Component {
  state = {
    routeName: '',
  };

  // https://reactnavigation.org/docs/3.x/screen-tracking/
  // gets the current screen from navigation state
  getActiveRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return this.getActiveRouteName(route);
    }
    return route.routeName;
  };

  render() {
    return (
      <AnimatingBottomBarContext.Provider value={this.state}>
        <AppContainer
          onNavigationStateChange={(prevState, currentState) => {
            const currentRouteName = this.getActiveRouteName(currentState);
            const previousRouteName = this.getActiveRouteName(prevState);

            console.log('onNavigationStateChanged', currentRouteName);

            if (previousRouteName !== currentRouteName) {
              this.setState({routeName: currentRouteName});
            }
          }}
        />
      </AnimatingBottomBarContext.Provider>
    );
  }
}

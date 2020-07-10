import {createAppContainer} from 'react-navigation';
import {
  NavigationScreens,
  NavigationParameter,
  bottomBarConfig,
} from './NavigationConfiguration';

import {
  getSvgAnimatingBottomBarStack,
  getExpandingLabelBottomBar,
} from '../lib/Navigators/NavigatorStack';

// import {getSvgAnimatingBottomBarStack} from 'react-native-animating-bottom-tab-bar';

const BottomBarStack = getExpandingLabelBottomBar(
  NavigationScreens,
  NavigationParameter,
  // {bottomBarConfig},
);

const AppContainer = createAppContainer(BottomBarStack);

export default AppContainer;

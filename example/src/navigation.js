import {createAppContainer} from 'react-navigation';
import {
  NavigationScreens,
  NavigationParameter,
  bottomBarConfig,
} from './NavigationConfiguration';

// import {getSvgAnimatingBottomBarStack} from '../lib/Navigators/NavigatorStack';
import {getSvgAnimatingBottomBarStack} from 'react-native-animating-bottom-tab-bar';

const BottomBarStack = getSvgAnimatingBottomBarStack(
  NavigationScreens,
  NavigationParameter,
  {bottomBarConfig},
);

const AppContainer = createAppContainer(BottomBarStack);

export default AppContainer;

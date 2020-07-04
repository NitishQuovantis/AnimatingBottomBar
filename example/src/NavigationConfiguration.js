import {Home, Chat, Profile, Setting} from './screens';
import {TabBarIcons} from './utility/ImageConstant';

const RouteName = {
  Home: 'Home',
  Chat: 'Chat',
  Setting: 'Setting',
  Profile: 'Profile',
};

const NavigationScreens = {
  [RouteName.Home]: Home,
  [RouteName.Chat]: Chat,
  [RouteName.Setting]: Setting,
  [RouteName.Profile]: Profile,
};

const NavigationParameter = [
  {
    label: RouteName.Home,
    routeName: RouteName.Home,
    icons: TabBarIcons.Home,
    activeIconScale: 1,
    yTranslation: 28,
  },

  {
    label: RouteName.Chat,
    routeName: RouteName.Chat,
    icons: TabBarIcons.Conversation,
    yTranslation: 28,
  },

  {
    label: RouteName.Setting,
    routeName: RouteName.Setting,
    icons: TabBarIcons.HealthCard,
  },

  {
    label: RouteName.Profile,
    routeName: RouteName.Profile,
    icons: TabBarIcons.Timeline,
  },
];

const TabConfigurationObject = {
  activeTintColor: null,
  inactiveTintColor: null,
  activeIconScale: 1.2,
  yTranslation: 28,
};

const bottomBarConfig = {
  backgroundColor: 'white',
  height: 100,
  bottom: 0,
  curveWidth: 82,
  curveDepth: 43,
  onTabBarChange: null, // function which will be called when tab is switched with tab object as parameter
  animationDuration: 400,
  tabCircleDiameter: 44,
  extraMarginBetweenTabIconAndLabel: -5,
};

export {NavigationParameter, NavigationScreens, bottomBarConfig};

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
  },

  {
    label: RouteName.Chat,
    routeName: RouteName.Chat,
    icons: TabBarIcons.Conversation,
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

export {NavigationParameter, NavigationScreens};

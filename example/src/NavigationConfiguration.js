import {
  Home,
  Chat,
  Profile,
  Setting,
  VideoCall,
  VoiceCall,
  Suggestion,
} from './screens';
import {TabBarIcons, PlusIcon, MinusIcon} from './utility/ImageConstant';
import * as Animations from './utility/AnimationConstant';

const RouteName = {
  Home: 'Home',
  Chat: 'Chat',
  Setting: 'Setting',
  Profile: 'Profile',
  VideoCall: 'VideoCall',
  VoiceCall: 'VoiceCall',
  Suggestion: 'Suggestion',
};

const NavigationScreens = {
  [RouteName.Home]: Home,
  [RouteName.Chat]: Chat,
  [RouteName.Setting]: Setting,
  [RouteName.Profile]: Profile,
  [RouteName.VideoCall]: VideoCall,
  [RouteName.VoiceCall]: VoiceCall,
  [RouteName.Suggestion]: Suggestion,
};

const NavigationParameter = [
  {
    label: RouteName.Home,
    routeName: RouteName.Home,
    icons: TabBarIcons.Home,
    activeIconScale: 1,
    yTranslation: 28,

    lottieSource: Animations.HomeAnimation,
    isLottieTab: true,
  },

  {
    label: RouteName.Chat,
    routeName: RouteName.Chat,
    icons: TabBarIcons.Message,
    yTranslation: 28,

    lottieSource: Animations.MessageAnimation,
    isLottieTab: true,
  },

  {
    label: RouteName.Setting,
    routeName: RouteName.Setting,
    icons: TabBarIcons.Setting,

    lottieSource: Animations.SettingAnimation,
    isLottieTab: true,
  },

  {
    label: RouteName.Profile,
    routeName: RouteName.Profile,
    icons: TabBarIcons.Profile,

    lottieSource: Animations.ProfileAnimation,
    isLottieTab: true,
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
  extraMarginBetweenTabIconAndLabel: 0,
};

const extraTabs = {
  tabs: [
    {
      label: RouteName.VideoCall,
      routeName: RouteName.VideoCall,
      icons: TabBarIcons.VideoCall,
      activeBGColor: '#afa',
      inactiveBGColor: 'yellow',
    },

    {
      label: RouteName.VoiceCall,
      routeName: RouteName.VoiceCall,
      icons: TabBarIcons.VoiceCall,
      activeBGColor: '#aaf',
      inactiveBGColor: 'yellow',
    },

    {
      label: RouteName.Suggestion,
      routeName: RouteName.Suggestion,
      icons: TabBarIcons.Suggestion,
      activeBGColor: '#f66',
      inactiveBGColor: 'yellow',
    },
  ],
  centerExpandIcon: PlusIcon,
  centerCollapseIcon: MinusIcon,
};

export {NavigationParameter, NavigationScreens, bottomBarConfig, extraTabs};

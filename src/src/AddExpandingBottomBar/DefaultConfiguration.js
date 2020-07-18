export const TabConfigurationObject = {
  activeBGColor: 'gray',
  inactiveBGColor: '#ffff',
  label: '',
  icon: {selected: null, unselected: null},
  route: null,
  iconSize: 24,
  activeTextStyle: null,
  inactiveTextStyle: null,
  activeTintColor: null,
  inactiveTintColor: null,

  // Enabling lottie tab
  lottieSource: null,
  isLottieTab: false,
};

export const BottomBarDefaultConfigurationObject = {
  backgroundColor: 'pink',
  height: 100,
  animationDuration: 400,

  curveWidth: 80,
  curveDepth: 50,
};

export const ExtraTabs = {
  tabs: [
    {
      label: '',
      routeName: '',
      icons: null,
    },
  ],

  centerExpandIcon: null,
  centerCollapseIcon: null,
  spaceBetweenCenterButtonAndTabs: 0,
  backgroundColor: 'red',
};

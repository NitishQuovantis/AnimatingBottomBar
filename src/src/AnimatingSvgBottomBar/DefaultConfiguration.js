export const TabConfigurationObject = {
  activeTintColor: null,
  inactiveTintColor: null,
  activeIconScale: 1,
  yTranslation: 28,
  activeTextStyle: null,
  inactiveTextStyle: null,
  label: '',
  icon: {selected: null, unselected: null},
  route: null,
  iconSize: 24,

  // Enabling lottie tab
  lottieSource: null,
  isLottieTab: false,
};

export const BottomBarDefaultConfigurationObject = {
  backgroundColor: 'white',
  height: 100,
  bottom: 0,
  curveWidth: 84,
  curveDepth: 40,
  onTabBarChange: null, // function which will be called when tab is switched with tab object as parameter
  animationDuration: 400,
  tabCircleDiameter: 44,
  extraMarginBetweenTabIconAndLabel: 0,
};

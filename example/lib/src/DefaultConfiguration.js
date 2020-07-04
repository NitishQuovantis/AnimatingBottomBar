export const TabConfigurationObject = {
  activeTintColor: null,
  inactiveTintColor: null,
  activeIconScale: 1,
  yTranslation: 28,
  label: '',
  icon: {selected: null, unselected: null},
  route: null,
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

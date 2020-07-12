export const TabConfigurationObject = {
  activeBGColor: 'gray',
  inactiveBGColor: '#ffff',
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
  animationDuration: 400,
  labelMarginLeft: 10,
  containerHorizontalPadding: 15,
  containerVerticalPadding: 10,

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
  backgroundColor: 'orange',
};

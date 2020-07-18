import React, {Component} from 'react';
import {Animated, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Styles from './styles';
import {TabConfigurationObject, ExtraTabs} from './DefaultConfiguration';

export default class CenterExpandingTab extends Component {
  constructor(props) {
    super(props);
    this.configurationObject = {...this.props, ...ExtraTabs};
    this.tabSize = this.configurationObject.curveWidth - 20;

    this.state = {
      animated: new Animated.Value(0),
      containerAnimation: new Animated.Value(0),
      isExpanded: false,
    };
  }

  isAnyTabSelected = (tabIndex) => {
    const {extraTabs} = this.configurationObject;
    const {selectedIndex} = this.props;
    const indexToCheck = tabIndex ?? selectedIndex;
    let isAnyTabSelected = false;

    extraTabs.tabs.forEach((item, index) => {
      if (index === indexToCheck) {
        isAnyTabSelected = true;
      }
    });

    return isAnyTabSelected;
  };

  getNoOfTabs = () => {
    return this.configurationObject.extraTabs.tabs.length;
  };

  getContainerStyle = () => {
    const {height, curveDepth, curveWidth} = this.configurationObject;
    const {animated} = this.state;
    const noOfTabs = this.getNoOfTabs() + 1; // 1 for add icon

    const finalHeight =
      this.tabSize * noOfTabs +
      this.configurationObject.spaceBetweenCenterButtonAndTabs;
    const heightInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [this.tabSize, finalHeight],
    });

    return {
      ...Styles.centralTabStyle,
      left: 10,
      width: this.tabSize,
      minHeight: this.tabSize,
      height: heightInterpolation,
      backgroundColor: this.configurationObject.backgroundColor,
      overflow: 'hidden',
      bottom: height - curveDepth + 5,
      borderRadius: this.tabSize / 2,
    };
  };

  getTabContainerStyle = () => {
    const singleTabHeight = this.tabSize - 10;

    return {
      position: 'absolute',
      marginHorizontal: 5.5,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: singleTabHeight,
      height: singleTabHeight,
      borderRadius: singleTabHeight / 2,
    };
  };

  getTabAnimatedStyle = (index, item) => {
    const {containerAnimation: animated} = this.state;
    const isSelected = this.props.selectedIndex === index;

    const {activeBGColor} = item;

    const finalColor = activeBGColor ?? TabConfigurationObject.activeBGColor;
    const initialColor = '#fff0';

    const backgroundColorInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [initialColor, finalColor],
    });

    // 5 = half of padding(10)
    const translationY = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [
        isSelected ? 5 : (1 + index) * (this.tabSize + 5),
        10 + (this.tabSize - 5) * index,
      ],
    });

    const rotationInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['-360deg', '0deg'],
    });

    const initialOpacity = isSelected ? 1 : 0;
    const opacityInterpolation = animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [initialOpacity, initialOpacity, 1],
    });

    return {
      backgroundColor: backgroundColorInterpolation,
      opacity: opacityInterpolation,
      transform: [{translateY: translationY}, {rotate: rotationInterpolation}],
    };
  };

  getAddIconContainerStyle = () => {
    const {animated} = this.state;

    const isAnyTabSelected = this.isAnyTabSelected();

    const initialPosition = isAnyTabSelected ? 100 : -5;
    const finalPosition = -10;

    const translationInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [initialPosition, finalPosition],
    });

    return {
      bottom: 0,
      transform: [{translateY: translationInterpolation}],
      // zIndex: isAnyTabSelected ? -10 : 10,
    };
  };

  getAddIconOpacity = () => {
    const {animated} = this.state;
    const opacityInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    return {
      opacity: opacityInterpolation,
    };
  };

  startAnimation = () => {
    const {isExpanded} = this.state;

    this.setState({isExpanded: !isExpanded}, () => {
      if (isExpanded) {
        this.animateToValue(0);
      } else {
        this.animateToValue(1);
      }
    });
  };

  onTabSelection = (routeName) => {
    this.props.navigation.navigate(routeName);
    this.startAnimation();
  };

  animateToValue = (toValue) => {
    const {animated, containerAnimation} = this.state;
    const {animationDuration} = this.configurationObject;

    Animated.parallel([
      Animated.timing(animated, {
        toValue,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(containerAnimation, {
        toValue,
        duration: animationDuration,
        useNativeDriver: false,
      }),
    ]).start();
  };

  componentDidUpdate(prevProps) {
    const {isExpanded} = this.state;

    console.log(this.props.currentRouteName);

    if (
      (prevProps.selectedIndex !== this.props.selectedIndex ||
        prevProps.currentRouteName !== this.props.currentRouteName) &&
      isExpanded
    ) {
      this.collapseTabs();
    }

    const wasAnyTabSelected = this.isAnyTabSelected(prevProps.selectedIndex);
    const isAnyTabSelected = this.isAnyTabSelected(this.props.selectedIndex);

    if (wasAnyTabSelected && !isAnyTabSelected) {
      this.resetTabAfterBottomBarTabSelection();
    }
  }

  resetTabAfterBottomBarTabSelection = () => {
    const {animated} = this.state;

    Animated.timing(animated, {
      toValue: 0,
      duration: 1400,
      useNativeDriver: false,
    }).start();
  };

  collapseTabs = () => {
    this.setState({isExpanded: false}, () => {
      this.animateToValue(0);
    });
  };

  render() {
    const {
      extraTabs: {tabs},
    } = this.props;

    const containerStyle = this.getContainerStyle();
    const tabContainerStyle = this.getTabContainerStyle();
    const addContainerStyle = this.getAddIconContainerStyle();
    const addIconOpacity = this.getAddIconOpacity();

    return (
      <Animated.View style={containerStyle}>
        {tabs.map((item, index) => {
          const translation = this.getTabAnimatedStyle(index, item);
          return (
            <TouchableOpacity
              key={item.label}
              onPress={() => {
                this.onTabSelection(item.routeName);
              }}>
              <Animated.View style={[tabContainerStyle, translation]}>
                <Image style={Styles.iconStyle} source={item.icons.selected} />
              </Animated.View>
            </TouchableOpacity>
          );
        })}

        <Animated.View style={[tabContainerStyle, addContainerStyle]}>
          <TouchableOpacity
            onPress={this.startAnimation}
            style={Styles.centerTabIconContainerStyle}>
            <Animated.Image
              style={[Styles.iconStyle, addIconOpacity]}
              source={this.configurationObject.extraTabs.centerExpandIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.startAnimation}
            style={Styles.centerTabIconContainerStyle}>
            <Image
              style={Styles.iconStyle}
              source={this.configurationObject.extraTabs.centerCollapseIcon}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

import React, { Component } from 'react';
import { Animated } from 'react-native';

import { TabConfigurationObject } from './DefaultConfiguration';
import Styles from './Styles';
import LottieView from 'lottie-react-native';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.configurationObject = { ...TabConfigurationObject, ...props };

    this.state = {
      animated: new Animated.Value(this.props.isSelected ? 1 : 0),
    };
  }

  runAnimation = (toValue) => {
    Animated.timing(this.state.animated, {
      toValue,
      duration: this.configurationObject.animationDuration,
      useNativeDriver: false,
    }).start();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isSelected !== this.props.isSelected) {
      if (this.props.isSelected) {
        this.runAnimation(1);
      } else {
        this.runAnimation(0);
      }
    }
  }

  getContainerAnimatingStyle = () => {
    const translation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -this.configurationObject.yTranslation],
    });

    return {
      transform: [{ translateY: translation }],
    };
  };

  getImageStyle = () => {
    const { isSelected } = this.props;
    const { inactiveTintColor, activeTintColor } = this.configurationObject;

    const scaleInterpolation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, this.configurationObject.activeIconScale],
    });

    return {
      transform: [{ scale: scaleInterpolation }],
      tintColor: isSelected ? activeTintColor : inactiveTintColor,
      alignSelf: 'center',
    };
  };

  getTextStyle = () => {
    const scaleInterpolation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return {
      transform: [{ scaleY: scaleInterpolation }],
      marginTop: this.configurationObject.extraMarginBetweenTabIconAndLabel,
    };
  };

  getAnimatingCircleStyle = () => {
    return {
      backgroundColor: this.configurationObject.backgroundColor,
      borderRadius: this.configurationObject.tabCircleDiameter / 2,
      justifyContent: 'center',
      alignItems: 'center',
      width: this.configurationObject.tabCircleDiameter,
      height: this.configurationObject.tabCircleDiameter,
    };
  };

  render() {
    const { label, icons, isSelected } = this.props;
    const { selected, unselected } = icons;
    const { animated } = this.state;
    const {
      isLottieTab,
      lottieSource,
      iconSize,
      activeTextStyle,
      inactiveTextStyle,
    } = this.configurationObject;

    const containerStyle = this.getContainerAnimatingStyle();
    const imageStyle = this.getImageStyle();
    const testStyle = this.getTextStyle();
    const animatingCircleStyle = this.getAnimatingCircleStyle();

    return (
      <Animated.View style={[Styles.tabStyle, containerStyle]}>
        <Animated.View style={animatingCircleStyle}>
          {isLottieTab ? (
            <LottieView
              source={lottieSource}
              style={{ width: iconSize, height: iconSize }}
              progress={animated}
            />
          ) : (
            <Animated.Image
              source={isSelected ? selected : unselected}
              resizeMode='contain'
              style={[{ width: iconSize, height: iconSize }, imageStyle]}
            />
          )}
        </Animated.View>

        <Animated.Text
          style={[
            Styles.tabTitleStyle,
            testStyle,
            isSelected ? activeTextStyle : inactiveTextStyle,
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    );
  }
}

export default Tabs;

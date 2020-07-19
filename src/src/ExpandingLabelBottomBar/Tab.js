import React, { Component } from 'react';
import { Animated } from 'react-native';
import Styles from './styles';
import { TabConfigurationObject } from './DefaultConfiguration';
import LottieView from 'lottie-react-native';

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.configurationObject = { ...TabConfigurationObject, ...props };

    this.state = {
      hasTextWidth: false,
      textWidth: 0,
      animated: new Animated.Value(this.props.isSelected ? 1 : 0),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isSelected != prevProps.isSelected) {
      if (this.props.isSelected) {
        this.startAnimationToValue(1);
      } else {
        this.startAnimationToValue(0);
      }
    }
  }

  startAnimationToValue = (toValue) => {
    const { animated } = this.state;
    Animated.timing(animated, {
      toValue,
      duration: this.configurationObject.animationDuration,
      useNativeDriver: false,
    }).start();
  };

  getContainerStyle = () => {
    const { hasTextWidth, animated, textWidth } = this.state;
    const {
      containerHorizontalPadding,
      containerVerticalPadding,
      iconSize,
      labelMarginLeft,
    } = this.configurationObject;

    if (!hasTextWidth) {
      return { opacity: 0, ...Styles.tabContainerStyle };
    }

    const backgroundColor = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [
        this.configurationObject.inactiveBGColor,
        this.configurationObject.activeBGColor,
      ],
    });

    const initialWidth = 2 * containerHorizontalPadding + iconSize;
    const finalWidth = initialWidth + labelMarginLeft + textWidth;
    const widthInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [initialWidth, finalWidth],
    });

    const borderRadius = (2 * containerVerticalPadding + iconSize) / 2; // 20 = padding + 24 = image height

    return {
      ...Styles.tabContainerStyle,
      opacity: 1,
      backgroundColor,
      borderRadius,
      width: widthInterpolation,
      paddingVertical: containerVerticalPadding,
      paddingHorizontal: containerHorizontalPadding,
    };
  };

  getLabelStyle = () => {
    const { hasTextWidth, animated } = this.state;
    const {
      containerHorizontalPadding,
      iconSize,
      labelMarginLeft,
    } = this.configurationObject;

    if (!hasTextWidth) {
      return { ...Styles.labelStyle, width: null };
    }

    const width = animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [
        0,
        0,
        containerHorizontalPadding + iconSize + labelMarginLeft,
      ],
    });

    const opacityInterpolation = animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    });

    return {
      ...Styles.labelStyle,
      opacity: opacityInterpolation,
      transform: [{ translateX: width }],
      overflow: 'hidden',
      zIndex: -10,
    };
  };

  render() {
    const { label, icons, isSelected } = this.props;
    const { selected, unselected } = icons;
    const { hasTextWidth, animated } = this.state;
    const {
      iconSize,
      isLottieTab,
      lottieSource,
      activeTintColor,
      inactiveTintColor,
      activeTextStyle,
      inactiveTextStyle,
    } = this.configurationObject;

    const containerStyle = this.getContainerStyle();
    const labelStyle = this.getLabelStyle();

    return (
      <Animated.View style={containerStyle}>
        <Animated.View>
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
              style={{
                width: iconSize,
                height: iconSize,
                tintColor: isSelected ? activeTintColor : inactiveTintColor,
              }}
            />
          )}
        </Animated.View>

        <Animated.View
          style={labelStyle}
          onLayout={({
            nativeEvent: {
              layout: { width },
            },
          }) => {
            if (!hasTextWidth) {
              this.setState({
                textWidth: width,
                hasTextWidth: true,
              });
            }
          }}
        >
          <Animated.Text
            numberOfLines={1}
            style={[isSelected ? activeTextStyle : inactiveTextStyle]}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  }
}

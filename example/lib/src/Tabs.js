import React, {Component} from 'react';
import {Animated} from 'react-native';

import {TabConfigurationObject} from './DefaultConfiguration';
import Styles from './Styles';

class Tabs extends Component {
  constructor(props) {
    super(props);

    this.configurationObject = {...TabConfigurationObject, ...props};

    this.state = {
      animated: new Animated.Value(this.props.isSelected),
    };
  }

  runAnimation = (toValue) => {
    Animated.timing(this.state.animated, {
      toValue,
      duration: 350,
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
      transform: [{translateY: translation}],
    };
  };

  getImageStyle = () => {
    const {isSelected} = this.props;
    const {inactiveTintColor, activeTintColor} = this.configurationObject;

    const scaleInterpolation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, this.configurationObject.activeIconScale],
    });

    return {
      transform: [{scale: scaleInterpolation}],
      tintColor: isSelected ? activeTintColor : inactiveTintColor,
    };
  };

  getTextStyle = () => {
    const scaleInterpolation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return {
      transform: [{scaleY: scaleInterpolation}],
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
    const {label, icons} = this.props;
    const {selected} = icons;

    const containerStyle = this.getContainerAnimatingStyle();
    const imageStyle = this.getImageStyle();
    const testStyle = this.getTextStyle();
    const animatingCircleStyle = this.getAnimatingCircleStyle();

    return (
      <Animated.View style={[Styles.tabStyle, containerStyle]}>
        <Animated.View style={animatingCircleStyle}>
          <Animated.Image
            source={selected}
            resizeMode="contain"
            style={[Styles.tabIconStyle, imageStyle]}
          />
        </Animated.View>

        <Animated.Text style={[Styles.tabTitleStyle, testStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    );
  }
}

export default Tabs;

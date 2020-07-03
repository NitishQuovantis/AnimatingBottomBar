import React, {Component} from 'react';
import {Animated} from 'react-native';

import Styles from './Styles';

class Tabs extends Component {
  constructor(props) {
    super(props);

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
      console.log(this.props.title, this.props.isSelected);

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
      outputRange: [0, -30],
    });

    return {
      transform: [{translateY: translation}],
    };
  };

  getImageStyle = () => {
    const scaleInterpolation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1],
    });

    return {
      transform: [{scale: scaleInterpolation}],
    };
  };

  getTextStyle = () => {
    const scaleInterpolation = this.state.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return {
      transform: [{scaleY: scaleInterpolation}],
    };
  };

  getAnimatingCircleStyle = () => {
    const {animated} = this.state;

    const backgroundColorInterpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ffff', '#ffff'],
    });

    return {
      backgroundColor: backgroundColorInterpolation,
      padding: 10,
      borderRadius: 22,
    };
  };

  render() {
    const {title, icon} = this.props;
    const {selected} = icon;

    const containerStyle = this.getContainerAnimatingStyle();
    const imageStyle = this.getImageStyle();
    const testStyle = this.getTextStyle();
    const animatingCircleStyle = this.getAnimatingCircleStyle();

    return (
      <Animated.View
        style={[
          Styles.tabStyle,
          containerStyle,
          // {backgroundColor: this.props.backgroundColor},
        ]}>
        <Animated.View style={animatingCircleStyle}>
          <Animated.Image
            source={selected}
            resizeMode="contain"
            style={[Styles.tabIconStyle, imageStyle]}
          />
        </Animated.View>

        <Animated.Text style={[Styles.tabTitleStyle, testStyle]}>
          {title}
        </Animated.Text>
      </Animated.View>
    );
  }
}

export default Tabs;

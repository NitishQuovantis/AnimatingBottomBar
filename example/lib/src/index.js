import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Styles from './Styles';
import Tabs from './Tabs';

const {width} = Dimensions.get('screen');
const BottomBarHeight = 100;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

class AnimatingBottomBar2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 1,
      curveAnimated: new Animated.Value(1),
    };
  }

  runSvgAnimation = (toValue) => {
    Animated.timing(this.state.curveAnimated, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  componentDidUpdate(prevProps) {
    const {
      navigation: {
        state: {index: currentIndex},
      },
    } = this.props;

    const {
      navigation: {
        state: {index: previousIndex},
      },
    } = prevProps;

    if (previousIndex !== currentIndex) {
      this.runSvgAnimation(currentIndex + 1);
    }
  }

  getBottomBarStyle = () => {
    return {
      height: BottomBarHeight,
    };
  };

  getNoOfTabs = () => {
    return this.props.routeData.length;
  };

  getCurveAnimatedStyle = () => {
    const noOfTabs = this.getNoOfTabs();

    const translationInterpolation = this.state.curveAnimated.interpolate({
      inputRange: [1, noOfTabs],
      outputRange: [-width, -width / noOfTabs],
    });

    return {
      width: 2 * width,
      height: BottomBarHeight + 10,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      transform: [{translateX: translationInterpolation}],
    };
  };

  getBezierCurve = () => {
    const noOfTabsVisible = this.getNoOfTabs();
    const w = width / noOfTabsVisible; // keeping variable name short because it will be used multiple times
    const wh = w / 2;
    const h = BottomBarHeight;
    const b = h * 0.4;

    const delta = (w - 44) / 2;

    const curveWidth = 74;
    const cw = curveWidth; //alias

    const marginBetweenCurveStartAndTabStart = w - curveWidth;
    const mh = marginBetweenCurveStartAndTabStart / 2;

    // cubic curve command :-  c dx1 dy1, dx2 dy2, dx dy
    // dx1 dy1 & dx2 dy2 => control points
    // dx and dy => points where curve should end

    // Joined cubic curve (follow a cubic curve)
    // s dx2 dy2, dx dy
    // dx1 dy1 => Mirrored of dx2 and dy2 of previous cubic curve
    // dx2 and dy2 => control points
    // dx dy => final point

    const path = `M 0 10 h${width + mh} c${20} 0 ${10} ${b} ${cw / 2} ${b} s ${
      cw / 2 - 20
    } ${-b + 10} ${cw / 2} ${-b} h${width + mh} v${h} h${-2 * width} v${
      h - 10
    }`;

    return path;
  };

  render() {
    const {routeData} = this.props;

    const animatedBottomBarStyle = this.getBottomBarStyle();
    const svgStyle = this.getCurveAnimatedStyle();
    const curvePath = this.getBezierCurve();

    const {
      navigation: {
        state: {index: currentIndex},
      },
    } = this.props;

    return (
      <View>
        {/* This is basically our area of showing overflow menu. One of the main reason for implementing Custom Bottom Bar */}

        <View
          style={[Styles.emptyBoxStyle, {bottom: 0}]}
          pointerEvents="box-none">
          <Animated.View
            style={{
              width: '100%',
              justifyContent: 'flex-end',
            }}>
            <AnimatedSvg style={svgStyle}>
              <Path d={curvePath} fill="white" />
            </AnimatedSvg>
          </Animated.View>
        </View>

        <View
          style={[
            animatedBottomBarStyle,
            {
              marginBottom: 0,
              flexDirection: 'row',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: BottomBarHeight,
            },
          ]}>
          {routeData.map((item, index) => {
            return (
              <TouchableOpacity
                style={Styles.tabStyle}
                onPress={() => {
                  this.props.navigation.navigate(item.routeName);
                }}>
                <Tabs
                  title={item.label}
                  icon={item.icons}
                  isSelected={currentIndex == index}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

export default AnimatingBottomBar2;

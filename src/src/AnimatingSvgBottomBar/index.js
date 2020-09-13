import React, {Component} from 'react';
import {View, TouchableOpacity, Dimensions, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Styles from './Styles';
import Tabs from './Tabs';
import {BottomBarDefaultConfigurationObject} from './DefaultConfiguration';

const {width} = Dimensions.get('screen');

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

class SvgAnimatingBottomBar extends Component {
  constructor(props) {
    super(props);

    this.configurationObject = {
      ...BottomBarDefaultConfigurationObject,
      ...props.bottomBarConfig,
    };

    const {
      navigation: {
        state: {index: currentIndex},
      },
    } = props;

    this.state = {
      selectedIndex: currentIndex + 1,
      curveAnimated: new Animated.Value(currentIndex + 1),
    };
  }

  runSvgAnimation = (toValue) => {
    Animated.timing(this.state.curveAnimated, {
      toValue,
      duration: this.configurationObject.animationDuration,
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

      if (this.configurationObject.onTabBarChange) {
        this.configurationObject.onTabBarChange(
          this.props.routeData[currentIndex],
        );
      }
    }
  }

  getBottomBarStyle = () => {
    return {
      height: this.configurationObject.height,
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
      height: this.configurationObject.height + 10,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      transform: [{translateX: translationInterpolation}],
    };
  };

  getBezierCurve = () => {
    const noOfTabsVisible = this.getNoOfTabs();
    const w = width / noOfTabsVisible; // keeping variable name short because it will be used multiple times
    const h = this.configurationObject.height;
    const b = this.configurationObject.curveDepth;

    // const curveWidth = 84;
    const cw = this.configurationObject.curveWidth; //alias

    const marginBetweenCurveStartAndTabStart = w - cw;
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
        <View
          style={[Styles.emptyBoxStyle, {bottom: 0}]}
          pointerEvents="box-none">
          <Animated.View style={Styles.svgContainerStyle}>
            <AnimatedSvg style={svgStyle}>
              <Path
                d={curvePath}
                fill={this.configurationObject.backgroundColor}
              />
            </AnimatedSvg>
          </Animated.View>
        </View>

        <View
          style={[
            animatedBottomBarStyle,
            Styles.tabsContainerStyle,
            {
              bottom: this.configurationObject.bottom,
              height: this.configurationObject.height,
            },
          ]}>
          {routeData.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.label}
                style={Styles.tabStyle}
                onPress={() => {
                  this.props.navigation.navigate(item.routeName);
                }}>
                <Tabs
                  {...item}
                  isSelected={currentIndex === index}
                  // Common for all tabs props
                  tabCircleDiameter={this.configurationObject.tabCircleDiameter}
                  backgroundColor={this.configurationObject.backgroundColor}
                  extraMarginBetweenTabIconAndLabel={
                    this.configurationObject.extraMarginBetweenTabIconAndLabel
                  }
                  animationDuration={this.configurationObject.animationDuration}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

export default SvgAnimatingBottomBar;

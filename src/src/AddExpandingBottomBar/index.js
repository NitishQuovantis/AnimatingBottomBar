import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Animated, Dimensions} from 'react-native';
import {BottomBarDefaultConfigurationObject} from './DefaultConfiguration';
import Styles from './styles';
import Tab from './Tab';
import Svg, {Path} from 'react-native-svg';
import CenterExpandingTab from './CenterExpandingTab';
import AnimatingBottomBarContext from '../../Contexts/AnimatingBottomBarContext';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');

export default class AddExpandingBottomBar extends Component {
  constructor(props) {
    super(props);
    this.configurationObject = {
      ...BottomBarDefaultConfigurationObject,
      ...props.bottomBarConfig,
    };
  }

  getPath = () => {
    const {height, curveWidth, curveDepth} = this.configurationObject;

    // alias
    const sw = SCREEN_WIDTH;
    const tbh = height;
    const cw = curveWidth;
    const cd = curveDepth;

    return `M 0 0 h${(sw - cw) / 2} c${10} 0 ${0} ${cd} ${cw / 2} ${cd} c${
      cw / 2
    } 0 ${cw / 2 - 10} ${-(cd - 10)} ${cw / 2} ${-cd} h${
      (sw - cw) / 2
    } v${tbh} h${-sw} z`;
  };

  transformRouteData = (routeData) => {
    const length = routeData.length;

    if (routeData.length % 2 !== 0) {
      throw new Error('Number of Tab should in even');
    }

    const newArray = [...routeData];

    const rightTabs = newArray.splice(length / 2);
    const leftTabs = newArray.splice(0, length / 2);

    return {leftTabs, rightTabs};
  };

  render() {
    const {routeData} = this.props;
    const {
      navigation: {
        state: {index: currentIndex},
      },
    } = this.props;

    const noOfTabs = routeData.length;
    const {leftTabs, rightTabs} = this.transformRouteData(routeData);

    const {height, curveWidth} = this.configurationObject;
    const path = this.getPath();

    return (
      <View>
        <View style={Styles.emptyBoxStyle}>
          <Svg height={height} width={'100%'}>
            <Path d={path} fill={'pink'} />
          </Svg>
        </View>

        <View
          style={[
            Styles.containerStyle,
            {height: this.configurationObject.height},
          ]}>
          {leftTabs.map((tab, index) => {
            return (
              <TouchableOpacity
                style={Styles.tabContainerStyle}
                key={tab.label}
                onPress={() => {
                  this.props.navigation.navigate(tab.routeName);
                }}>
                <Tab
                  key={tab.label}
                  {...tab}
                  isSelected={currentIndex === index}
                  animationDuration={this.configurationObject.animationDuration}
                />
              </TouchableOpacity>
            );
          })}

          <View
            style={[Styles.tabContainerStyle, {width: curveWidth, flex: 0}]}>
            <CenterExpandingTab
              {...this.configurationObject}
              extraTabs={this.props.extraTabs}
              selectedIndex={currentIndex - noOfTabs}
              navigation={this.props.navigation}
              currentRouteName={this.context.routeName}
            />
          </View>

          {rightTabs.map((tab, index) => {
            return (
              <TouchableOpacity
                style={Styles.tabContainerStyle}
                key={tab.label}
                onPress={() => {
                  this.props.navigation.navigate(tab.routeName);
                }}>
                <Tab
                  key={tab.label}
                  {...tab}
                  isSelected={currentIndex === noOfTabs / 2 + index}
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

AddExpandingBottomBar.contextType = AnimatingBottomBarContext;

import React, {Component} from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';
import {BottomBarDefaultConfigurationObject} from './DefaultConfiguration';
import Styles from './styles';
import Tab from './Tab';

export default class ExpandingLabelBottomBar extends Component {
  constructor(props) {
    super(props);

    this.configurationObject = {
      ...BottomBarDefaultConfigurationObject,
      ...props.bottomBarConfig,
    };
  }

  render() {
    const {routeData} = this.props;
    const {
      navigation: {
        state: {index: currentIndex},
      },
    } = this.props;

    return (
      <View
        style={[
          Styles.containerStyle,
          {
            height: this.configurationObject.height,
            backgroundColor: this.configurationObject.backgroundColor,
          },
        ]}>
        {routeData.map((tab, index) => {
          return (
            <TouchableOpacity
              key={tab.label}
              onPress={() => {
                this.props.navigation.navigate(tab.routeName);
              }}>
              <Tab
                key={tab.label}
                {...tab}
                isSelected={currentIndex === index}
                labelMarginLeft={this.configurationObject.labelMarginLeft}
                containerHorizontalPadding={
                  this.configurationObject.containerHorizontalPadding
                }
                containerVerticalPadding={
                  this.configurationObject.containerVerticalPadding
                }
                animationDuration={this.configurationObject.animationDuration}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

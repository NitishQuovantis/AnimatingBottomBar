import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import Styles from './styles';
import {TabConfigurationObject} from './DefaultConfiguration';

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.configurationObject = {...TabConfigurationObject, ...this.props};
  }

  render() {
    const {
      icons,
      activeTintColor,
      inactiveTintColor,
      label,
    } = this.configurationObject;

    const {isSelected} = this.props;
    const {selected, unselected} = icons;

    return (
      <View style={Styles.tabContainerStyle}>
        <Image
          source={isSelected ? selected : unselected}
          style={[
            Styles.iconStyle,
            {
              tintColor: isSelected ? activeTintColor : inactiveTintColor,
            },
          ]}
        />
        <Text>{label}</Text>
      </View>
    );
  }
}

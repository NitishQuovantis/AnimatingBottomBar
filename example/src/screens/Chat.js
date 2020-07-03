import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CommonStyle from '../CommonStyle/CommonStyle';

export default class Chat extends Component {
  render() {
    return (
      <View style={CommonStyle.screenContainerStyle}>
        <Text> Chat </Text>
      </View>
    );
  }
}

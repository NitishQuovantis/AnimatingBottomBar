import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CommonStyles from '../CommonStyle/CommonStyle';

export default class VideoCall extends Component {
  render() {
    return (
      <View style={CommonStyles.screenContainerStyle}>
        <Text style={CommonStyles.pageTitle}> Video Call </Text>
      </View>
    );
  }
}

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import CommonStyles from '../CommonStyle/CommonStyle';

export default class VoiceCall extends Component {
  render() {
    return (
      <View style={CommonStyles.screenContainerStyle}>
        <Text style={CommonStyles.pageTitle}> Voice Call </Text>
      </View>
    );
  }
}

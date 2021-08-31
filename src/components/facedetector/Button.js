import React from 'react';
 
import {
  AppRegistry,
  Component,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { theme } from '../../constants/theme';
 
export default class Button extends React.Component {
 
  render(){
    return (
      <View>
        <TouchableHighlight underlayColor={theme.color.africanviolet} onPress={this.props.onpress} style={this.props.button_styles}>
          <View>
              <Text style={this.props.button_text_styles}>{this.props.text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
 
AppRegistry.registerComponent('Button', () => Button);
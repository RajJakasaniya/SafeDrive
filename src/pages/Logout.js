/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  YellowBox,
  StatusBar,
  AsyncStorage,
} from 'react-native';





export default class Logout extends Component {
    componentDidMount() {
        AsyncStorage.clear();
        this.props.navigation.navigate('First')
    }
  render() {
   
    return (
        <Text>Logging Out</Text>
    );
  }
}

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
  StatusBar
} from 'react-native';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Home from './src/pages/Home';
import Drawer from './src/pages/Drawer';
import Add from './src/pages/Add';
import Logout from './src/pages/Logout';
import { StackNavigator } from 'react-navigation';

const RootStack = StackNavigator(
  {
    First: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Second: {
      screen: Signup,
      navigationOptions: {
        header: null,
      }
    },
    Third: {
      screen: Home,
      navigationOptions: {
        header: null,
      }
    },
    Fourth: {
      screen: Add,
      navigationOptions: {
        header: null,
      }
    },
    Fifth: {
      screen: Drawer,
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    initialRouteName: 'First',
    mode: 'card',
    //headerMode: 'none',
  }
);



export default class App extends Component {
  
  render() {
    console.disableYellowBox=true;
    return (
     
     <RootStack/>
      //<Drawer/>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
});

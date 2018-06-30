import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';
export default class Logo extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>

        <Image
            style={{width: 100, height: 100}}
            source={require('../images/logo.png')}
        />
        <Text style={styles.logoText}>Safety comes first!</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  logoText: {
    marginVertical: 10,
    fontSize:12,
    color: '#fbc02d',
  },
});

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
export default class Form extends Component {

  render() {
    return (
      <View style={styles.container}>
         <TextInput style={styles.inputBox}
         underlineColorAndroid='rgba(0,0,0,0)'
         placeholder='E-mail'
         placeholderTextColor='#ffffff'
         />
         <TextInput style={styles.inputBox}
         underlineColorAndroid='rgba(0,0,0,0)'
         placeholder='Password'
         secureTextEntry={true}
         placeholderTextColor='#ffffff'
         />
         <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} >{this.props.type}</Text>
         </TouchableOpacity>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  inputBox: {
    width: 250,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontSize: 16,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#b71c1c',
    width: 150,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center'
  },
});

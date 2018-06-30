import React, { Component } from 'react';
import {
  Button,
  Alert,
  TextInput,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NetInfo,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import Logo from '../components/Logo'
import Form from '../components/Form'

export default class Login extends Component {
 
constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserEmail: '',
      UserPassword: ''
 
    }
 
  }
  componentDidMount(){
    this._loadInitialState().done();
  }
  _loadInitialState = async() =>{
    var value = await AsyncStorage.getItem('user');
    if(value!=null){
      this.props.navigation.navigate('Fifth');
    } 
  }
UserLoginFunction = () =>{
 
 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;
 

 NetInfo.isConnected.fetch().then(isConnected => {
  if(isConnected)
  {
    fetch('https://reissuable-games.000webhostapp.com/login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
     
        email: UserEmail,
     
        password: UserPassword
     
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    
            // If server response message same as Data Matched
           if(responseJson === 'Invalid Username or Password Please Try Again')
            {
              //Alert.alert(responseJson);
              Alert.alert(
                'Login Failed',
                responseJson,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')}
                ],
                { cancelable: false }
              )
            }
            else{
              AsyncStorage.setItem('user',UserEmail);
              AsyncStorage.setItem('mobile',responseJson[0].mobile);
              AsyncStorage.setItem('username',responseJson[0].name);
              AsyncStorage.setItem('password',UserPassword);
              //Then open Profile activity and send user email to profile activity.
              this.props.navigation.navigate('Fifth');
            }
    
          }).catch((error) => {
            console.error(error);
          });

  }else{
    Alert.alert(
      'Connection Problem',
      'Please check your INTERNET Connection',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      { cancelable: false }
    )
  }
})
 
 
  }
 
  render() {
    return (

    <ScrollView contentContainerStyle={styles.container}
      keyboardShouldPersistTaps>
      <Logo/>
      <TextInput style={styles.inputBox}
         underlineColorAndroid='rgba(0,0,0,0)'
         placeholder='E-mail'
         onChangeText={UserEmail => this.setState({UserEmail})}
         placeholderTextColor='#ffffff'
         />
         <TextInput style={styles.inputBox}
         underlineColorAndroid='rgba(0,0,0,0)'
         placeholder='Password'
         onChangeText={UserPassword => this.setState({UserPassword})}
         secureTextEntry={true}
         placeholderTextColor='#ffffff'
         />
         <TouchableOpacity style={styles.button} onPress={this.UserLoginFunction}>
            <Text style={styles.buttonText} >Login</Text>
         </TouchableOpacity>
      <View style={styles.signupText}>
      <Text>
        <Text style={{color:'#ffffff'}}>Dont have an account? </Text>
      </Text>
      <TouchableHighlight
         style={styles.touchbutton}
         onPress={() => this.props.navigation.navigate('Second')}
        >
         <Text style={{color:'#b71c1c', fontWeight: "bold"}}> SIGN UP </Text>
      </TouchableHighlight>
      {/*<Button
        title="SIGN UP"
        style={{color:'#ffffff'}}
        onPress={() => this.props.navigation.navigate('Second')}
      />*/}
      </View>
    </ScrollView>
            
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
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
  touchbutton: {
    alignItems: 'center',
    backgroundColor: '#212121',
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: '#ffffff', 
    textAlign: 'center'
  },
  signupText: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 0
  },
});

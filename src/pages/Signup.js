import React, { Component } from 'react';
import {
 
  Alert,
  TextInput,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  NetInfo,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ImageBackground,
  CheckBox,
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon,Item,Label, InputGroup,Input } from 'native-base';
//import FloatLabelTextInput from 'react-native-floating-label-text-input';
//import Logo from '../components/Logo';
//import { Sae } from 'react-native-textinput-effects';
import * as EmailValidator from 'email-validator';
//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//import Icon from 'react-native-vector-icons/FontAwesome';



export default class Signup extends Component {
 
constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserName: '',
      UserEmail: '',
      UserPassword: '',
      UserMobile: '',
      confirmPassword: '',
    }
 
  }
 
  UserRegistrationFunction = () =>{
 
 
 const { UserName }  = this.state ;
 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;
 const { confirmPassword }  = this.state ;
 const { UserMobile }  = this.state ;
 
 if(UserName==''){
  Alert.alert(
    'Registration Failed',
    'Please enter valid User Name',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')}
    ],
    { cancelable: false }
  )
}else if( UserEmail==''|| !(EmailValidator.validate(UserEmail))){
  Alert.alert(
    'Registration Failed',
    'Invalid Email ID',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')}
    ],
    { cancelable: false }
  )
 }else if(UserPassword==''|| confirmPassword!=UserPassword){
  Alert.alert(
    'Registration Failed',
    'Invalid Password',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')}
    ],
    { cancelable: false }
  )
}else{

  NetInfo.isConnected.fetch().then(isConnected => {
    if(isConnected)
    {
          fetch('https://reissuable-games.000webhostapp.com/user_registration.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            name: UserName,
        
            email: UserEmail,
        
            password: UserPassword,

            mobile: UserMobile,
        
          })
        
        }).then((response) => response.json())
              .then((responseJson) => {
        
        // Showing response message coming from server after inserting records.
        this.props.navigation.navigate('First');
        
              }).catch((error) => {
                console.error(error);
              }); 

    }else{
      Alert.alert(
        'Connection Problem',
        'Please check your Internet Connection',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        { cancelable: false }
      )
    }
})


    
 
    }
}
 
  render() {
    return (
      <Container>
      <Header style={{backgroundColor: '#b71c1c'}} androidStatusBarColor='#000000'>
        <Left>
          <Button transparent style={{width: 75}} onPress={()=> {this.props.navigation.navigate('First')}}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Register</Title>
        </Body>
        <Right />
      </Header>
      
      <ScrollView contentContainerStyle={styles.Container}
keyboardShouldPersistTaps>
      <InputGroup style={styles.inputBox}>
                        <Icon name="ios-contact" style={{color:'#b71c1c'}} />
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoFocus={true}
                            style={{color:'#ffffff'}}
                            placeholder="Full Name"
                            placeholderTextColor='#ffffff'
                            onChangeText={UserName => this.setState({UserName})}
                            value={this.state.UserName}
                        />
                    </InputGroup>

                    <InputGroup style={styles.inputBox}>
                        <Icon name="ios-mail" style={{color:'#b71c1c'}} />
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{color:'#ffffff'}}
                            placeholder="E-mail address"
                            placeholderTextColor='#ffffff'
                            onChangeText={UserEmail => this.setState({UserEmail})}
                            value={this.state.UserEmail}
                        />
                    </InputGroup>


                    <InputGroup style={styles.inputBox}>
                        <Icon name="md-lock" style={{color:'#b71c1c'}}/>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            password={true}
                            style={{color:'#ffffff'}}
                            secureTextEntry={true}
                            placeholder="Password"
                            placeholderTextColor='#ffffff'
                            onChangeText={UserPassword => this.setState({UserPassword})}
                            value={this.state.UserPassword}
                        />
                    </InputGroup>


                    <InputGroup style={styles.inputBox}>
                        <Icon name="md-lock" style={{color:'#b71c1c'}}/>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            password={true}
                            style={{color:'#ffffff'}}
                            secureTextEntry={true}
                            placeholder="Confirm Password"
                            placeholderTextColor='#ffffff'
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            value={this.state.confirmPassword}
                        />
                    </InputGroup>
  
                
                    <InputGroup style={styles.inputBox}>
                        <Icon name="ios-call" style={{color:'#b71c1c'}}/>
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{color:'#ffffff'}}
                            placeholder="Emergency Contact"
                            placeholderTextColor='#ffffff'
                            onChangeText={UserMobile => this.setState({UserMobile})}
                            value={this.state.UserMobile}
                            keyboardType='numeric'
                            maxLength={10}
                        />
                    </InputGroup>
                    
                    
         {/* 
         <ImageBackground source={require('../images/traffic.jpg')} blurRadius={3} style={styles.background}>
      
         <Item floatingLabel style={styles.inputBox}>
         
            <Label style={styles.buttonText}>Full Name</Label>
            <TextInput 
            style={styles.inputBox}
            onChangeText={UserName => this.setState({UserName})}
            />
         </Item>
         <Item floatingLabel style={styles.inputBox}>
         
            <Label style={styles.buttonText}>E-mail address</Label>
            <TextInput style={styles.inputBox}
            onChangeText={UserEmail => this.setState({UserEmail})}
            />
         </Item>
         <Item floatingLabel style={styles.inputBox}>
         
            <Label style={styles.buttonText}>Password</Label>
            <TextInput style={styles.inputBox}
            secureTextEntry={true}
            onChangeText={UserPassword => this.setState({UserPassword})}
            />
         </Item>
         <Item floatingLabel style={styles.inputBox}>
         
            <Label style={styles.buttonText}>Emergency Contact</Label>
            <TextInput style={styles.inputBox}
            onChangeText={UserMobile => this.setState({UserMobile})}
            />
         </Item> 
         </ImageBackground>
         */}
         
        <TouchableOpacity style={styles.button} onPress={this.UserRegistrationFunction}>
            <Text style={styles.buttonText1} >Register</Text>
         </TouchableOpacity>
      
  
         
</ScrollView>
    </Container>

            
    );
  }
}
 
const styles = StyleSheet.create({
 
Container :{
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#212121',
},
background: {
  flex: 1,
  alignSelf: 'stretch',
  width: null,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor:'#ffffff',
},
inputBox: {
  width: 300,
  borderBottomColor: '#ffffff',
  borderBottomWidth: 1,
  marginVertical: 10,
  fontSize: 16,
  color:'#ffffff'
},
button: {
  backgroundColor: '#b71c1c',
  width: 250,
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
  color: '#ffffff', 
  textAlign: 'center'
},
buttonText1: {
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

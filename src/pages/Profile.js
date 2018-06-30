
import React, { Component } from 'react';
import {
  Alert,
  TextInput,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  NetInfo,
  AsyncStorage,

} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon,Item,Label, InputGroup,Input } from 'native-base';


export default class profile extends Component {
 
  constructor(props) {
 
    super(props)
 
    this.state = {
      UserName:'',
      UserMobile: '',
      UserEmail:'',
      UserPassword: '',
      hidePassword: true,
    }
 
  }
  managePasswordVisibility = () =>
    {
    this.setState({ hidePassword: !this.state.hidePassword });
    }


    profileChange = () =>{
        const { UserName }  = this.state ;
        const { UserPassword }  = this.state ;
        const { UserMobile }  = this.state ;
        const { UserEmail }  = this.state ;
        //Alert.alert("RAJ");
        if(UserName==''){
         Alert.alert(
           'Update Failed',
           'Please enter valid User Name',
           [
             {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
             {text: 'OK', onPress: () => console.log('OK Pressed')}
           ],
           { cancelable: false }
         )
       }else if(UserPassword==''){
         Alert.alert(
           'Update Failed',
           'Invalid Password',
           [
             {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
             {text: 'OK', onPress: () => console.log('OK Pressed')}
           ],
           { cancelable: false }
         )
       }else{
        //Alert.alert("DASA");
         NetInfo.isConnected.fetch().then(isConnected => {
           if(isConnected)
           {
            //Alert.alert("DASA");
                 fetch('https://reissuable-games.000webhostapp.com/edit_profile.php', {
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
               
               if(responseJson === 'Try again'){
                Alert.alert(
                  'Server Unresponsive',
                  'Please try again after sometime',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')}
                  ],
                  { cancelable: false }
                )
              }else{

            AsyncStorage.setItem('user',UserEmail);
            AsyncStorage.setItem('mobile',UserMobile);
            AsyncStorage.setItem('username',UserName);
            AsyncStorage.setItem('password',UserPassword);
                this.props.navigation.navigate('Home');
              
            }


               //this.props.navigation.navigate('First');
               
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

  componentDidMount(){
    this._loadInitialState().done();
  }
  _loadInitialState = async() =>{
    var value = await AsyncStorage.getItem('mobile');
    this.setState({UserMobile: value});
    var value1 = await AsyncStorage.getItem('username');
    this.setState({UserName: value1});
    var value2 = await AsyncStorage.getItem('user');
    this.setState({UserEmail: value2});
    var value3 = await AsyncStorage.getItem('password');
    this.setState({UserPassword: value3});
  }

 
  
  render() {
   
   return (
    <Container>
      <Header style={{backgroundColor: '#000000'}} androidStatusBarColor='#000000'>
        <Left>
          <Button transparent style={{width: 100}} onPress={()=> {this.props.navigation.navigate('Addacc')} }>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>Profile</Title>
        </Body>
        <Right />
      </Header>
       
      <ScrollView style={styles.container}
      keyboardShouldPersistTaps>
        <View
          style={{
            
            height: 100,
           // padding: 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderTopWidth: 5,
            borderTopColor: '#b71c1c',
            justifyContent:'center'
          }}>
          <Icon name="ios-contact-outline" style={{color:'#ffffff',textAlign: 'center',fontSize:70,justifyContent:'flex-start'}} />
          
        </View>
        
        <View
        style={{
            
            flexGrow:1,
            marginTop:20,
            
            
            justifyContent:'center'
          }}>

                    <Item stackedLabel>
                    <Label style={{color:'#ffffff50'}}>Username</Label>
                    <InputGroup>
                        <Icon name="ios-person" style={{color:'#b71c1c'}} />
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{color:'#ffffff'}}
                            placeholderTextColor='#ffffff'
                            onChangeText={UserName => this.setState({UserName})}
                            value={this.state.UserName}
                        />
                        
                    </InputGroup>
                    </Item>
                    <Item stackedLabel>
                    <Label style={{color:'#ffffff50'}}>E-mail address</Label>
                    <InputGroup>
                        <Icon name="ios-mail" style={{color:'#b71c1c'}} />
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            selectTextOnFocus={false}
                            style={{color:'#ffffff'}}
                            placeholderTextColor='#ffffff'
                            onChangeText={UserEmail => this.setState({UserEmail})}
                            value={this.state.UserEmail}
                        />
                    </InputGroup>
                    </Item>
                    <Item stackedLabel>
                    <Label style={{color:'#ffffff50'}}>Emergency Contact</Label>
                    <InputGroup>
                        <Icon name="ios-call" style={{color:'#b71c1c'}} />
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='numeric'
                            maxLength={10}
                            style={{color:'#ffffff'}}
                            placeholderTextColor='#ffffff'
                            onChangeText={UserMobile => this.setState({UserMobile})}
                            value={this.state.UserMobile}
                        />
                    </InputGroup>
                    </Item>
                    <Item stackedLabel>
                    <Label style={{color:'#ffffff50'}}>Password</Label>
                    <InputGroup>
                    
                        <Icon name="md-lock" style={{color:'#b71c1c'}} />
                    
                   
                        <Input
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{color:'#ffffff'}}
                            placeholderTextColor='#ffffff'
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={UserPassword => this.setState({UserPassword})}
                            value={this.state.UserPassword}
                        />
                        <Right>
                        <TouchableOpacity activeOpacity = { 0.8 } style = {{ position: 'absolute' }} onPress = { this.managePasswordVisibility }>
                        <Icon name={( this.state.hidePassword ) ? "ios-eye" : "ios-eye-off" } style={{color:'#b71c1c',fontSize:30}} />
                        </TouchableOpacity>
                        </Right>
                    </InputGroup>
                    </Item>
        <TouchableOpacity style={{backgroundColor: '#b71c1c',width: 250,borderRadius: 25,padding: 8,marginTop: 30,marginLeft:60,alignItems: 'center',textAlign:'center'}} onPress={this.profileChange} >
            <Text style={styles.buttonText} >Save Changes</Text>
         </TouchableOpacity>  
        </View>
      </ScrollView>
      </Container> 
     
   );
 }
}
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#000000',
    },
    inputBox: {
        width: 300,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize: 16,
        color:'#ffffff',
        alignItems:'center',
      },
    button: {
      backgroundColor: '#b71c1c',
      width: 250,
      //bottom: 0,
      //justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      padding: 8,
      marginTop: 30,
      //marginLeft: 70,
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff',
      fontWeight: "bold",
      textAlign: 'center',
      justifyContent: 'center'
    },
    emergencyText: {
      //flex: 1, 
      flexDirection: 'column',
      fontSize: 16,
      //fontWeight: "bold",
      color: '#ffffff', 
      textAlign: 'center',
      //justifyContent: 'flex-start',
      //alignItems: 'center',
      marginBottom:10,
      //borderBottomWidth: 3,
      //borderBottomColor: '#b71c1c',
      //borderRadius: 4,
    },
  });

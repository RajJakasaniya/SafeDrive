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
  TouchableHighlight,
  StatusBar,
  ImageBackground,
  CheckBox,
  AsyncStorage,
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon,Item,Label, InputGroup,Input } from 'native-base';
import call from 'react-native-phone-call';
import SendSMS from 'react-native-sms'


export default class emergency extends Component {
 
  constructor(props) {
 
    super(props)
 
    this.state = {
      UserName:'',
      UserMobile: '',
      UserEmail:'',
      lati: '',
      longi: '',
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
    var v3 = await AsyncStorage.getItem('latitude');
    this.setState({lati: v3});
    var v4 = await AsyncStorage.getItem('longitude');
    this.setState({longi: v4});
  }
  sms_send = () =>{
    
    SendSMS.send({
      body: 'Help me! I am in trouble ,Road accident. at google.com/maps/place/'+this.state.lati+','+this.state.longi,
      recipients: [this.state.UserMobile],
      successTypes: ['sent', 'queued']
    }, (completed, cancelled, error) => {
  
      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
  
    });
  }
  render() {
    const emergency = {
      number: this.state.UserMobile, 
      prompt: true ,
      }
    const ambulance = {
      number: '108', 
      prompt: true ,
      }
    const police = {
      number: '100', 
      prompt: true ,
      }
   return (
    <Container>
    <Header style={{backgroundColor: '#000000'}} androidStatusBarColor='#000000' >
      <Left>
        <Button transparent style={{width:100}} onPress={()=> {this.props.navigation.navigate('Home')} }>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title></Title>
      </Body>
      <Right />
    </Header>
    <View style={styles.Container}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          height: 100,
          padding: 20,
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderTopWidth: 5,
          borderTopColor: '#b71c1c',
          justifyContent: 'center',
          
        }}>
        <Text style={styles.emergencyText}>In Case of Emergency</Text>
        <View
        style={{
          flexDirection: 'column',
          flex: 1,
          height: 1,
          borderBottomWidth: 4,
          borderBottomColor: '#b71c1c',
          justifyContent: 'center',
          marginTop:5,
          marginLeft:100,
          marginRight:100,
        }}>

        </View>
      </View>
        <View 
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          height: 100,
          marginTop:5,
          marginLeft:10,
          marginRight: 10,
          justifyContent: 'center',
          
        }}>

          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              //backgroundColor: 'red',
              borderBottomWidth: 2,
              borderRightWidth: 2,
              borderRightColor: '#ffffff50',
              borderBottomColor: '#ffffff50',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
           
            <Icon name="ios-person-outline" style={{color:'#b71c1c',fontSize:80}} onPress={()=>call(police).catch(console.error)}/>
            <Text style={styles.iconText}>Call Police</Text>
            
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              //backgroundColor: 'blue',
              borderBottomWidth: 2,
              borderBottomColor: '#ffffff50',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="ios-call-outline" style={{color:'#b71c1c',fontSize:80}} onPress={()=>call(emergency).catch(console.error)}/>
            <Text style={styles.iconText}>Call Emergency Contact</Text>
            
          </View>
        </View>
        <View 
        style={{
          flexDirection: 'row',
          flexGrow: 1,
          height: 100,
          justifyContent: 'center',
          marginBottom:10,
          marginLeft:10,
          marginRight: 10,
        }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              //backgroundColor: 'blue',
              borderRightWidth: 2,
              borderRightColor: '#ffffff50',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="ios-mail-outline" style={{color:'#b71c1c',fontSize:80}} onPress={this.sms_send}/>
            <Text style={styles.iconText}>SMS Emergency Contact</Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              //backgroundColor: 'red',
              
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="ios-medkit-outline" style={{color:'#b71c1c',fontSize:80}} onPress={()=>call(ambulance).catch(console.error)}/>
            
            <Text style={styles.iconText}>Call Ambulance</Text>
          </View>
        </View>
        <View
        style={{
          flexDirection: 'row',
          flex: 1,
          height: 100,
          padding: 20,
          //backgroundColor: 'black',
          justifyContent: 'center',
          
        }}>
      </View>
      </View>
    {/* <Content>
         <Text>
            {global.email}
         </Text>
         <Text>
            {global.name}
         </Text>
         <Text>
            {global.mobile}
         </Text>
    </Content> */}

    </Container>
     
   );
 }
}
const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    flexDirection: 'column',
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
  iconText: {
    fontSize: 12,
    fontWeight: "bold",
    color: '#ffffff', 
    textAlign: 'center'
  },
  emergencyText: {
    flex: 1, 
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: "bold",
    color: '#ffffff', 
    textAlign: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 3,
    //borderBottomWidth: 3,
    //borderBottomColor: '#b71c1c',
    //borderRadius: 4,
  },
});

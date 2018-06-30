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
import DatePicker from 'react-native-datepicker'



export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      Severity: 0,
      vehicles: 0,
    };
  }

  handlePress = () => {

    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected)
      {

    fetch('https://pdhruv1109.000webhostapp.com/add_accident.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       latitude: this.props.navigation.state.params.lati,

       longitude: this.props.navigation.state.params.longi,

       date: this.state.date,

       time: this.state.time,

       severity: this.state.Severity,

       vehicles: this.state.vehicles
       
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    
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
            this.props.navigation.navigate('Home');
          }
   // Showing response message coming from server after inserting records.
    
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
      });
  }

  render(){
    return (
      <Container>
      <Header style={{backgroundColor: '#212121'}} androidStatusBarColor='#000000'>
        <Left>
          <Button transparent style={{width: 100}} onPress={()=> {this.props.navigation.navigate('Addacc')} }>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title></Title>
        </Body>
        <Right />
      </Header>
       
      <ScrollView style={styles.container}
      keyboardShouldPersistTaps>
        <View
          style={{
            
            height: 100,
            padding: 20,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderTopWidth: 5,
            borderTopColor: '#b71c1c',
            
          }}>
          <Text style={styles.emergencyText}>Accident details</Text>
          <View
          style={{
            flexDirection: 'column',
            //flex: 1,
            
            height: 1,
            borderBottomWidth: 4,
            borderBottomColor: '#b71c1c',
            //justifyContent: 'flex-start',
            marginTop: 5,
            marginLeft: 100,
            marginRight: 100,
          }}>

          </View>
        </View>
        <View
        style={{
          flex: 1,
          height: 100,
          padding: 20,
          //backgroundColor: 'blue',
          justifyContent:'flex-end',
          alignItems:'center',
          marginTop:300
        }}>
      
        <DatePicker
          style={{width: 250,margin:10,color: '#000000'}}
          date={this.state.date}
          mode="date"
          placeholder="Date of Accident"
          placeholderTextColor='#ffffff'
          format="YYYY-MM-DD"
          showIcon={false}
          customStyles={{dateInput: {
            backgroundColor:'rgba(255,255,255,0.2)',
            borderWidth: 0,
            
          },}}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({date: date});}}
        />
       
        
       <DatePicker
          style={{width: 250,margin:10,color: '#000000'}}
          date={this.state.time}
          mode="time"
          placeholder="Time of Accident"
          placeholderTextColor='#000000'
          format="HH:MM"
          showIcon={false}
          customStyles={{dateInput: {
            backgroundColor:'rgba(255,255,255,0.3)',
            borderWidth: 0,
          },}}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(time) => {this.setState({time: time});}}
        />
         <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Severity (out of 10)"
          maxLength={1}
          placeholderTextColor='#00000080'
          onChangeText={vehicles => this.setState({vehicles})}
          value={this.state.vehicles}
          keyboardType='numeric'
          style={{
            width: 250,
            margin:10,
            backgroundColor:'rgba(255,255,255,0.4)',
            alignItems:'center',
            color:'#00000080',
            textAlign: 'center',
          }}
          />

          <TextInput
          
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="No. of Vehicles"
          maxLength={1}
          placeholderTextColor='#00000080'
          keyboardType='numeric'
          onChangeText={Severity => this.setState({Severity})}
          value={this.state.Severity}
          style={{
            width: 250,
            margin:10,
            backgroundColor:'#rgba(255,255,255,0.5)',
            alignItems:'center',
            color:'#00000080',
            textAlign: 'center',
          }}
          />
        
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
            <Text style={styles.buttonText} >ADD</Text>
         </TouchableOpacity>            
         
        
          </View>
          
      </ScrollView>
      </Container> 

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#212121',
  },
  inputBox: {
    width: 300,
    borderColor: '#ffffff',
    borderWidth: 4,
    marginVertical: 10,
    fontSize: 16,
    color:'#ffffff',
  },
  button: {
    backgroundColor: '#b71c1c',
    width: 250,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 25,
    padding: 8,
    marginTop: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
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
    fontSize: 22,
    //fontWeight: "bold",
    color: '#ffffff', 
    textAlign: 'center',
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    marginTop: 20,
    //borderBottomWidth: 3,
    //borderBottomColor: '#b71c1c',
    //borderRadius: 4,
  },
});


// Changes made :-
// 1) maximumAge: 2000 removed
// 2) added provide in mapview and PROVIDER_GOOGLE in from react native maps
// 3) added onUserLocationChange and its handler
import React, { Component } from 'react';
import {
  Platform, Alert,
  StyleSheet,Text,View,
  StatusBar,Dimensions,
  AsyncStorage,Vibration,
  BackAndroid, BackHandler,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const DURATION = 5000 ;
 
const PATTERN = [ 1000, 2000, 3000, 4000] ;
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA*ASPECT_RATIO;
const timer = require('react-native-timer');
const LAT_DELTA = 0.0922;
const LONG_DELTA = 0.0421;

const API_KEY = 'AIzaSyCzCp-5N1SNvPBnEpccv-58wvug65aEw1Q';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      pointerPosition: {
        latitude: 0,
        longitude: 0
      },
      lati: 0.0,
      longi: 0.0,
      count: 0,
      markers: [{latitude:0, longitude:0, weight: 1}]
    }
    this.HandleFunction=this.HandleFunction.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeOut=this.handleTimeOut.bind(this);
  }


  StartVibrationFunction=()=>{
 
    // Device Will Vibrate for 10 seconds.
    Vibration.vibrate(DURATION) ;
 
    // Android Device Will Vibrate in pattern : Wait 1sec -> vibrate 2sec -> wait 3sec.
    // iOS Device Will Vibrate in pattern : Wait 1sec -> Vibrate -> wait 2sec -> Vibrate -> wait 3sec -> Vibrate
    
    // Vibration.vibrate(PATTERN)
 
 
    // Android Device Will Vibrate in above pattern Infinite Time.
    // iOS Device Will Vibrate in above pattern Infinite Time.
    
    // Vibration.vibrate(PATTERN, true)
 
  }

  StopVibrationFunction=()=>{
    
    // Stop Vibration.
    Vibration.cancel();
 
 
  }
  handleChange(e){
    // Do Server call and check user location (e.nativeEvent.coordinate) in database and alert accordingly

    this.setState({lati: e.nativeEvent.coordinate.latitude}),
    this.setState({longi: e.nativeEvent.coordinate.longitude})

    this.setState(prevState => ({ count: prevState.count + 1 }));
    Alert.alert("ASD");
    if(this.state.count==10){
      this.setState({count:0});
      fetch('https://pdhruv1109.000webhostapp.com/check_accident.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       latitude: this.state.lati,

       longitude: this.state.longi
       
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    
   // Showing response message coming from server after inserting records.
   //this.props.navigation.navigate('Third');
    if(responseJson === 'Safezone')
    {

        //Then open Profile activity and send user email to profile activity.

    }
    else if(responseJson === 'Alert!! You are in accident prone area'){
          Alert.alert(responseJson);
          this.StartVibrationFunction();
    }
    else{
        Alert.alert(responseJson);
    }
        
         }).catch((error) => {
           console.error(error);
         });
    
        }
     }
    
handleTimeOut(){
  timer.clearTimeout(this);
  this.HandleFunction();

}

     HandleFunction(){
      //Alert.alert(event.nativeEvent.coordinate.latitude);
    
    //this.setState(prevState => ({ count: prevState.count + 1 }));
    //if(this.state.count==100){
      //this.setState({count:0});
      //Alert.alert("ASD");
      timer.clearTimeout(this);
      //Alert.alert("ASDDSASDF");
      navigator.geolocation.getCurrentPosition(pos => {
        console.log("raw pos lat: ", pos.coords.latitude); //triggers in Android only
        //this.setState({lati: pos.coords.latitude}),
        //this.setState({longi: pos.coords.longitude}),
      //Alert.alert("ASD");
        //this.setState({count:0});
    
    AsyncStorage.setItem('latitude',JSON.stringify(pos.coords.latitude));
    AsyncStorage.setItem('longitude',JSON.stringify(pos.coords.longitude));
        fetch('https://pdhruv1109.000webhostapp.com/check_accident.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      
        latitude: pos.coords.latitude,

        longitude: pos.coords.longitude
        
      
      })
      
    }).then((response) => response.json())
          .then((responseJson) => {
      
    // Showing response message coming from server after inserting records.
    //this.props.navigation.navigate('Third');
      if(responseJson === 'Safezone')
      {
          timer.setTimeout(this, 'Name',this.handleTimeOut , 7000);
          //Then open Profile activity and send user email to profile activity.

      }
      else if(responseJson === 'Alert!! You are in accident prone area'){
        Alert.alert(
          'Alert',
          'You have Entered Accident Prone Area.',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.StopVibrationFunction()}
          ],
          { cancelable: false }
        )
            this.StartVibrationFunction();
            timer.setTimeout(this, 'Name',this.handleTimeOut , 7000);
      }
      else{
        timer.setTimeout(this, 'Name',this.handleTimeOut , 2000);
          Alert.alert(responseJson);
      }
          
          }).catch((error) => {
            console.error(error);
          });
      
          },
          (error) => alert('Error: Are location services on?'),
          { enableHighAccuracy: false });
      //this.StartVibrationFunction();
    }
  //}


  /*
  handleBackButton = () => {
   Alert.alert(
       'Exit App',
       'Exiting the application?', [{
           text: 'Cancel',
           onPress: console.log('Cancel Pressed'),
           style: 'cancel'
       }, {
           text: 'OK',
           onPress: BackHandler.exitApp(),
       }, ]
    )
    return ture;
  }
  */
 _loadInitialState = async() =>{
  var value = await AsyncStorage.getItem('user');
  if(value==null){
   this.props.navigation.navigate('First');
  }
}



    

  componentDidMount(){
    //BackHandler.exitApp();
    //BackHandler.addEventListener('hardwareBackPress',function(){
    //  BackHandler.exitApp();
    //});
    this._loadInitialState().done();

    fetch('https://pdhruv1109.000webhostapp.com/heat.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
      latitude: this.state.lati
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    if(JSON.stringify(responseJson) === '"'+'No Accident Areas Available'+'"' || JSON.stringify(responseJson) === "No Accident Areas Available")
    {
      Alert.alert(responseJson);
    }
    else
    {
      var size = responseJson.length;
      var i;
      for(i=0;i<size;i++)
      {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              latitude: JSON.parse(responseJson[i].latitude),
              longitude: JSON.parse(responseJson[i].longitude),
              weight: JSON.parse(responseJson[i].weight)

            }
          ]
        })
      }
    }
        
         }).catch((error) => {
           console.error(error);
         });
        

         navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            this.setState({initialPosition:{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }})
          },
          (error) => Alert.alert(
            'Location Error',
            'Unable to determine your location, please turn on your GPS/Location services',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ],
            { cancelable: false }
          ),
          { enableHighAccuracy: false }
        )
      
  }
  
  componentWillUnmount() {
    //var v4 = AsyncStorage.getItem('longitude');
    //Alert.alert(JSON.stringify(v4));
    //BackHandler.removeEventListener('hardwareBackPress');
    timer.clearTimeout(this);
    navigator.geolocation.clearWatch(this.watchID);
  }


  render() {
    return (
        <Container>
        <Header style={{backgroundColor: '#b71c1c'}} androidStatusBarColor='#000000' >
          <Left>
            <Button transparent style={{width:100}} onPress={()=>this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>  
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
          <View style={styles.container}>
            <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
            onUserLocationChange={timer.setTimeout(this, 'Name',this.handleTimeOut , 5000)}
            showsTraffic={true}
            showsMyLocationButton={true}
            region={this.state.initialPosition}
            /*initialRegion={{
              latitude: 23.1,
              longitude: 72.6,
              latitudeDelta: LAT_DELTA,
              longitudeDelta: LONG_DELTA
            }}*/>
            <MapView.Heatmap points={this.state.markers}
                         opacity={0.7}
                         gradient={{
                          colors: ["#000000", "#b71c1c", "#1c54ff", "#faff00", "#9800ff"],
                          values: [0, 0.25, 0.50, 0.75, 1]}}
                         
                         heatmapMode={"POINTS_DENSITY"}/>
            </MapView>
            <ActionButton
              buttonColor="#b71c1c"
              position="right"
              onPress={()=> {this.props.navigation.navigate('Add an accident')} }
            />
          </View>
        </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 500 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
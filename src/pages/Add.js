
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,BackHandler,
  TouchableOpacity,  Dimensions
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA*ASPECT_RATIO;

const API_KEY = 'AIzaSyCzCp-5N1SNvPBnEpccv-58wvug65aEw1Q';

export default class Add extends Component {
  constructor(props){
    super(props)
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      pointerPosition: {
        latitude: 0,
        longitude: 0
      },
      lati: 0.0,
      longi: 0.0,
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(e) {
    this.setState({markers: [
      {
        coordinate: e.nativeEvent.coordinate,
      }
    ]
  }),
  this.setState({lati: e.nativeEvent.coordinate.latitude}),
  this.setState({longi: e.nativeEvent.coordinate.longitude})
  }


  componentDidMount(){
    //BackHandler.removeEventListener('hardwareBackPress');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState({initialPosition:{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }})
      },
      (error) => alert('Error: Are location services on?'),
      { enableHighAccuracy: false }
    )
  }
  
  componentWillUnmount() {
    
  }

  render() {
    return (
      <Container>
      <Header style={{backgroundColor: '#b71c1c'}} androidStatusBarColor='#000000'>
        <Left>
          <Button transparent style={{width: 100}} onPress={()=>this.props.navigation.openDrawer()}>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Add an accident</Title>
        </Body>
        <Right />
      </Header>
      
      <View style={styles.container}>
          <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          style={styles.map}
          //mapType="terrain"
          showsTraffic={true}
          showsMyLocationButton={true}
          onPress={this.handlePress}
          initialRegion={{
            latitude: 23.1,
            longitude: 72.6,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          //region={this.state.initialPosition}
          >
          {this.state.markers.map((marker) => {
            return (
              <Marker {...marker}
              key={API_KEY} >
              </Marker>
            )
          })}

          


          </MapView>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Adddet',{lati: this.state.lati, longi: this.state.longi})}>
            
            <Text style={styles.buttonText} >Next</Text>
          </TouchableOpacity>
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
  button: {
    backgroundColor: '#b71c1c',
    width: 250,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-start',
    borderRadius: 25,
    padding: 8,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: "bold",
    textAlign: 'center'
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
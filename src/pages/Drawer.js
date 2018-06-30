import React, { Component } from 'react';
import {
  AsyncStorage,
  ScrollView,
  Text,
  Share,
  BackAndroid,
  TouchableOpacity,
  View,BackHandler,
} from 'react-native';

import { Icon } from 'native-base';
import { DrawerNavigator,DrawerItems,StackNavigator,SafeAreaView } from 'react-navigation';

import Home from './Home';
import Add from './Add';
import Logout from './Logout';
import setting from './Setting';
import emergency from './emergency';
import profile from './Profile';
import detail from './Details';


const RootStack = StackNavigator(
    {
      Addacc: {
        screen: Add,
        navigationOptions: {
          header: null,
        }
      },
      Adddet: {
        screen: detail,
        navigationOptions: {
            header: null,
          }
      },
    },
    {
      initialRouteName: 'Addacc',
      mode: 'card',
      //headerMode: 'none',
    }
  );


const MyApp = DrawerNavigator({     
    'Home': {
     screen: Home,
     navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Icon name="ios-home" style={{color:'#b71c1c'}} />
        ),
        }
   },
   'Add an accident': {
       screen: RootStack,
       navigationOptions: {
        drawerIcon: () => (
            <Icon name="md-add-circle" style={{color:'#b71c1c'}} />
        ),
        }
   },
   Emergency: {
        screen: emergency,
        navigationOptions: {
            
            drawerIcon: () => (
                <Icon name="ios-help-buoy" style={{color:'#b71c1c'}} />
            ),
            }
   },
   'Profile' : {
    screen: profile,
    navigationOptions: {
       drawerLabel: 'Profile',
       drawerIcon: () => (
           <Icon name="ios-person" style={{color:'#b71c1c'}} />
       ),
       }
  },
  //  Logout:{
  //       screen: Logout,
  //       navigationOptions: {
  //           drawerIcon: () => (
  //               <Icon name="md-power" style={{color:'#b71c1c'}} />
  //           ),
  //           }
  //  },
  },
  {
    contentComponent: (props) => {
       return (
         <ScrollView>
           <DrawerItems {...props} />
           <TouchableOpacity
             onPress={()=>{AsyncStorage.clear(),BackHandler.exitApp();}
            }
             style={{flexGrow:1,flexDirection:'row',marginTop:7}}>
             <Icon name="md-power" style={{color:'#b71c1c95',marginLeft:17}} />
               <Text style={{fontSize: 14,
  fontWeight: "bold",
  color: '#b71c1c',marginLeft:32,marginTop:3}}>
                 Logout
               </Text>
           </TouchableOpacity>


           <TouchableOpacity
             onPress={() => {
               Share.share({
                 message: "Download Safe Drive Android Application :- https://play.google.com/store/apps/details?id=com.raj.safedrive"
               });
             }} style={{flexGrow:1,flexDirection:'row'}}>
             <Icon name="md-share" style={{color:'#b71c1c95',marginLeft:17,marginTop:21}} />
               <Text style={{fontSize: 14,
  fontWeight: "bold",
  color: '#b71c1c',marginLeft:32,marginTop:24}}>
                 Share
               </Text>
           </TouchableOpacity>
           
         </ScrollView>
       );
     },
     contentOptions: {
        activeTintColor :'#b71c1c',
         inactiveTintColor :'#b71c1c',
   
        activeBackgroundColor :'#00000025',
        inactiveBackgroundColor :'#ffffff',
     },
     initialRouteName: 'Home',
    }
);


export default class Drawer extends Component {
    constructor(props) {
 
        super(props)
     
        this.state = {
          UserName:'',
        }
      }

      componentDidMount(){
        this._loadInitialState().done();
      }
      _loadInitialState = async() =>{
        var value1 = await AsyncStorage.getItem('username');
        this.setState({UserName: value1});
      }
    render()
     {
        
        return (
            <MyApp/>
        );
    }
}
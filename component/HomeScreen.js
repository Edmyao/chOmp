import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { PropTypes } from 'prop-types';

export default class App extends React.Component {

  static navigationOptions = {
    title: "c h o m p !",
      headerStyle: {
        backgroundColor:'#233142',
      },
      headerTitleStyle: {
        fontWeight:'bold',
        color:'#ea9085',
      },
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image resizeMode='contain' source={require('../assets/pots_and_pans_home.png')}style={styles.img}/>
        </View>

        <View style={styles.buttContainer}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('EatIn')}
          style={styles.buttons} activeOpacity={0.4}> 
            <Text style={styles.text}>EAT IN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('EatOut')}
          style={styles.buttons} activeOpacity={0.4}>
            <Text style={styles.text}>EAT OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:320, 
    height:320,
  },
  buttContainer:{
    width:300,
    height:70,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  buttons: {
    margin:10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ea9085',
    height:'auto',
    width:'45%',
    justifyContent: 'center',
    borderRadius:8,
    elevation: 3,
  },
  text:{
    alignSelf:'center',
    color:'#900d0d',
    fontSize:15,
  },
  img:{
    flex:1,
  },
});

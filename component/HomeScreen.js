import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { PropTypes } from 'prop-types';

export default class App extends React.Component {

  static navigationOptions = {
    title: "c h O m p !",
    headerStyle: {
      backgroundColor:'#BB736A',
    },
    headerTitleStyle: {
      fontWeight:'bold',
      color:'#681a1e'
      // color:'#233142'
    },
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require('../assets/logo.png')}style={styles.img}/>
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
    backgroundColor: '#fef4e8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer:{
    width:250,
    height:70,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  buttContainer:{
    width:300,
    height:70,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  buttons: {
    bottom:90,
    margin:10,
    backgroundColor: '#ea9085',
    height:'15%',
    width:'45%',
    justifyContent: 'center',
    borderRadius:8,
    elevation: 3,
  },
  text:{
    alignSelf:'center',
    color:'#900d0d',
    fontSize:15,
    fontFamily:'sans-serif-medium',
  },
  img:{
    height:155,
    width:120,
    top:60,

  },
});

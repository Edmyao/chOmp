import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppRegistry, TextInput } from 'react-native';

export default class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = { 
	    text: '',
	  };
	}

	static navigationOptions = {
	    title: "c h O m p !",
	    headerStyle: {
	      backgroundColor:'#233142',
	    },
	    headerTitleStyle: {
	      fontWeight:'bold',
	      color:'#f95959',
	    },
	    headerTintColor: '#f95959'
	}

	submitAndClear = () => {
	    this.props.writeText(this.state.text)
	    this.setState({
	      text: ''
	    })
	}

	showTags = (word) => {
		this.setState({word})
	}

	render() {
	    return (
	      <View style={styles.container}>
	        <View style={styles.inputContainer}>
	          <TextInput placeholder="Type here to search restaurants nearby!"
		          placeholderTextColor="gray" clearButtonMode='always'
		          onChangeText={(text) => this.setState({text})}
		          style={styles.search}
		          value={this.state.text}/>

		      <TouchableOpacity onPress={()=>this.submitAndClear}
	          	style={styles.searchButt}>
	            <Text style={styles.buttText}>Search</Text>
	          </TouchableOpacity>

	          <View style={styles.resultDiv}>
	            <Text style={styles.text}>
	              {'Results for: ' + this.state.text.split(',').map((word) => word).join(', ')}
	            </Text>
	          </View>

	        </View>	 
	      </View>
	    );
	  }
	}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer:{
    margin:5,
    flex:1,
    flexDirection:'row'
  },
  resultDiv:{
    backgroundColor:'lightgray',
    height:'90%',
    bottom:0,
    width:342,
    position:'absolute'
  },
  searchButt:{
  	bottom:10,
    margin:10,
    backgroundColor: '#233142',
    height:40,
    width:'15%',
    justifyContent: 'center',
    borderRadius:8,
  },
  search: {
    height: 40, 
    width:275,
    borderColor: '#233142',
    borderWidth: 2,
    borderRadius:8,
    padding:10,
    color:'#f95959',
  },
  buttText:{
    alignSelf:'center',
    color:'white',
    fontSize:15,
    fontFamily:'sans-serif-light',
  },
  text: {
    fontSize: 15,
  }
});

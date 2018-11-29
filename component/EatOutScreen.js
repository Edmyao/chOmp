import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppRegistry, TextInput } from 'react-native';
const Permissions = require('react-native-permissions').default

export default class App extends React.Component {
	constructor() {
	  super();
	  this.state = {
	    text: '',
	    places:[],
	    locationPermission: 'unknown',
            position: 'unknown',
            latitude: 'unknown',
            longitude: 'unknown'
	  };
	}

	static navigationOptions = {
	    title: "Let's go somewhere nearby!",
	    headerStyle: {
	      backgroundColor:'#233142',
	    },
	    headerTitleStyle: {
	      fontWeight:'bold',
	      color:'#f95959',
	    },
	    headerTintColor: '#f95959'
	}

	    _requestPermission(){
        console.log(Permissions);
    }

    fetchToDos(lat,long) {
    fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}&apikey=f8fd515e2cdc8ed43c71864677bc2e2c`)
    .then((response) => response.json())
    .then((response) => {
        let nameArray = [];
        for (var i = 0; i < response.nearby_restaurants.length; i++){
            nameArray.push(response.nearby_restaurants[i]);
        }
        this.setState({
            places: nameArray,
        })
    })
}

    componentDidMount(){
        console.log('Start');
        this._requestPermission();
        console.log('Check position');
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            console.log('My position: ' + position.coords.latitude + ', ' + position.coords.longitude)
            let coordinates = position.coords.latitude + ', ' + position.coords.longitude;
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            this.setState({
                position: coordinates,
                latitude: latitude,
                longitude: longitude
            })
            this.fetchToDos(latitude,longitude);
        },
            (error) => alert(JSON.stringify(error)));
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
                <FlatList
                data={this.state.places}
                scrollEnabled={true}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item}) =>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                <View style={styles.resultBlock}>
                                    <Image source={{uri: item.restaurant.thumb}}
                                    style={styles.resultImage}/>
                                    <View style={styles.resultTextContainer}>
                                        <Text style={styles.Title}>{item.restaurant.name}</Text>
                                        <Text style={styles.resultText}>{item.restaurant.location.address}</Text>
                                        <Text style={styles.resultText}>Rating: {item.restaurant.user_rating.aggregate_rating}/5</Text>
                                        <Text style={styles.resultText}>{item.restaurant.cuisines}</Text>
                                    </View>
                </View>
                </TouchableOpacity>}
                />
	       </View>
	    );
	  }
	}

const styles = StyleSheet.create({
    container: {
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
        width:342,
        position:'absolute',
        flex:1,
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
    },
    text: {
        fontSize: 15,
    },
    inputContainer:{
        margin:5,
        width: '95%',
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
    },
    searchContainer: {
        width: '100%',
        height: 50,
        flexDirection:'row',
        alignItems: 'center',
    },
    filterContainer: {
        width: '100%',
        height: 40,
        flexDirection:'row',
        alignItems: 'center',
        position:'absolute',
        top:50
    },
    resultDiv:{
        height:'auto',
        width:'100%',
        position:'absolute',
        flexDirection:'column',
        top:95,
    },
    searchButt:{
        position: 'absolute',
        backgroundColor: '#233142',
        height:40,
        width:'20%',
        justifyContent: 'center',
        borderRadius:8,
        right:0
    },
    search: {
        height: 40,
        width:'77%',
        borderColor: '#233142',
        borderWidth: 2,
        padding:5,
        borderRadius:8,
        color:'#f95959',
        left:0
    },
    filter: {
        height: 30,
        width:'auto',
        borderColor: '#233142',
        borderWidth: 2,
        borderRadius:15,
        color:'#f95959',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:15, paddingRight:15,
        margin: 5,
    },
    buttText:{
        alignSelf:'center',
        color:'white',
        fontSize:15,
        fontFamily:'sans-serif-light',
    },
    resultBlock: {
        width:'100%',
        height: 160,
        backgroundColor: '#ea9085',
        borderRadius: 8,
        elevation: 3,
        padding: 15,
        flexDirection:'row',
        marginBottom: 10
    },
    resultImage: {
        width:'35%',
        height: 125,
        backgroundColor: '#fa2',
        marginRight: 15,
    },
    resultTextContainer: {
        width: '60%',
    },
    Title:{
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    },
    resultText : {
        color: 'white',
        fontSize: 15,
    }
});

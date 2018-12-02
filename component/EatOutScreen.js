import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image, ScrollView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppRegistry, TextInput } from 'react-native';
import { Rating } from 'react-native-elements';
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Map', {
                    restId:item.restaurant.R.res_id,
                    restLat:item.restaurant.location.latitude,
                    restLong:item.restaurant.location.longitude,
                    restname:item.restaurant.name,
                    restaddress:item.restaurant.location.address,
                    restrating:item.restaurant.user_rating.aggregate_rating,
                    restcuisine:item.restaurant.cuisines,
                    restimage:item.restaurant.thumb,
                })}>
                <View style={styles.resultBlock}>
                        <Image source={{uri: item.restaurant.thumb}}
                        style={styles.resultImage}/>
                        <View style={styles.resultTextContainer}>
                            <Text style={styles.Title}>{item.restaurant.name}</Text>
                            <Text style={styles.resultText}>{item.restaurant.location.address}</Text>
                            <Rating
                                readonly
                                type="star"
                                startingValue={parseFloat(item.restaurant.user_rating.aggregate_rating)}
                                imageSize={17}
                                onFinishRating={this.ratingCompleted}
                                style={{flexDirection:'row' }}
                                />
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
        backgroundColor: '#e2e2e2',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    resultBlock: {
        marginTop: 7,
        width:'100%',
        height: 'auto',
        backgroundColor: 'white',
        elevation: 3,
        flexDirection:'row',
        justifyContent: 'center',
    },
    resultImage: {
        width:'35%',
        height: '100%',
        backgroundColor: '#fa2',
    },
    resultTextContainer: {
        width: '62%',
        margin: 15,
    },
    Title:{
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold'
    },
    resultText : {
        color: 'black',
        fontSize: 13,
        padding: 3,
        marginRight: 15
    }
});

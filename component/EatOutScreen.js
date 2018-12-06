import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity, FlatList, Image, ScrollView, TouchableHighlight } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppRegistry, TextInput } from 'react-native';
import { Rating } from 'react-native-elements';
const Permissions = require('react-native-permissions').default

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

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
	    title: "Places nearby!",
	    headerStyle: {
	      backgroundColor:'#233142',
	    },
	    headerTitleStyle: {
	      fontWeight:'bold',
	      color:'#ea9085',
	    },
	    headerTintColor: '#ea9085'
	}

	_requestPermission(){
        console.log(Permissions);
    }

    fetchToDos(lat,long) {
    fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}&apikey=f8fd515e2cdc8ed43c71864677bc2e2c`)
    .then((response) => response.json())
        .then((response) => {
            var ent_id = response.location.entity_id
            fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${ent_id}&entity_type=subzone&start=0&count=20&apikey=f8fd515e2cdc8ed43c71864677bc2e2c`)
            .then((response) => response.json())
            .then((response) => {
                let nameArray = [];
                for (var i = 0; i < response.restaurants.length; i++){
                    nameArray.push(response.restaurants[i]);
                }
                this.setState({
                    places: nameArray,
                })
            })
        })
    }

    pickRandomResto() {
        var randint = Math.floor((Math.random()*this.state.places.length)+1)
        this.props.navigation.navigate('Map', {
            restId:this.state.places[randint].restaurant.R.res_id,
            restLat:this.state.places[randint].restaurant.location.latitude,
            restLong:this.state.places[randint].restaurant.location.longitude,
            restname:this.state.places[randint].restaurant.name,
            restaddress:this.state.places[randint].restaurant.location.address,
            restrating:this.state.places[randint].restaurant.user_rating.aggregate_rating,
            restcuisine:this.state.places[randint].restaurant.cuisines,
            restimage:this.state.places[randint].restaurant.thumb,
        })
    }

    componentDidMount(){
        this._requestPermission();
        navigator.geolocation.getCurrentPosition((position) => {
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

    emptyListView(){
    return(
      <View style={styles.container}>
        <View style={styles.imgContainer}>
            <Image resizeMode='contain' style={styles.img}source={require('../assets/pots_and_pans2.png')}/>
          </View>
        </View>

        )
    }

	render() {
	    return (
	      <View style={styles.container}>
                <TouchableOpacity onPress={() => {this.pickRandomResto()}} style={styles.random_but}>
                    <Text style={styles.random_text}>PICK FOR ME</Text>
                </TouchableOpacity>
                <FlatList
                style={{backgroundColor: 'white'}}
                data={this.state.places}
                scrollEnabled={true}
                ListEmptyComponent={this.emptyListView}
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
        backgroundColor: 'white',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resultBlock: {
        marginBottom: 7,
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
    },
    random_but: {
        height: 'auto',
        width: deviceWidth - 10,
        padding:10,
        borderRadius: 8,
        backgroundColor:'#ea9085',
        margin: 7,
        justifyContent:'center',
        alignItems: 'center',
        elevation: 3,

    },
    random_text: {
        color: '#900d0d',
        fontSize: 17,
    },
  img:{
    flex:1
  },
  imgContainer:{
    marginTop: '30%',
    alignItems:'center',
    justifyContent:'center',
    width:320, 
    height:320,
  },
});

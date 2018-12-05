import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Permissions from 'react-native-permissions';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Rating } from 'react-native-elements';


let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


export default class GPSComponent extends Component {

    static navigationOptions = {
        title: "Here's where to go!",
        headerStyle: {
          backgroundColor:'#233142',
        },
        headerTitleStyle: {
          fontWeight:'bold',
          color:'#ea9085',
        },
        headerTintColor: '#ea9085'
    }

    _requestPermission() {
        Permissions.request('location')
            .then(response => {
                this.setState({
                    locationPermission: response
                })
            });
    }

   onRegionChange(region) {
        this.setState({
            region
        });

    }

    // componentDidMount() {
    //     this._requestPermission();

    //     navigator.geolocation.getCurrentPosition((position) => {
    //         let coordinates = position;
    //         let currLatitude = position.coords.latitude;
    //         let currLongitude = position.coords.longitude;
    //         this.setState({
    //             region: {
    //                 latitude: currLatitude,
    //                 latitudeDelta: 0.27092221,
    //                 longitude: currLongitude,
    //                 longitudeDelta: 0.261485501934,
    //             },
    //             coord: {
    //                 latitude: currLatitude,
    //                 longitude: currLongitude,
    //          },
    //             circleColor: 'rgba(108, 238, 32, 0.65)'
    //         })
    //     },
    //         (error) => alert(JSON.stringify(error))
    //     );
    // }

    render() {
        const {navigation} = this.props;
        const lat = navigation.getParam('restLat', null);
        const long = navigation.getParam('restLong',null);
        const name = navigation.getParam('restname');
        const address = navigation.getParam('restaddress');
        const rating = navigation.getParam('restrating');
        const cuisine = navigation.getParam('restcuisine');
        const image = navigation.getParam('restimage');
        const id = navigation.getParam('restId');
        return (

            <View style={styles.container}>
                <MapView
                initialRegion={{latitude:Number(lat),longitude:Number(long), latitudeDelta:0.001,longitudeDelta:0.001}}
                style={styles.map}
                >
                <Marker
                    coordinate={{latitude: Number(lat), longitude: Number(long)}}
                />
                </MapView>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Reviews', {
                    restaurantid: id,
                    restaurantname: name,
                    restaurantreview: rating,
                })}
                    style={styles.resultBlock}>
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.Title}>{name}</Text>
                        <Text style={styles.resultText}>{id}</Text>
                        <Text style={styles.resultText}>{rating}</Text>
                        <Text style={styles.resultText}>{address}</Text>
                        <Rating
                            readonly
                            type="star"
                            startingValue={parseFloat(rating)}
                            imageSize={17}
                            onFinishRating={this.ratingCompleted}
                            style={{flexDirection:'row' }}
                            />
                        <Text style={styles.resultText}>{cuisine}</Text>
                    </View>
                    <Image source={{uri: navigation.getParam('restimage') }}
                    style={styles.resultImage}/>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: deviceWidth,
        height: deviceHeight,
        zIndex: -1
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
    },
    resultBlock: {
        backgroundColor: 'white',
        position: 'absolute',
        width: deviceWidth - 20,
        height: 'auto',
        flexDirection:'row',
        borderBottomColor: '#d6d6d6',
        borderBottomWidth: 1,
        bottom: 10,

        zIndex: 100,
        borderRadius:8,
        elevation: 3,
    },
    resultImage: {
        width:'35%',
        height: '100%',
        backgroundColor: '#fa2',
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        position: 'absolute',
        right: 0
    },
    resultTextContainer: {
        width: '61%',
        margin: 15,
    },
})

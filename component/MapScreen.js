import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Permissions from 'react-native-permissions';
import MapView, { Circle, Marker } from 'react-native-maps';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


export default class GPSComponent extends Component {

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

    // constructor() {
    //     super();
    //     this.state = {
    //         // region: {
    //         //     latitude: 50.60254331180157,
    //         //     latitudeDelta: 0.2729186541296684,
    //         //     longitude: 16.721875704824924,
    //         //     longitudeDelta: 0.26148553937673924,
    //         // },
    //     };
    //     this.onRegionChange = this.onRegionChange.bind(this);
    // }

    _requestPermission() {
        Permissions.request('location')
            .then(response => {
                this.setState({
                    locationPermission: response
                })
                console.log("Response: " + response);
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Reviews')}
                    style={styles.resultBlock}>
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.Title}>{name}</Text>
                        <Text style={styles.resultText}>{address}</Text>
                        <Text style={styles.resultText}>{rating}</Text>
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
        backgroundColor: '#fef4e8',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        fontSize: 15,
    },
    resultBlock: {
        backgroundColor: '#ea9085',
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
        width:'30%',
        height: 125,
        borderTopRightRadius:8,
        borderBottomRightRadius:8,

    },
    resultTextContainer: {
        width: '70%',
        paddingLeft: 10,
        justifyContent: 'center',
    },
})
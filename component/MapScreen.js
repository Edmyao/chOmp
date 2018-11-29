import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import Permissions from 'react-native-permissions';
import MapView, { Circle, Marker } from 'react-native-maps';

export default class GPSComponent extends Component {

    constructor() {
        super();
        this.state = {
            region: {
                latitude: 50.60254331180157,
                latitudeDelta: 0.2729186541296684,
                longitude: 16.721875704824924,
                longitudeDelta: 0.26148553937673924,
            },
                coord: {
                    latitude: 0,
                    longitude: 0
                },
            circleColor: 'rgba(0, 0, 0, 0)'
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

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

    componentDidMount() {
        this._requestPermission();

        navigator.geolocation.getCurrentPosition((position) => {
            let coordinates = position;
            let currLatitude = position.coords.latitude;
            let currLongitude = position.coords.longitude;
            this.setState({
                region: {
                    latitude: currLatitude,
                    latitudeDelta: 0.27092221,
                    longitude: currLongitude,
                    longitudeDelta: 0.261485501934,
                },
                coord: {
                    latitude: currLatitude,
                    longitude: currLongitude,
             },
                circleColor: 'rgba(108, 238, 32, 0.65)'
            })
        },
            (error) => alert(JSON.stringify(error))
        );
    }
    
    render() {
        return (
            <MapView 
            region={this.state.region}
            onRegionChange={this.onRegionChange}
            style={styles.map}
            >
                <MapView.Circle
                    center = {{
                        latitude: this.state.region.latitude, 
                        longitude: this.state.region.longitude
                    }}
                    strokeColor = "#fff"
                    radius = {808}
                    fillColor = { this.state.circleColor}
                />
                <Marker
             coordinate={{latitude: this.state.coord.latitude, 
                longitude: this.state.coord.longitude}}
           />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})
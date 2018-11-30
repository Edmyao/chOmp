import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
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


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.resultBlock}>
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.Title}>RESTAURANT NAME</Text>
                    </View>

                </View>
                <View style={styles.reviewContainer}>
                    <View style={styles.overallReview}>
                        <Text style={styles.avgReview}>4.5</Text>
                        <Text style={styles.avgReview}>*****</Text>
                    </View>
                    <View style={styles.review}>
                        <View style={styles.reviewHeader}>
                            <Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                            style={styles.reviewImage}/>
                            <View style={styles.reviewUserInfo}>
                                <Text style={styles.reviewText}>NAME</Text>
                                <Text style={styles.reviewText}>Rating</Text>
                            </View>
                        </View>
                        <Text>orem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis dolor dignissim, sagittis quam eget, tempus lorem. Pellentesque eu semper velit. Integer ac vulputate sem. Curabitur nec fermentum purus. Nullam nec laoreet arcu, at semper metus. Nam eget pulvinar orci. Aliquam a ipsum eget massa elementum lobortis. Mo</Text>
                    </View>
                                        <View style={styles.review}>
                        <View style={styles.reviewHeader}>
                            <Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                            style={styles.reviewImage}/>
                            <View style={styles.reviewUserInfo}>
                                <Text style={styles.reviewText}>NAME</Text>
                                <Text style={styles.reviewText}>Rating</Text>
                            </View>
                        </View>
                        <Text>orem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis dolor dignissim, sagittis quam eget, tempus lorem. Pellentesque eu semper velit. Integer ac vulputate sem. Curabitur nec fermentum purus. Nullam nec laoreet arcu, at semper metus. Nam eget pulvinar orci. Aliquam a ipsum eget massa elementum lobortis. Mo</Text>
                    </View>
                                        <View style={styles.review}>
                        <View style={styles.reviewHeader}>
                            <Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                            style={styles.reviewImage}/>
                            <View style={styles.reviewUserInfo}>
                                <Text style={styles.reviewText}>NAME</Text>
                                <Text style={styles.reviewText}>Rating</Text>
                            </View>
                        </View>
                        <Text>orem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis dolor dignissim, sagittis quam eget, tempus lorem. Pellentesque eu semper velit. Integer ac vulputate sem. Curabitur nec fermentum purus. Nullam nec laoreet arcu, at semper metus. Nam eget pulvinar orci. Aliquam a ipsum eget massa elementum lobortis. Mo</Text>
                    </View>
                </View>
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
    resultBlock: {
        width:'100%',
        height: 'auto',
        justifyContent: 'center',
        padding: 10,
        flexDirection:'row',
        borderBottomColor: '#d6d6d6',
        borderBottomWidth: 1, 

    },
    Title:{
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',

    },
    reviewContainer: {
        width: deviceWidth,
        height: 'auto',
        justifyContent: 'center',

    },
    overallReview: {
        width: deviceWidth,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#d6d6d6',
        borderBottomWidth: 1, 
        flexDirection:'row',
        padding: 10,
    },
    avgReview: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold'
    },
    review: {
        padding:10,
        borderBottomColor: '#d6d6d6',
        borderBottomWidth: 1, 
    },
    reviewText : {
        color: 'black',
        fontSize: 15,
    },
    reviewHeader: {
        height: 50,
        flexDirection:'row',
        marginBottom: 10,
    },
    reviewImage: {
        height: 50,
        width: 50,
    },
    reviewUserInfo: {
        marginLeft: 10,
        flexDirection:'column',
        justifyContent: 'center'
    }

})
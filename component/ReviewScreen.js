import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, FlatList } from 'react-native';
import Permissions from 'react-native-permissions';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Rating } from 'react-native-elements';


let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


export default class GPSComponent extends Component {

    static navigationOptions = {
        title: "Reviews",
        headerStyle: {
          backgroundColor:'#233142',
        },
        headerTitleStyle: {
          fontWeight:'bold',
          color:'#f95959',
        },
        headerTintColor: '#f95959'
    }
    constructor() {
      super();
      this.state = {
        text: '',
        places:[],
        locationPermission: 'unknown',
            position: 'unknown',
            latitude: 'unknown',
            longitude: 'unknown',
            restaurantid: '',
            reviews: [],
            restaurantname: '',
      };
    }

   fetchToDos(id) {
    fetch(`https://developers.zomato.com/api/v2.1/reviews?res_id=${id}&count=10&apikey=f8fd515e2cdc8ed43c71864677bc2e2c`)
    .then((response) => response.json())
    .then((response) => {
        let nameArray = [];
        for (var i = 0; i < response.user_reviews.length; i++){
            nameArray.push(response.user_reviews[i]);
            console.log(response.user_reviews[i].review.rating);
        }
        this.setState({
            reviews: nameArray,
        })
        console.log(nameArray);
    })
}

    componentDidMount(){
        const {navigation} = this.props;
        const restid = navigation.getParam('restaurantid');
        this.fetchToDos(restid);
    }


    render() {
       const {navigation} = this.props;
        const restname = navigation.getParam('restaurantname');
        const restreview = navigation.getParam('restaurantreview');
        return (
            <View style={styles.container}>
                <View style={styles.resultBlock}>
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.Title}>{restname}</Text>
                    </View>

                </View>
                    <View style={styles.overallReview}>
                        <Text style={styles.avgReview}>{restreview}</Text>
                        <Rating
                            readonly
                            type="star"
                            startingValue={parseFloat(restreview)}
                            imageSize={30}
                            onFinishRating={this.ratingCompleted}
                            style={{flexDirection:'row' }}
                        />
                    </View>

                    <FlatList
                    data={this.state.reviews}
                    scrollEnabled={true}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({item}) =>
                        <View style={styles.review}>
                            <View style={styles.reviewHeader}>
                                <Image source={{uri: item.review.user.profile_image}}
                                style={styles.reviewImage}/>
                                <View style={styles.reviewUserInfo}>
                                    <Text style={styles.reviewText}>{item.review.user.name}</Text>
                                    <Text>{item.review.user.foodie_level}</Text>
                                    <View style={styles.rating}>
                                        <Rating
                                            readonly
                                            type="star"
                                            startingValue={parseFloat(item.review.rating)}
                                            imageSize={15}
                                            onFinishRating={this.ratingCompleted}
                                            style={{flexDirection:'row', paddingRight: 5 }}
                                        />
                                        <Text>{item.review.review_time_friendly}</Text>
                                    </View>
                                </View>
                            </View>
                            <Text>{item.review.review_text}</Text>
                        </View>}
                        />
                    
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        fontSize: 30,
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
        fontSize: 25,
        fontWeight: 'bold',
        paddingRight: 10
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
        borderRadius:25,
    },
    reviewUserInfo: {
        marginLeft: 10,
        flexDirection:'column',
        justifyContent: 'center'
    },
    rating: {
        flexDirection:'row',
    }

})
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Alert, Image, StyleSheet, FlatList } from 'react-native';

export default class RecipeSearchComponent extends Component {


    constructor() {
        super();
        this.state = {
            searchitem: 'pork',
            retrievedrecipes: [],
        };
    }

fetchToDos(searchedfood) {
    fetch(`https://api.edamam.com/search?q=${searchedfood}&app_id=0f001ce6&app_key=0a4bd5307c6118f918603e4bb13629f9&from=0&to=9`)
    .then((response) => response.json())
    .then((response) => {
        let recipeArray = [];
        for (var i = 0; i < response.hits.length; i++){
            recipeArray.push(response.hits[i].recipe);
        }
        this.setState({
            retrievedrecipes: recipeArray
        })
        console.log('RECIPES: ' + recipeArray[3].label);
    })
}

componentDidMount(){
    this.fetchToDos(this.state.searchitem);
}

    render() {
        return (
            
            <View style={styles.container}>
                <Text style={styles.header}>I'M HUNGRY</Text>
                <FlatList
                data={this.state.retrievedrecipes}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item}) =>
                <View style={styles.resultBlock}>
                    <Image source={{uri: item.image}} style={styles.image}/>
                            <View>
                                <Text>{item.label}</Text>
                            </View>
                </View>}
                />

            </View>
        )
    }
}
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
        },
    header:{
        fontSize: 25,
    },
    image: {
        height: 100,
        width: 100
    }
    });
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppRegistry, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: '',
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

  static navigationOptions = {
    title: "c h O m p !",
    headerStyle: {
      // backgroundColor:'#9DC882',
      backgroundColor:'#233142',
    },
    headerTitleStyle: {
      fontWeight:'bold',
      // color:'#436e4f'
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Type here to search recipes!"
            placeholderTextColor="gray" clearButtonMode='always'
            onChangeText={(text) => this.setState({text})}
            style={styles.search}
            value={this.state.text}/>

          <TouchableOpacity onPress={()=>this.fetchToDos(this.state.text)}
            style={styles.searchButt} activeOpacity={0.4} >
            <Text style={styles.buttText}>Search</Text>
          </TouchableOpacity>


          <View style={styles.resultDiv}>
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

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef4e8',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image:{
    height:100,
    width:100,
  },
  inputContainer:{
    margin:5,
    flex:1,
    flexDirection:'row',
  },
  resultDiv:{
    backgroundColor:'lightgray',
    opacity:0.5,
    height:'90%',
    bottom:0,
    width:342,
    position:'absolute'
  },
  searchButt:{
    bottom:10,
    margin:10,
    // backgroundColor: '#9DC882',
    backgroundColor:'#233142',
    height:40,
    width:'15%',
    justifyContent: 'center',
    borderRadius:8,
    elevation: 3,
  },
  search: {
    height: 40, 
    width:270,
    // borderColor: '#9DC882',
    borderColor:'#233142',
    borderWidth: 2,
    borderRadius:8,
    padding:10,
    // color:'#436e4f',
    color:'#f95959',
  },
  buttText:{
    alignSelf:'center',
    color:'white',
    fontSize:15,
  },
  text: {
    fontSize: 15,
  }

});
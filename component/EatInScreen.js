import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppRegistry, TextInput, Modal, ScrollView, Keyboard, Dimensions } from 'react-native';

import { BlurView } from 'expo';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      retrievedrecipes: [],
      showModal: false,
      recipeDescription: '',
      modalTitle:'',
      modalIngredients:'',
      modalHealth:'',
      modalDiet:'',
      modalImg:'',
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
        });
    })
}

pressModal(title,ingredients,health,diet,image){
  this.setState({
    modalTitle:title,
    modalIngredients:ingredients,
    modalHealth:health,
    modalDiet:diet,
    modalImg:image,
  });
  console.log(this.state.modalImg);
};

  static navigationOptions = {
      title: "Let's go somewhere nearby!",
      headerStyle: {
        backgroundColor:'#233142',
      },
      headerTitleStyle: {
        fontWeight:'bold',
        color:'#ea9085',},

            headerTintColor: '#ea9085'
  }

  submitAndClear = () => {
    this.props.writeText(this.state.text)
    this.setState({
      text: ''
    })
  }

  changeVisibility(visibility) {
      this.setState({
          showModal: visibility,
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Type here to search recipes!"
            placeholderTextColor="gray" clearButtonMode='always' onSubmitEditing={()=> {this.fetchToDos(this.state.text);Keyboard.dismiss}}
            onChangeText={(text) => this.setState({text})}
            style={styles.search}
            value={this.state.text}/>
        </View>


          <View style={styles.resultDiv}>
               <FlatList
                data={this.state.retrievedrecipes}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item}) =>
                <TouchableOpacity onPress={() => {
                  this.changeVisibility(true);
                  this.pressModal(item.label,item.ingredientLines,item.healthLabels,item.dietLabels,item.image);
                }}>
                <View style={styles.resultBlock}>
                    <Image source={{uri: item.image}}
                    style={styles.resultImage}/>
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.Title}>{item.label}</Text>
                        <Text style={styles.resultText}>{item.healthLabels[0]}</Text>
                        <Text style={styles.resultText}>Calories: {item.calories.toFixed()}</Text>
                    </View>
                </View>
                </TouchableOpacity>}
                />
          </View>

          <Modal visible={this.state.showModal} animationType="slide" transparent={true}
              onRequestClose={ () => {
                console.warn("this is a close request");
                this.changeVisibility(false)
                }}>

            <BlurView tint="dark" intensity={40} style={StyleSheet.absoluteFill}>
              <View style={styles.modalView}>
                <View style={styles.innerContainer}>
                  <Text style={styles.modalTitle}> {this.state.modalTitle.toUpperCase()}</Text>
                  <View>
                    <Image style={styles.modalImg} source={{uri:this.state.modalImg}}/>
                  </View>
                  
                  <ScrollView>
                    <Text style={styles.modalLabels}>YOU WILL NEED: </Text>
                      <Text style={styles.resultText}>{this.state.modalIngredients.length ? this.state.modalIngredients.join(", ") : ''}</Text>
                    <Text style={styles.modalLabels}>HEALTH: </Text>
                      <Text style={styles.resultText}>{this.state.modalHealth.length ? this.state.modalHealth.join(", ") : ' - '} </Text>
                    <Text style={styles.modalLabels}>DIET: </Text>
                      <Text style={styles.resultText}>{this.state.modalDiet.length ? this.state.modalDiet.join(", ") : ' - '} </Text>
                  </ScrollView>

                  </View>

                <View>
                  <TouchableOpacity onPress={()=>{
                      this.changeVisibility(false); 
                  }}>
                      <Text style={styles.closeButt}> CLOSE </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </Modal> 
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
    width:'90%'
  },
  resultDiv:{
    height:'90%',
    width:deviceWidth,
    bottom:0,
    position:'absolute',
  },
  search: {
    height: 40,
    width:'100%',
    borderColor:'#681a1e',
    borderWidth: 2,
    borderRadius:8,
    padding:10,
    color:'#f95959',
  },
  buttText:{
    alignSelf:'center',
    color:'#681a1e',
    fontSize:15,
  },
  text: {
    fontSize: 15,
  },
  resultBlock: {
    width:deviceWidth,
    height: 'auto',
    backgroundColor: '#ea9085',
    elevation: 3,
    flexDirection:'row',
    marginBottom: 10,
    left:0,
  },
  resultImage: {
    width:'35%',
    height:'auto',
    marginRight: 5,
  },
  resultTextContainer: {
    width: '60%',
  },
  Title:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  resultText : {
    color: '#681a1e',
    fontSize: 15,
    marginLeft:5,
  },
  modalView:{
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center',      
  },
  innerContainer: {
    backgroundColor:'#fef4e8',
    height:'75%',
    width:'95%',
    borderRadius:5,
  },
  closeButt:{
    alignSelf: 'center',
    textAlign: 'center',
    marginTop:5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor:'#fff',
    color:'#681a1e'
  },
  modalTitle:{
    alignSelf:'center',
    fontSize: 22,
    fontWeight:'bold',
    color:'#681a1e',
  },
  modalLabels:{
    color: '#681a1e',
    fontSize: 15,
    marginLeft:5,
    fontWeight:'bold',
  },
  modalImg: {
    height:250,
    width:250,
    borderRadius:5,
    alignSelf:'center',
    margin:10,
  },
});

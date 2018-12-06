import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { AppRegistry, TextInput, Modal, ScrollView, Keyboard, Dimensions, Linking } from 'react-native';

import { BlurView } from 'expo';
var { width, height } = Dimensions.get('window');

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
      modalUrl:'',
    };
  }

  fetchToDos(searchedfood) {
    fetch(`https://api.edamam.com/search?q=${searchedfood}&app_id=bb804bda&app_key=0aa391c92f87ea1d2035fe713d9efb2d&from=0&to=25`)
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

pressModal(title,ingredients,health,diet,image,url){
  this.setState({
    modalTitle:title,
    modalIngredients:ingredients,
    modalHealth:health,
    modalDiet:diet,
    modalImg:image,
    modalUrl: url,
  });
};

  static navigationOptions = {
      title: "Let's cook!",
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

  emptyListView(){
    return(
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image resizeMode='contain' source={require('../assets/pots_and_pans_test.png')}style={styles.img}/>
        </View>
      </View>
    )
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
               <FlatList
                style={{marginTop:40}}
                scrollEnabled={true}
                data={this.state.retrievedrecipes}
                keyExtractor={(x, i) => i.toString()}
                ListEmptyComponent={this.emptyListView}
                renderItem={({item}) =>
                <TouchableOpacity onPress={() => {
                  this.changeVisibility(true);
                  this.pressModal(item.label,item.ingredientLines,item.healthLabels,item.dietLabels,item.image,item.url);
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

          <Modal visible={this.state.showModal} animationType="slide" transparent={true}
              onRequestClose={ () => {
                console.warn("this is a close request");
                this.changeVisibility(false)
                }}>


            <BlurView tint="dark" intensity={90} style={StyleSheet.absoluteFill}>
              <View style={styles.modalView}>
                <View style={styles.innerContainer}>
                  <Text style={styles.modalTitle}> {this.state.modalTitle.toUpperCase()}</Text>
                  <View>
                    <Image style={styles.modalImg} source={{uri:this.state.modalImg}}/>
                  </View>

                  <ScrollView>
                    <Text style={styles.modalLabels}>YOU WILL NEED: </Text>
                      <Text style={styles.ModalresultText}>- {this.state.modalIngredients.length ? this.state.modalIngredients.join("\n- ") : ''}</Text>
                    <Text style={styles.modalLabels}>HEALTH: </Text>
                      <Text style={styles.ModalresultText}>{this.state.modalHealth.length ? this.state.modalHealth.join(", ") : ' - '} </Text>
                    <Text style={styles.modalLabels}>DIET: </Text>
                      <Text style={styles.ModalresultText}>{this.state.modalDiet.length ? this.state.modalDiet.join(", ") : ' - '} </Text>
                    <Text style={styles.modalLabels}>FIND RECIPE HERE: </Text>
                      <TouchableOpacity>
                        <Text style={styles.urlText} onPress={() => Linking.openURL(this.state.modalUrl)}>{this.state.modalUrl}</Text>
                      </TouchableOpacity>
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
    backgroundColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height:100,
    width:100,
  },
  inputContainer:{
    margin:7,
    flex:1,
    flexDirection:'row',
    width:width,
    height:40,
    justifyContent: 'center'
  },
  resultDiv:{
    position:'absolute',
    top: 54,
    height: '95%',
    width:width,
  },
  search: {
    height: 40,
    width: width - 10,
    borderColor:'#ea9085',
    borderWidth: 2,
    borderRadius:8,
    padding:10,
    marginBottom:10, 
    backgroundColor:'white',
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
    width:width,
    height: 'auto',
    backgroundColor: 'white',
    elevation: 3,
    flexDirection:'row',
    marginBottom: 7,
  },
  resultImage: {
    width:'35%',
    height: '100%',
  },
  resultTextContainer: {
    width: '60%',
    padding: 10,
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
  ModalresultText : {
    color: 'white',
    fontSize: 15,
    padding: 5,
    marginLeft: 5,
    lineHeight: 25,
  },
  modalView:{
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
    width: width
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#233142',
    height:'82%',
    width:'95%',
    padding: 10,
    borderRadius:5,
  },
  closeButt:{
    alignSelf: 'center',
    textAlign: 'center',
    marginTop:5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor:'#ea9085',
    color:'#900d0d'
  },
  modalTitle:{
    alignSelf:'center',
    fontSize: 22,
    fontWeight:'bold',
    color:'#ea9085',
  },
  modalLabels:{
    color: '#ea9085',
    fontSize: 15,
    fontWeight:'bold',
  },
  modalImg: {
    height:200,
    width:200,
    borderRadius:5,
    alignSelf:'center',
    margin:10,
  },
  urlText: {
    textDecorationLine:'underline',
    color:'white',
    marginBottom:5,
    marginLeft: 5,
    lineHeight: 20,

  },
  img:{
    flex:1
  },
  imgContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:320, 
    height:320,
  },
})

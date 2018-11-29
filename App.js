import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './component/HomeScreen';
import EatInScreen from './component/EatInScreen';
import EatOutScreen from './component/EatOutScreen';
import MapScreen from './component/MapScreen';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    EatIn: {
      screen: EatInScreen,
    },
    EatOut: {
      screen: EatOutScreen,
    },
    Map: {
      screen: MapScreen,
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}




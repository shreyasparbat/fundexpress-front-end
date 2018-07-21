import React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
//import HomeScreen from './home';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: (
      <Button
      onPress={() => this.props.navigation.navigate('History')}
      title="History"
      color='#fff'
      />
    ),
    headerLeft: null
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class PawnScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pawn New Item</Text>
      </View>
    );
  }
}

const TabNav = createBottomTabNavigator(
  {
  Home: HomeScreen,
  Pawn: PawnScreen,
  Settings: SettingsScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      fontWeight: 'bold',
      style: {
        backgroundColor: '#ff0000',
      }
    }
  }
);

export default TabNav;

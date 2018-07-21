import React from 'react';
import { View, Button, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';


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

export default HomeScreen;

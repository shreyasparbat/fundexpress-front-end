import React from 'react';
import {View, Text} from 'react-native';

class ProposeScreen extends React.Component {
  static navigationOptions = {
    title: "Pawn New Item",
      headerStyle: {
        backgroundColor: "#ff0000", 
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Propose</Text>
      </View>
    );
  }
}

export default ProposeScreen;
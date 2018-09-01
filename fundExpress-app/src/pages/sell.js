import React from 'react';
import {View, Text} from 'react-native';

class SellScreen extends React.Component {
    static navigationOptions = {
    title: "Sell Item",
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
        <Text>Sell Item</Text>
      </View>
    );
  }
}

export default SellScreen;
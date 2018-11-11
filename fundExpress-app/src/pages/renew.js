import React from 'react';
import {View, Text} from 'react-native';

class RenewScreen extends React.Component {
  static navigationOptions = {
    title: "Renew",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "black"
      },
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Work In Progress</Text>
      </View>
    );
  }
}

export default RenewScreen;

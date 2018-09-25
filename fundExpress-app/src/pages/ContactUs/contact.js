import React from 'react';
import {View, Text} from 'react-native';

class ContactScreen extends React.Component {
    static navigationOptions = {
    title: "Contact Us",
      headerStyle: {
        backgroundColor: "#C00000",
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
        <Text>Contact Us</Text>
      </View>
    );
  }
}

export default ContactScreen;

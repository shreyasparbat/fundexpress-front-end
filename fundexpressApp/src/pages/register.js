import React from 'react';
import { View, Text } from 'react-native';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Register</Text>
      </View>
    );
  }
}

export default RegisterScreen;
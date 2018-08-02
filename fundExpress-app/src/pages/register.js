import React from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class RegisterScreen extends React.Component {
  state = { email: '', password: '', };
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <FormLabel>Name</FormLabel>
        <FormInput />
        </View>
    );
  }
}

export default RegisterScreen;
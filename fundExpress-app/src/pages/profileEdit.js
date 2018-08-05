import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Button } from 'react-native-elements';

class ProfileEditScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-contact'} size={25} 
        color={'white'} />;
      },
  };
  

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Avatar
          xlarge
          rounded
          icon={{name: 'airplay'}}
          activeOpacity={0.7}
        />
        <Text>Profile Edit</Text>
        <View style={{width: 300}}>
          <FormLabel>Name</FormLabel>
          <FormInput />
        <View style={{width:300,marginTop:15}}>
        <FormLabel>Name</FormLabel>
          <FormInput />
        </View>
        </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      backgroundColor: '#ff0000',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ff0000',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 20
  }
};

export default ProfileEditScreen;
import React from 'react';
import {AsyncStorage, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Button } from 'react-native-elements';
import { Header } from 'native-base';

class ProfileScreen extends React.Component {
  state = { fullName: '', gender: '', DOB: '', age: '' , ic: '', mobileNumber: '' ,
  landlineNumber: '' ,address: '', citizenship: '', nationality: '', email: '' };
  static navigationOptions = {
    title: 'Profile',
      headerStyle: {
        backgroundColor: '#C00000',
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

  componentWillMount(){
    this.retrieveData().then((token) => {
      fetch('http://206.189.145.2:3000/profile/me', {
      method: 'POST',
      headers: new Headers({
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'x-auth' : token,
      }),
      // body: JSON.stringify({
      //   auth : token
      // })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((response) => {
        console.log("profile retrieved")
        //console.log(response)
        //console.log(response.body)
        //console.log(response)
        this.setState({
          fullName: response.fullName,
          address: response.address,
          citizenship: response.citizenship,
          DOB: response.dateOfBirth.slice(0,10),
          email: response.email,
          gender: response.gender,
          ic: response.ic,
          landlineNumber: response.landlineNumber,
          mobileNumber: response.mobileNumber,
          nationality: response.nationality,
        });
        //console.log("state fullName: " + this.state.fullName)
      })
      .catch((errorResponse) => {
        console.log("error with profile/edit ")
        console.log(errorResponse)
      })
    }).catch((error) => {
      console.log("error retrieving  profile data")
      console.log(error)
    });
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      console.log("token retrieved")
      console.log(value);
      return value;
    } catch (error){
      throw error
    }
  }

  logOut() {
    // header = new Headers();
    // header.append('x-auth', this.retrieveData());
    this.retrieveData().then((token) =>{
      fetch('http://206.189.145.2:3000/profile/logout', {
      method: 'DELETE',
      headers: new Headers({
        'x-auth' : token,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(this.state.email + ' logged out')
//this clears all the FEapp related temp data when logging out
          AsyncStorage.multiRemove([
            'auth',
            'itemID',
            'pov',
            'sov',
            'photo',
          ])
          this.props.navigation.navigate('login');
        } else {
          return Promise.reject(response.json())
        }
      })
      .catch((errorResponse) => {
        console.log("error")
        console.log(errorResponse)
      })
    }).catch((error) => {
      console.log("error retrieving data")
      console.log(error)
    });


  }


  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        {/* <Avatar
          xlarge
          rounded
          icon={{name: 'airplay'}}
          activeOpacity={0.7}
        />  */}
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
          <Text>Full Name: {this.state.fullName}</Text>
          <Text>NRIC: {this.state.ic}</Text>
          <Text>Email: {this.state.email}</Text>
          {/* <Text>Date of Birth: {this.state.DOB}</Text>
          <Text>Landline Number: {this.state.landlineNumber}</Text>
          <Text>Mobile Number: {this.state.mobileNumber}</Text>
          <Text>Address: {this.state.address}</Text> */}
        </View>

        <View style={{width: 300}}>
          <Button
            title='Edit'
            color='white'
            backgroundColor='#C00000'
            onPress={() => this.props.navigation.navigate('edit')}
          />
        <View style={{width:300,marginTop:15}}>
          <Button
              title='Log Out'
              color='white'
              backgroundColor='#C00000'
              onPress={() => this.logOut()}
            />
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
      backgroundColor: '#C00000',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#C00000',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 20
  }
};

export default ProfileScreen;

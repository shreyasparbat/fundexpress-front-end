import React from 'react';
import { AsyncStorage, View, ScrollView, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Input } from '../components/input';
import { Picker, Icon, DatePicker } from 'native-base';
import axios from 'axios';

class ProfileEditScreen extends React.Component {
  state = {
      email: '',
      password: '',
      fullName: '',
      gender: '',
      DOB: '',
      age: '',
      ic: '',
      mobileNumber: '',
      landlineNumber: '',
      address: '',
      citizenship: '',
      nationality: '',
  };
  static navigationOptions = {
    title: 'Edit Profile',
      headerStyle: {
        backgroundColor: '#C00000',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
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
          DOB: response.dateOfBirth.slice(0,10).toString(),
          email: response.email,
          gender: response.gender,
          ic: response.ic,
          landlineNumber: response.landlineNumber.toString(),
          mobileNumber: response.mobileNumber.toString(),
          nationality: response.nationality,
          password: response.password,
          age: response.age,
        });
        //console.log("state fullName: " + this.state.fullName)
      })
      .catch((errorResponse) => {
        console.log("error with profile/me ")
        console.log(errorResponse)
      })
    }).catch((error) => {
      console.log("error retrieving profile data")
      console.log(error)
    });
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      console.log("token retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }

  submit() {
    this.retrieveData().then((token) => {
      fetch('http://206.189.145.2:3000/profile/edit',{
        method: 'POST',
        headers: new Headers({
          'x-auth': token,
        }),
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          fullName: this.state.fullName,
          gender: this.state.gender,
          dateOfBirth: this.state.DOB,
          //age: this.state.age,
          ic: this.state.ic,
          mobileNumber: parseInt(this.state.mobileNumber),
          landlineNumber: parseInt(this.state.landlineNumber),
          //mobileNumber: this.state.mobileNumber,
          //landlineNumber: this.state.landNumber,
          address: this.state.address,
          citizenship: this.state.citizenship,
          nationality: this.state.nationality,
        }),
      })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((response) => {
        console.log("profile changed")
        this.props.navigation.navigate('Profile');
      })
      .catch((errorResponse) => {
        console.log("error with profile/edit ")
        console.log(errorResponse)
      })
      .catch((error) => {
        console.log("error retrieving profile data")
        console.log(error)
      });
    }
  )
}



  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
       showsVerticalScrollIndicator bounces={false} >


        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.fullName}
            onChangeText={fullName => this.setState({ fullName })}
            placeholder="Full Name"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
        <Picker
              note
              mode="dropdown"
              iosHeader="Gender"
              placeholder='Gender'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 325 }}
              textStyle = {{color : 'black' }}
              selectedValue={this.state.gender}
              onValueChange={gender => this.setState({gender})}
            >
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />

            </Picker>
        </View>

        <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
      <DatePicker
            defaultDate={this.state.DOB}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"SGP"}
            //timeZoneOffsetInMinutes={0}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText= {this.state.DOB}
            textStyle={{ color: "black" }}
            placeHolderTextStyle={{ color: "black" }}
            onDateChange={DOB => this.setState({ DOB })}
            />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.ic}
            onChangeText={ic => this.setState({ ic })}
            placeholder="NRIC"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.mobileNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            placeholder="Mobile Number"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.landlineNumber}
            onChangeText={landlineNumber => this.setState({ landlineNumber })}
            placeholder="House Phone Number"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.address}
            onChangeText={address => this.setState({ address })}
            placeholder="Address"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.citizenship}
            onChangeText={citizenship => this.setState({ citizenship })}
            placeholder="Citizenship"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.nationality}
            onChangeText={nationality => this.setState({ nationality })}
            placeholder="Nationality"
          />
        </View>

        <Button
          title='Submit Changes'
          color='white'
          backgroundColor='#ff0000'
          onPress={() => this.submit()}
          //onPress={()=>console.log(JSON.stringify(this.state))}
          //onPress={() => this.props.navigation.navigate('main')}
          containerViewStyle={{marginTop:30,marginBottom:30}}      
        />

      </ScrollView>
    );
  }
}

export default ProfileEditScreen;

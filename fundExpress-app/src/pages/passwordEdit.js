import React from 'react';
import { AsyncStorage, View, ScrollView, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Input } from '../components/input';
import { Picker, Icon, DatePicker } from 'native-base';
import axios from 'axios';

class PasswordEditScreen extends React.Component {
  state = {
      email: '',
      currentPassword:'',
      prevpassword: '',
      newpassword:'',
      confirmpassword:'',
      fullName: '',
      gender: '',
      DOB: '',
      ic: '',
      mobileNumber: '',
      landlineNumber: '',
      address: '',
      citizenship: '',
      race: '',
      house:'',
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
        console.log(response)
        // console.log(response.body)
        this.setState({
          fullName: response.fullName,
          address: response.address,
          citizenship: response.citizenship,
          DOB: response.dateOfBirth.slice(0,-14),
          email: response.email,
          gender: response.gender,
          ic: response.ic,
          landlineNumber: response.landlineNumber.toString(),
          mobileNumber: response.mobileNumber.toString(),
          house: response.addressType,
          currentPassword: response.password,
          race: response.race,
        });
        //console.log("state fullName: " + this.state.fullName)
      })
      .catch((errorResponse) => {
        console.log("error with profile retrieval")
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
    if(this.state.currentPassword!=this.state.prevpassword){
      this.setState({
        verifyError: "Incorrect Password"
      })
    }else{
      if(this.state.newpassword!=this.state.confirmpassword){
        this.setState({
          confirmError: "Passwords do not match!"
        })
      }else{
        this.retrieveData().then((token) => {
          fetch('http://206.189.145.2:3000/profile/edit',{
            method: 'POST',
            headers: new Headers({
              'x-auth': token,
            }),
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.newpassword,
              fullName: this.state.fullName,
              gender: this.state.gender,
              dateOfBirth: this.state.DOB,
              ic: this.state.ic,
              mobileNumber: parseInt(this.state.mobileNumber),
              landlineNumber: parseInt(this.state.landlineNumber),
              address: this.state.address,
              citizenship: this.state.citizenship,
              addressType: this.state.house,
              race: this.state.race
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
    }

    }


// verifyPassword(){
//   if(this.state.currentPassword!=this.state.prevpassword){
//     this.setState({
//       verifyError: "Incorrect Password"
//     })
//   }
// }

// confirmPassword(){
//   if(this.state.newpassword!=this.state.confirmpassword){
//     this.setState({
//       confirmError: "Passwords do not match!"
//     })
//   }
// }



  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
       showsVerticalScrollIndicator bounces={false} >


        {/* <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.fullName}
            onChangeText={fullName => this.setState({ fullName })}
            placeholder="Full Name"
          />
        </View> */}

        {/* <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>
          <FormLabel>Gender</FormLabel>
        <Picker
              note
              mode="dropdown"
              iosHeader="Gender"
              placeholder='Gender'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ height: 40, width: 390}}
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.gender}
              onValueChange={gender => this.setState({gender})}
            >
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />

            </Picker>
        </View> */}

        {/* <View style={{height: 70, width: 390,borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, backgroundColor:'white'}}>
          <FormLabel>Date of Birth</FormLabel>
      <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"SGP"}
            //timeZoneOffsetInMinutes={0}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Date of Birth"
            textStyle={{ color: "black" }}
            placeHolderTextStyle={{ color: "#c7c7cd" }}
            selectedValue={new Date(2018, 12, 31)}
            onDateChange={DOB => this.setState({ DOB })}
            />
        </View> */}

         {/* <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>NRIC</FormLabel>
          <FormInput 
            onChangeText={ic => this.setState({ ic })} 
            value={this.state.ic} 
            placeholder='NRIC'
          />
        </View> */}
        <Text style={{
          fontSize: 20,
          fontFamily: Expo.Font.OpenSansLight,
          alignSelf: 'center',
          color: 'red',
          marginTop: 10
        }}>
          {this.state.verifyError}
        </Text>
        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Previous Password</FormLabel>
          <FormInput 
          autoCapitalize='none'
            onChangeText={prevpassword => this.setState({ prevpassword })} 
            // value={this.state.password} 
            placeholder='Previous Password'
          />
        </View> 
        
        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>New Password</FormLabel>
          <FormInput 
          autoCapitalize='none'
            onChangeText={newpassword => this.setState({ newpassword })} 
            // value={this.state.password} 
            placeholder='New Password'
          />
        </View> 

        <Text style={{
          fontSize: 20,
          fontFamily: Expo.Font.OpenSansLight,
          alignSelf: 'center',
          color: 'red',
          marginTop: 10
        }}>
          {this.state.verifyError}
        </Text>
        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Confirm New Password</FormLabel>
          <FormInput 
          autoCapitalize='none'
            onChangeText={confirmpassword => this.setState({ confirmpassword })} 
            // value={this.state.password} 
            placeholder='Confirm New Password'
          />
        </View> 

        {/* <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Mobile Number</FormLabel>
          <FormInput 
            onChangeText={mobileNumber => this.setState({ mobileNumber })} 
            value={this.state.mobileNumber} 
            placeholder='Mobile Number'
          />
        </View> */}

        {/* <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Home Phone Number</FormLabel>
          <FormInput 
            onChangeText={landlineNumber => this.setState({ landlineNumber })} 
            value={this.state.landlineNumber} 
            placeholder='Home Phone Number'
          />
        </View> */}

        {/* <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Address</FormLabel>
          <FormInput 
            onChangeText={address => this.setState({ address })} 
            value={this.state.address} 
            placeholder='Address'
          />
        </View> */}

        {/* <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, backgroundColor:'white'}}>
        <FormLabel>Housing Type</FormLabel>
        <Picker
              note
              mode="dropdown"
              iosHeader="Housing Type"
              placeholder='Housing Type'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ height: 40, width: 390}}
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.house}
              onValueChange={house => this.setState({house})}
            >
              <Picker.Item label="Housing Type" value="" />
              <Picker.Item label="HDB" value="H" />
              <Picker.Item label="Condominium/Landed" value="C" />
              <Picker.Item label="Others" value="N" />

            </Picker>
        </View> */}

        {/* <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Citizenship</FormLabel>
          <FormInput 
            onChangeText={citizenship => this.setState({ citizenship })} 
            value={this.state.citizenship} 
            placeholder='Citizenship'
          />
        </View> */}

        {/* <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, backgroundColor:'white'}}>
          <FormLabel>Race</FormLabel>
        <Picker
              note
              mode="dropdown"
              iosHeader="Race"
              placeholder='Race'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ height: 40, width: 390}}
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.race}
              onValueChange={race => this.setState({race})}
            >
              <Picker.Item label="Race" value="" />
              <Picker.Item label="Chinese" value="Chinese" />
              <Picker.Item label="Malay" value="Malay" />
              <Picker.Item label="Indian" value="Indian" />
              <Picker.Item label="Eurasian" value="Eurasian" />
              <Picker.Item label="Others" value="Others" />

            </Picker>
        </View> */}


        <Button
          title='Change Password'
          color='white'
          backgroundColor='#C00000'
          onPress={() => this.submit()}
          //onPress={()=>console.log(JSON.stringify(this.state))}
          //onPress={() => this.props.navigation.navigate('main')}
          containerViewStyle={{marginTop:30,marginBottom:30}}      
        />

      </ScrollView>
    );
  }
}

export default PasswordEditScreen;

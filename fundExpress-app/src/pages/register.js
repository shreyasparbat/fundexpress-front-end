import React from 'react';
import { AsyncStorage, View, ScrollView, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Input } from '../components/input';
import { Picker, Icon, DatePicker } from 'native-base';
import axios from 'axios';

function validateIC(icNumber){
  //if the ic is valid, then return string
  //else return an error

  if(icNumber.length != 9) {
    return false
  }

  //get each individual character in the icNumber
  figOne = icNumber.charAt(0)
  digitOne = parseInt(icNumber.charAt(1))
  digitTwo = parseInt(icNumber.charAt(2))
  digitThree = parseInt(icNumber.charAt(3))
  digitFour = parseInt(icNumber.charAt(4))
  digitFive = parseInt(icNumber.charAt(5))
  digitSix = parseInt(icNumber.charAt(6))
  digitSeven = parseInt(icNumber.charAt(7))
  figTwo = icNumber.charAt(8)

  //hard coded verification algorithm

  //arrays for step 4
  localArray = ['J','Z','I','H','G','F','E','D','C','B','A']
  foreignArray = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K']
  /*
  1) Take for example I want to test the NRIC number S1234567. The first digit
   you multiply by 2, second multiply by 7, third by 6, fourth by 5,
   fifth by 4, sixth by 3, seventh by 2. Then you add the totals together.
   So,1×2 + 2×7 + 3×6 + 4×5 + 5×4 + 6×3 + 7×2 = 106.
   */

  numbers = digitOne*2 + digitTwo*7 + digitThree*6 + digitFour*5 + digitFive*4 + digitSix*3 + digitSeven*2

  //2) If the first letter of the NRIC starts with T or G, add 4 to the total.
  if (figOne == 'T' || figOne == 'G') {
      numbers += 4
  }
  //3) Then you divide the number by 11 and get the remainder. 106/11=9r7
  numbers = numbers%11

  /*
  4) You can get the alphabet depending on the IC type (the first letter in the IC) using the code below:
  If the IC starts with S or T: 0=J, 1=Z, 2=I, 3=H, 4=G, 5=F, 6=E, 7=D, 8=C, 9=B, 10=A
  */
  if (figOne == 'T' || figOne == 'G') {
      console.log(figTwo == foreignArray[numbers])
      if ((figTwo == foreignArray[numbers])==true){
        return icNumber
      } else {
        return 'SS'
      }
  } else {
      console.log(figTwo == localArray[numbers])
      if ((figTwo == localArray[numbers])==true){
        return icNumber
      } else {
        return 'SS'
      }
  }
}
class RegisterScreen extends React.Component {
  state = { email: '', password: '', fullName: '', gender: '', DOB: '', age: '' , ic: '', mobileNumber: '' ,
  landlineNumber: '' ,address: '', citizenship: '', nationality: '', };
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

  storeData = async (auth) => {
    try{
      await AsyncStorage.setItem('auth', auth);
    } catch (error) {
      console.log(error)
    }
  }

  submit() {
    //var moNumber = parseInt(this.state.mobileNumber);
    //var lanNumber = parseInt(this.state.landlineNumber);
    console.log('register pressed');
    console.log(JSON.stringify(this.state))
    fetch('http://206.189.145.2:3000/user/onboard',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        gender: this.state.gender,
        dateOfBirth: this.state.DOB,
        //age: this.state.age,
        ic: validateIC(this.state.ic),
        mobileNumber: parseInt(this.state.mobileNumber),
        nationality: this.state.nationality,
        citizenship: this.state.citizenship,
        landlineNumber: parseInt(this.state.landlineNumber),
        //mobileNumber: this.state.mobileNumber,
        //landlineNumber: this.state.landNumber,
        address: this.state.address,


      }),
    })
    .then((response) => {
      console.log("Success")
      //console.log(response)
      this.storeData(response.headers.get('x-auth'))
      //console.log(response.headers.get('x-auth'))
      //console.log(response.json())
      this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
      this.setState({
        error: error,
        loading: false
      });
    })
  }


  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
       showsVerticalScrollIndicator bounces={false} >


        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.fullName}
            onChangeText={fullName => this.setState({ fullName })}
            placeholder="Full Name"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
          //must validate. check if ends in "@etc.com"
            //value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
          //validate check if same as password
            placeholder="Reconfirm Password"
            secureTextEntry={true}
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
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.gender}
              onValueChange={gender => this.setState({gender})}
            >
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />

            </Picker>
        </View>

        <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
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
            onDateChange={DOB => this.setState({ DOB })}
            />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.ic}
            onChangeText={ic => this.setState({ic}) }
            placeholder="NRIC"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.phoneNumber}
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            placeholder="Mobile Number"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.landlineNumber}
            onChangeText={landlineNumber => this.setState({ landlineNumber })}
            placeholder="House Phone Number"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.address}
            onChangeText={address => this.setState({ address })}
            placeholder="Address"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.citizenship}
            onChangeText={citizenship => this.setState({ citizenship })}
            placeholder="Citizenship"
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            //value={this.state.nationality}
            onChangeText={nationality => this.setState({ nationality })}
            placeholder="Nationality"
          />
        </View>

        <Button
          title='Register!'
          color='white'
          backgroundColor='#ff0000'
          onPress={() => this.submit()}
        //   onPress={()=>console.log(JSON.stringify({
        // email: this.state.email,
        // password: this.state.password,
        // fullName: this.state.fullName,
        // gender: this.state.gender,
        // dateOfBirth: new Date(this.state.DOB),
        // //age: this.state.age,
        // ic: this.state.ic,
        // mobileNumber: parseInt(this.state.mobileNumber),
        // nationality: this.state.nationality,
        // citizenship: this.state.citizenship,
        // landlineNumber: parseInt(this.state.landlineNumber),
        // //mobileNumber: this.state.mobileNumber,
        // //landlineNumber: this.state.landNumber,
        // address: this.state.address,
        //   })
        //)
      //}
          /*onPress={() => this.props.navigation.navigate('login',
          {
            email: this.state.email,
            password: this.state.password,
            fullName: this.state.fullName,
            gender: this.state.gender,
            dateOfBirth: new Date(this.state.DOB),
            //age: this.state.age,
            ic: this.state.ic,
            mobileNumber: this.state.mobileNumber,
            landlineNumber: this.state.landlineNumber,
            //mobileNumber: this.state.mobileNumber,
            //landlineNumber: this.state.landNumber,
            address: this.state.address,
            citizenship: this.state.citizenship,
            nationality: this.state.nationality,
          }
        )}*/
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />

      </ScrollView>
    );
  }
}

export default RegisterScreen;

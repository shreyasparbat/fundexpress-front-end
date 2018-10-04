import React from 'react';
import { AsyncStorage, View, ScrollView, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Input } from '../components/input';
import { Picker, Icon, DatePicker } from 'native-base';
import { Permissions, Notifications } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

validateIC = (icNumber) => {
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
  state = { email: '', password: '', fullName: '', gender: '', DOB: '', ic: '', mobileNumber: '' ,
  landlineNumber: '' ,address: '', nationality:'', citizenship: '', house: '', race: '' , ptoken: '', error:''};
  static navigationOptions = {
    title: 'Register',
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
    this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    this.setState({ ptoken : token });
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      console.log(key + " stored successfully");
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
        // gender: this.state.gender,
        // dateOfBirth: this.state.DOB,
        ic: this.state.ic,
        // mobileNumber: parseInt(this.state.mobileNumber),
        // nationality: this.state.nationality,
        // citizenship: this.state.citizenship,
        // landlineNumber: parseInt(this.state.landlineNumber),
        // address: this.state.address,
        // addressType: this.state.house,
        // race: this.state.race,
        expoPushToken: this.state.ptoken,
    // "email": "averychong6@test.com",
    //"password": "pass1234",
    //"fullName": "AveryChong",
    "gender": "M",
    "dateOfBirth": "1994-05-23",
    // "ic": "S1234567A",
    "mobileNumber": parseInt('91234567'),
    "nationality": "Singaporean",
    "citizenship": "Singapore",
    "landlineNumber": parseInt('61234567'),
    "address": "Singapore",
    "addressType": "C",
    "race": "Chinese",
    // expoPushToken: this.state.ptoken,
       
        
      }),
    })
    .then((response) => {
      //console.log(response)
      console.log(response.headers.get('x-auth'))
      if(response.headers.get('x-auth')==null){
        const errorResponse = response.json();
        console.log(errorResponse.body);
        this.setState({ error: 'error'})
      }else{
      this.storeData('auth',response.headers.get('x-auth'));
      console.log("Success")
      console.log(this.state.email + " logged in")
      this.props.navigation.navigate('Home');
      }
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
      <KeyboardAwareScrollView 
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}
        extraScrollHeight = {200}
        keyboardOpeningTime = {5}
      >


        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Full Name</FormLabel>
          <FormInput 
            onChangeText={fullName => this.setState({ fullName })} 
            value={this.state.fullName} 
            placeholder='Full Name'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:0,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>NRIC</FormLabel>
          <FormInput
            autoCapitalize='none' 
            onChangeText={ic => this.setState({ ic })} 
            value={this.state.ic} 
            placeholder='NRIC'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:0,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Email</FormLabel>
          <FormInput 
            autoCapitalize='none' 
            onChangeText={email => this.setState({ email })} 
            value={this.state.email} 
            placeholder='Email'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Password</FormLabel>
          <FormInput 
            autoCapitalize='none' 
            onChangeText={password => this.setState({ password })} 
            value={this.state.password}
            secureTextEntry={true} 
            placeholder='Password'
          />
        </View>

        {/* <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:0,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Confirm Password</FormLabel>
          <FormInput 
            //onChangeText={password => this.setState({ password })} 
            //value={this.state.email}
            secureTextEntry={true} 
            placeholder='Confirm Password'
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
        </View>

        <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, backgroundColor:'white'}}>
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
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:0,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Nationality</FormLabel>
          <FormInput
            onChangeText={nationality => this.setState({ nationality })} 
            value={this.state.nationality} 
            placeholder='Nationality'
          />
        </View>
        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:0,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Citizenship</FormLabel>
          <FormInput
            onChangeText={citizenship => this.setState({ citizenship })} 
            value={this.state.citizenship} 
            placeholder='Citizenship'
          />
        </View>

        <View style={{height: 70, width: 390,borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, backgroundColor:'white'}}>
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
            onDateChange={DOB => this.setState({ DOB })}
            />
        </View>

      <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Mobile Number</FormLabel>
          <FormInput
            onChangeText={mobileNumber => this.setState({ mobileNumber })} 
            value={this.state.mobileNumber} 
            placeholder='Mobile Number'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:0,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Home Phone Number</FormLabel>
          <FormInput
            onChangeText={landlineNumber => this.setState({ landlineNumber })} 
            value={this.state.landlineNumber} 
            placeholder='Home Phone Number'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Address</FormLabel>
          <FormInput
            onChangeText={address => this.setState({ address })} 
            value={this.state.address} 
            placeholder='Address'
          />
        </View>

        <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, backgroundColor:'white'}}>
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

            </Picker> */}
        {/* </View> */}

        

        <Text style={{
          fontSize: 20,
          fontFamily: Expo.Font.OpenSansLight,
          alignSelf: 'center',
          color: 'red',
          marginTop: 10
        }}>
          {this.state.error}
        </Text>
        <Button
          title='Register!'
          color='white'
          backgroundColor='#C00000'
          onPress={() => this.submit()}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />

      </KeyboardAwareScrollView>
    );
  }
}

export default RegisterScreen;

import React from 'react';
import { AsyncStorage, View, ScrollView, Text, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button, Card } from 'react-native-elements';
import { Picker, Icon, DatePicker, Input, Item, Label } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../configs/config';
class ProfileEditScreen extends React.Component {
  state = {
      email: '',
      password: '',
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
      showAlert:false,
      alertTitle:'',
      alertMessage:'',
      status: true,
      completed:false,
      nricError:'',
      height:'',
      width:'',
      error:'',
  };
  static navigationOptions = {
    title: 'Edit Profile',
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'black'
      },
  };

  componentWillMount(){
    // console.log('retrieving profile')
    this.retrieveData().then((token) => {
      // fetch(url.url + 'profile/me', {
      fetch(url.url + 'profile/me', {
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
        // console.log("profile retrieved")
        // console.log(response)
        // console.log(response.fullName)
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
          password: response.password,
          race: response.race,
        });
        if(response.registrationCompleted==false){
          this.setState({
            status: false
          })
        }else{
          this.setState({
            status: true
          })
        }
        // console.log(this.state.email)
        //console.log("state fullName: " + this.state.fullName)
      })
      .catch((errorResponse) => {
        // console.log("error with profile retrieval")
        // console.log(errorResponse)
      })
    }).catch((error) => {
      // console.log("error retrieving profile data")
      // console.log(error)
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

  go(){
    // console.log("this.go triggered")
    if(this.state.status==true){
      this.setState({
        showAlert:true,
        alertTitle: 'Successfully changed details',
        alertMessage:''
    })
  }else{
    this.setState({
      showAlert:true,
      alertTitle: 'Registration Complete!',
      alertMessage:'Now you can proceed to pawn & sell your items',
  })
  }
}

  submit() {
    console.log('now at submit')
    console.log(this.state)
    this.retrieveData().then((token) => {
      // fetch('http://206.189.145.2:3000/profile/edit',{
        fetch(url.url +'profile/edit', {
        method: 'POST',
        headers: new Headers({
          'x-auth': token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: this.state.email,
          fullName: this.state.fullName,
          password: this.state.password,
          gender: this.state.gender,
          dateOfBirth: this.state.DOB,
          ic: this.state.ic,
          mobileNumber: parseInt(this.state.mobileNumber),
          landlineNumber: parseInt(this.state.landlineNumber),
          address: this.state.address,
          addressType: this.state.house,
          citizenship: this.state.citizenship,
          race: this.state.race,
        }),
      })
      .then((response) => {
        if(response.ok==true){
          // console.log("profile changed");
          this.go();
        }else{
          this.setState({
            showAlert:true,
            alertTitle: 'Error',
            alertMessage:''
        })
        }

      })
      .catch((errorResponse) => {
        // console.log("error with profile/edit ")
        // console.log(errorResponse)
      })
      .catch((error) => {
        // console.log("error retrieving profile data")
        // console.log(error)
      });
    }
  )
}

validateIC = (icNumber) => {
  //if the ic is valid, then return string
  //else return an error

  if(icNumber.length != 9) {
    this.setState({
      ic:icNumber,
      nricError:"NRIC too short"
    })
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
      // console.log(figTwo == foreignArray[numbers])
      if ((figTwo == foreignArray[numbers])==true){
        this.setState({
          ic : icNumber,
          nricError: ''
        })
      } else {
        this.setState({
          ic : icNumber,
          nricError: 'Invalid NRIC'
        }) 
      }
  } else {
      // console.log(figTwo == localArray[numbers])
      if ((figTwo == localArray[numbers])==true){
        this.setState({
          ic : icNumber,
          nricError: ''
        
        })
      } else {
        this.setState({
          ic : icNumber,
          nricError: 'Invalid NRIC'
      })
  }
}
}

validate(){
  var errorArray = []
  // console.log(errorArray)
  this.setState({
    alertMessage:''
  })
  // console.log(this.state.alertMessage)
  if(this.state.ic==''){
    errorArray.push("NRIC required")
  }
  // if(this.state.ic==''){
  //   errorArray.push("NRIC required")
  // }
  if(this.state.citizenship==''){
    errorArray.push("Citizenship required")
  }
  if(this.state.mobileNumber==''){
    errorArray.push("Mobile Number required")
  }
  if(this.state.landlineNumber==''){
    errorArray.push("Landline Number required")
  }
  if(this.state.address==''){
    errorArray.push("Address required")
  }
  if(this.state.gender==''){
    errorArray.push("Gender required")
  }
  if(this.state.race==''){
    errorArray.push("Race required")
  }
  if(this.state.DOB==''){
    errorArray.push("Date of Birth required")
  }
  if(this.state.house==''){
    errorArray.push("Address Type required")
  }
  // console.log(errorArray)
  if(errorArray.length==0){
    this.submit();
  }else{
    this.setState({
      alertMessage: errorArray.toString(),
      showAlert: true,
      alertTitle: 'Error'
    })
  }

}

  ifWrong(){
    if(this.state.alertMessage!='Now you can proceed to pawn & sell your items'){
      this.setState({
        showAlert: false,      
      })
    }else{
      this.props.navigation.navigate('main')
    }
  }




  render() {
    return (
      // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex:1, backgroundColor:'white'}}>
      <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}
       showsVerticalScrollIndicator bounces={false} extraScrollHeight= {50} enableOnAndroid={false}>


        {/* <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.fullName}
            onChangeText={fullName => this.setState({ fullName })}
            placeholder="Full Name"
          />
        </View> */}
         <View style={{flex: 1,height:70,borderBottomColor:"black", backgroundColor: 'white'}} >
          <FormLabel>NRIC</FormLabel>
          <FormInput
            onChangeText={ic => this.validateIC(ic)}
            value={this.state.ic}
            placeholder='NRIC'
            containerStyle={{ height: 40, width: (Dimensions.get('screen').width)*0.95,borderBottomColor:'grey', borderBottomWidth:1}}
            returnKeyType='done'
          />
          <Text style={{color:'red', alignSelf:'center'}}>{this.state.nricError}</Text>
        </View>

        {/* <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:15,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Password</FormLabel>
          <FormInput
          autoCapitalize='none'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder='Password'
          />
        </View>  */}

        <View style={{flex: 1,height:70,borderBottomColor:"black",}} >
          <FormLabel>Citizenship</FormLabel>
          <FormInput
            onChangeText={citizenship => this.setState({ citizenship })}
            value={this.state.citizenship}
            containerStyle={{ height: 40, width: (Dimensions.get('screen').width)*0.95,borderBottomColor:'grey', borderBottomWidth:1}}
            placeholder='Citizenship'
            returnKeyType='done'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",}} >
          <FormLabel>Mobile Number</FormLabel>
          <FormInput
            onChangeText={mobileNumber => this.setState({ mobileNumber })}
            value={this.state.mobileNumber}
            containerStyle={{ height: 40, width: (Dimensions.get('screen').width)*0.95,borderBottomColor:'grey', borderBottomWidth:1}}
            placeholder='Mobile Number'
            returnKeyType='done'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",}} >
          <FormLabel>Home Phone Number</FormLabel>
          <FormInput
            onChangeText={landlineNumber => this.setState({ landlineNumber })}
            value={this.state.landlineNumber}
            containerStyle={{ height: 40, width: (Dimensions.get('screen').width)*0.95,borderBottomColor:'grey', borderBottomWidth:1}}
            placeholder='Home Phone Number'
            returnKeyType='done'
          />
        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",}} >
          <FormLabel>Address</FormLabel>
          <FormInput
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            containerStyle={{ height: 40, width: (Dimensions.get('screen').width)*0.95,borderBottomColor:'grey', borderBottomWidth:1}}
            placeholder='Address'
            returnKeyType='done'
          />
        </View>

        <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>
          <FormLabel>Gender</FormLabel>
        <Picker
              note
              mode="dropdown"
              iosHeader="Gender"
              placeholder='Gender'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon type='FontAwesome' name="angle-down" />}
              style={{ height: 40, width: (Dimensions.get('screen').width)*0.95}}
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.gender}
              onValueChange={gender => this.setState({gender})}
            >
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />

            </Picker>
        </View>

        <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,}}>
          <FormLabel>Race</FormLabel>
        <Picker
              note
              mode="dropdown"
              iosHeader="Race"
              placeholder='Race'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon type='FontAwesome' name="angle-down" />}
              style={{ height: 40, width: (Dimensions.get('screen').width)*0.95}}
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

        <View style={{height: 70, width: (Dimensions.get('screen').width)*0.95,borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, backgroundColor:'white'}}>
          <FormLabel>Date of Birth</FormLabel>
      <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date()}
            locale={"en-GB"}
            //timeZoneOffsetInMinutes={0}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Date of Birth"
            textStyle={{ color: "black" }}
            placeHolderTextStyle={{ color: "#c7c7cd" }}
            selectedValue={new Date(this.state.DOB)}
            onDateChange={DOB => this.setState({ DOB })}
            />
        </View>

        <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:0, }}>
        <FormLabel>Housing Type</FormLabel>
        <Picker
              note
              mode="dropdown"
              iosHeader="Housing Type"
              placeholder='Housing Type'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon type='FontAwesome' name="angle-down" />}
              style={{ height: 40, width: (Dimensions.get('screen').width)*0.95,}}
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.house}
              onValueChange={house => this.setState({house})}
            >
              <Picker.Item label="Housing Type" value='' />
              <Picker.Item label="HDB" value="H" />
              <Picker.Item label="Condominium/Landed" value="C" />
              <Picker.Item label="Others" value="N" />

            </Picker>
        </View>    


        <Button
          title='Submit Changes'
          color='white'
          backgroundColor='#C00000'
          onPress={() => this.validate()}
          //onPress={()=>console.log(JSON.stringify(this.state))}
          //onPress={() => this.props.navigation.navigate('main')}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />


      </KeyboardAwareScrollView>
      <AwesomeAlert
          show= {this.state.showAlert}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          onConfirmPressed={() => {
              this.ifWrong()
          }}
        />
      </View>
    // </TouchableWithoutFeedback>
    );
  }
}

export default ProfileEditScreen;

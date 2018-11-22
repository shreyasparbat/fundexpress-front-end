import React from 'react';
import { AsyncStorage, View, ScrollView, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Input } from '../components/input';
import { Picker, Icon, DatePicker } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Permissions, Notifications } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import url from '../configs/config';
class RegisterScreen extends React.Component {
  state = { email: '', password: '', fullName: '', gender: '', DOB: '', ic: '', mobileNumber: '' ,
  landlineNumber: '' ,address: '', nationality:'', citizenship: '',
  house: '', race: '' , ptoken: '', error:'', showAlert:false, showAlert2:false, emailError:'', passError:''};
  static navigationOptions = {
    title: 'Register',
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
    // console.log(token);
    this.setState({ ptoken : token });
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      // console.log(key + " stored successfully");
    } catch (error) {
      // console.log(error)
    }
  }

  //this shows/hides the alerts popup
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  validate(){
    var errorArray = []
    if(this.state.fullName==''){
      errorArray.push("Full Name required")
    }
    // if(this.state.ic==''){
    //   errorArray.push("NRIC required")
    // }
    if(this.state.email==''){
      errorArray.push("Email required")
    }
    if(this.state.password==''){
      errorArray.push("Password required")
    }
    if(errorArray.length==0){
      this.submit();
    }else{
      // console.log(errorArray)
      this.setState({
        error: errorArray.toString(),
        showAlert: true
      })
    }

  }

  ifEmail(email){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email) === false)
    {
    this.setState({emailError:"Not an email"});
    this.setState({email:email})
    return false;
      }
    else {
      this.setState({email:email})
      this.setState({emailError:''})
    }
  }

  passwordCheck(pass){
    if(pass.length < 6)
    {
    this.setState({passError:"Password must be more than 6 characters"});
    this.setState({password:pass})
    return false;
      }
    else {
      this.setState({password:pass})
      this.setState({passError:''})
    }
  }

  submit() {
    //var moNumber = parseInt(this.state.mobileNumber);
    //var lanNumber = parseInt(this.state.landlineNumber);
    // console.log('register pressed');
    // console.log(JSON.stringify(this.state))
    var res = '';
    fetch(url.url + 'user/registerTrial',{
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
        // ic: this.state.ic,
        // mobileNumber: parseInt(this.state.mobileNumber),
        // nationality: this.state.nationality,
        // citizenship: this.state.citizenship,
        // landlineNumber: parseInt(this.state.landlineNumber),
        // address: this.state.address,
        // addressType: this.state.house,
        // race: this.state.race,
        // expoPushToken: this.state.ptoken,
    // "email": "averychong6@test.com",
    //"password": "pass1234",
    //"fullName": "AveryChong",
    // "gender": "M",
    // "dateOfBirth": "1994-05-23",
    // "ic": "S1234567A",
    // "mobileNumber": parseInt('91234567'),
    // "nationality": "Singaporean",
    // "citizenship": "Singapore",
    // "landlineNumber": parseInt('61234567'),
    // "address": "Singapore",
    // "addressType": "C",
    // "race": "Chinese",
     expoPushToken: this.state.ptoken,


      }),
    })
    .then((response) => {
      console.log('status' + response.status)
      if(response.status==500){
        throw 'User already exists'
      }else{//store the response as a var
      res = response
      //return the response in json() to obtain the error message
      return response.json()
      }
    })
    .then((response) => {
      if(response.error==null){
        //if does not exist, pull xauth from stored res var
        // console.log(res)
        // console.log(this.state.email + " logged in")
        // console.log("x-auth")
        // console.log(res.headers.get('x-auth'))
        //store x-auth in the app cache
        this.storeData('auth', res.headers.get('x-auth'));
        // console.log("Success")
        // console.log(this.state.email + " logged in")
        this.setState({
          showAlert2: true,
          loading: false
        })
      }else{
        // console.log(response.error)
        //pass error message to the state, display the alert
        this.setState({
          showAlert2: true,
          loading: false
        })
      }
    })
    .catch((error) => {
      // console.log(error)
      this.setState({
        error: error,
        loading: false,
        showAlert: true
      });
    })
  }


  render() {
    return (
      // <KeyboardAwareScrollView
      //   contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
      //   extraScrollHeight = {200}
      //   keyboardOpeningTime = {5}
      // >
      <View style={{flex:1}}>


        <View style={{height:85,marginTop:0, backgroundColor: 'white'}} >
          <FormLabel
            containerStyle={{flexDirection:"row",marginLeft:0}}
          >Full Name</FormLabel>
          <FormInput
            onChangeText={fullName => this.setState({ fullName })}
            value={this.state.fullName}
            placeholder='Full Name'
            // containerStyle={{flexDirection:"row", marginLeft:5}}
          />
        </View>

        {/* <View style={{height:85,marginTop:5, backgroundColor: 'white'}} >
          <FormLabel>NRIC</FormLabel>
          <FormInput
            autoCapitalize='none'
            onChangeText={ic => this.setState({ ic })}
            value={this.state.ic}
            placeholder='NRIC'
          />
        </View> */}

        <View style={{height:85,marginTop:5, backgroundColor: 'white'}} >
          <FormLabel>Email</FormLabel>
          <FormInput
            autoCapitalize='none'
            onChangeText={email => this.ifEmail(email)}
            value={this.state.email}
            placeholder='Email'
          />
          <Text style={{color:'red', alignSelf:'center'}}>{this.state.emailError}</Text>
        </View>

        <View style={{height:85,marginTop:5, backgroundColor: 'white'}} >
          <FormLabel>Password</FormLabel>
          <FormInput
            autoCapitalize='none'
            onChangeText={password => this.passwordCheck(password)}
            value={this.state.password}
            secureTextEntry={true}
            placeholder='Password'
          />
          <Text style={{color:'red', alignSelf:'center'}}>{this.state.passError}</Text>
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



        {/* <Text style={{
          fontSize: 20,
          fontFamily: Expo.Font.OpenSansLight,
          alignSelf: 'center',
          color: 'red',
          marginTop: 10
        }}>
          {this.state.error}
        </Text> */}
        <Button
          title='Register!'
          color='white'
          backgroundColor='#C00000'
          onPress={() => this.validate()}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />
        <AwesomeAlert
          show= {this.state.showAlert}
          title="Registration Error!"
          message={this.state.error}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          overlayStyle={{flex:1}}
          onConfirmPressed={() => {
            this.hideAlert();
            ;
          }}
        /><AwesomeAlert
        show= {this.state.showAlert2}
        title="Complete your Registration!"
        message={"You can continue to use the app to evaluate your items, however, to pawn an item, you will need to complete your profile by going to the profile page"}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmButtonColor="#C00000"
        confirmText="Ok"
        overlayStyle={{flex:1}}
        onConfirmPressed={() => {
          this.props.navigation.navigate('Home');
          ;
        }}
      />
      {/* </KeyboardAwareScrollView> */}
      </View>
    );
  }
}

export default RegisterScreen;

import React from 'react';
import { AsyncStorage, View, ScrollView, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Input } from '../components/input';
import { Picker, Icon, DatePicker } from 'native-base';
import { Permissions, Notifications } from 'expo';

class RegisterScreen extends React.Component {
  state = { email: '', password: '', fullName: '', gender: '', DOB: '', age: '' , ic: '', mobileNumber: '' ,
  landlineNumber: '' ,address: '', citizenship: '', house: '', race: '' , ptoken: ''};
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
        ic: this.state.ic,
        mobileNumber: parseInt(this.state.mobileNumber),
        nationality: this.state.nationality,
        citizenship: this.state.citizenship,
        landlineNumber: parseInt(this.state.landlineNumber),
        //mobileNumber: this.state.mobileNumber,
        //landlineNumber: this.state.landNumber,
        address: this.state.address,
        expoPushToken: this.state.ptoken,
       
        
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

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
        <Picker
              note
              mode="dropdown"
              iosHeader="Race"
              placeholder='Race'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 325 }}
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.race}
              onValueChange={race => this.setState({race})}
            >
              <Picker.Item label="Chinese" value="C" />
              <Picker.Item label="Malay" value="M" />
              <Picker.Item label="Indian" value="I" />
              <Picker.Item label="Eurasian" value="E" />
              <Picker.Item label="Others" value="O" />

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
            onChangeText={ic => this.setState({ ic })}
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
        <Picker
              note
              mode="dropdown"
              iosHeader="Housing Type"
              placeholder='Housing Type'
              placeholderStyle={{ color: "#c7c7cd" }}
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 325 }}
              textStyle = {{ color: 'black' }}
              selectedValue={this.state.house}
              onValueChange={house => this.setState({house})}
            >
              <Picker.Item label="Flat" value="F" />
              <Picker.Item label="Condominium" value="C" />
              <Picker.Item label="Landed" value="L" />

            </Picker>
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input 
            //value={this.state.citizenship}
            onChangeText={citizenship => this.setState({ citizenship })} 
            placeholder="Citizenship" 
          />
        </View>

        {/* <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input 
            //value={this.state.nationality}
            onChangeText={nationality => this.setState({ nationality })} 
            placeholder="Nationality" 
          />
        </View> */}

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
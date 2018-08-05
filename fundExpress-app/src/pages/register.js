import React from 'react';
import { View, ScrollView, } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { Input } from '../components/input';
import axios from 'axios';

class RegisterScreen extends React.Component {
  state = { email: '', password: '', fullName: '', gender: '', age: '', ic: '', phoneNumber: '', address: ''};
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

  submit() {
    axios({
      method: 'post',
      url: 'http://206.189.145.2:3000/user/onboard',
      header:{},
      data: {
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        gender: this.state.gender,
        age: this.state.age,
        ic: this.state.ic,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log (error);
    })
  };


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
          <Input
            value={this.state.email}
            onChangeText={email => this.setState({ email })} 
            placeholder="Email" 
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.password}
            onChangeText={password => this.setState({ password })} 
            placeholder="Password" 
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input 
            placeholder="Reconfirm Password" 
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input
            value={this.state.gender}
            onChangeText={gender => this.setState({ gender })} 
            placeholder="Gender" 
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input 
            value={this.state.age}
            onChangeText={age => this.setState({ age })}
            placeholder="Age" 
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
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            placeholder="Phone Number" 
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
            placeholder="Citizenship" 
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input 
            placeholder="Nationality" 
          />
        </View>

        <Button
          title='Register!'
          color='white'
          backgroundColor='#ff0000'
          onPress={() => this.submit()}
          //onPress={() => this.props.navigation.navigate('Home')}
          containerViewStyle={{marginTop:30,marginBottom:30}}      
        />

      </ScrollView>
    );
  }
}

export default RegisterScreen;
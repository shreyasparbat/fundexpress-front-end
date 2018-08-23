import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Input } from '../components/input';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import axios from 'axios';
//import HomeScreen from './src/pages/home';
//import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import RegisterScreen from './register';
import HomeScreen from './home.1';
import ProfileScreen from './profile';
import ProfileEditScreen from './profileEdit';
import HistoryScreen from './history';
import HistoryCurrentScreen from './historyCurrent';
import HistoryPreviousScreen from './historyPrevious';
import HistorySoldScreen from './historySold';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadScreen from './uploadimage';
import PawnScreen from './pawn';
import RenewScreen from './renew';
import RedeemScreen from './redeem';
import FAQScreen from './faq';
import camera from './camera';
import PawnTicket from './pawnticket';


class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false, auth: '' };
  static navigationOptions = {
    header: null
  };

  componentWillMount(){
    this.setState({
      email: '',
      password:'',
      error:'',
      loading: false,
      auth: '',
    })
  }

  storeData = async (auth) => {
    try{
      await AsyncStorage.setItem('auth', auth);
    } catch (error) {
      console.log(error)
    }
  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={{width: 300, marginTop: 30}} >
        <Button
          title='Log in'
          color='white'
          backgroundColor='#ff0000'
          //onPress={() => this.props.navigation.navigate('Home')}
          //onPress={this.onButtonPress.bind(this)}
          onPress={() => this.onButtonPress()}
        />
      </View>
    );
  }

  login() {
    if(this.state.email===this.props.navigation.getParam('email', '1') && this.state.password===this.props.navigation.getParam('password', '1')){
      this.setState( {error: '', loading: false });
      this.props.navigation.navigate('Home',
      {
        email: this.props.navigation.getParam('email', ''),
        password: this.props.navigation.getParam('password',''),
        fullName: this.props.navigation.getParam('fullName','Test'),
        gender: this.props.navigation.getParam('gender',''),
        dateOfBirth: this.props.navigation.getParam('DOB',''),
        //age: this.state.age,
        ic: this.props.navigation.getParam('ic',''),
        mobileNumber: this.props.navigation.getParam('mobileNumber',''),
        landlineNumber: this.props.navigation.getParam('landlineNumber',''),
        //mobileNumber: this.state.mobileNumber,
        //landlineNumber: this.state.landNumber,
        address: this.props.navigation.getParam('address',''),
        citizenship: this.props.navigation.getParam('citizenship',''),
        nationality: this.props.navigation.getParam('nationality',''),
      });
    }else{
      this.onLoginFail();
    }
  }

  onButtonPress() {
    console.log('login pressed')
    console.log(this.state.email)
    console.log(this.state.password)
    const { email, password } = this.state;
    
    this.setState({ error: '', loading: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    //this.onLoginSuccess()

    /*if(this.state.email === 'Test' && this.state.password === 'test'){
      this.onLoginSuccess();
        }else{
          this.onLoginFail();
    }
  }*/
  // axios({
  //   method: 'POST',
  //   url: 'http://206.189.145.2:3000/user/login',
  //   data: {
  //     email: this.state.email,
  //     password: this.state.password
  //   }
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
  // }
   fetch('http://206.189.145.2:3000/user/login', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': this.state.email,
        'password': this.state.password
      })
    })
      .then((response) => {
        if (response.ok) {
          return response
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((response) => {
        console.log("logged in")
        //console.log(response)
        //console.log(response.headers.get('x-auth'))
        //console.log(response)
        this.storeData(response.headers.get('x-auth'));
        this.onLoginSuccess()
      })
      .catch((errorResponse) => {
        console.log("error")
        console.log(errorResponse.error)
        this.onLoginFail(errorResponse.error)
      })
  } 

  onLoginFail(error) {
    this.setState({ 
      error: 'Authentication Failed',
      loading: false
    });
  }

  onLoginSuccess() {
    //console.log(this.state.auth)
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
     });
     console.log(this.retrieveData());
     this.props.navigation.navigate('Home');
  }

  render() {
    
    return (
      <ImageBackground 
        source={require('../images/bg.jpg')}
        imageStyle={{ resizeMode: 'contain', opacity: 0.0}}
        style={styles.container}
      >
        <Image
          source={require('../images/felogo.png')}
          style={{ resizeMode: 'contain', width: 300, height: 80, 
          marginTop: 45 }}
        />
        <View style={{ 
          width: 260, height: 100, 
          marginTop: 50, 
          borderColor: 'grey', 
          borderWidth: 1,
          borderRadius: 3 }}>
          <View style={{width: 260, height: 50, borderColor: 'grey', borderBottomWidth: 1}}>
            <Input 
            //value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder='Email'
            />
          </View>
          <Input 
            //value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder='Password'
            secureTextEntry= {true}
          />
        </View>
        <Text style={{
              fontSize: 20,
              alignSelf: 'center',
              color: 'red',
              marginTop: 10
        }}>
          {this.state.error}
        </Text>
          {this.renderButton()}
        <View 
          style={{ justifyContent: 'center', alignItems: 'center', 
          marginTop: 130, flexDirection: 'row' }}>
          <Text
            style={{color: 'black'}}
          >Don't have an account? </Text>
          <Text
            onPress={() => this.props.navigation.navigate('upload')}
            style={{color: 'blue', textDecorationLine: 'underline'}}
          >
          Click here to register
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const RootStack = createStackNavigator({
    loginFlow : {
      screen: createStackNavigator({
        login: { screen: LoginScreen },
        register: {screen: RegisterScreen},
        upload: {screen: UploadScreen},
        camera: {screen: camera}
      }),
      navigationOptions: {
        header: null,
      }
    },
    mainFlow : {
      screen: createBottomTabNavigator({
        Profile: {
          screen: createStackNavigator({
            main: {screen: ProfileScreen},
            edit: {screen: ProfileEditScreen},
          }),
          navigationOptions: {
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-contact'} size={25} 
              color={'white'} />;
            },
          }
            
        },
        Home: {
          screen: createStackNavigator({
            main:{screen: HomeScreen},
            pawn:{screen: PawnScreen},
            buy: {screen: PawnScreen},
            sell: {screen: PawnScreen},
            renew: {screen: RenewScreen},
            redeem: {screen: RedeemScreen},
            faq: {screen: FAQScreen},
            ticket: {screen: PawnTicket}
          }),
          navigationOptions: {
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-home'} size={25} 
              color={'white'} />;
            },
          }
        },
        History: {
          screen: createStackNavigator({
          main: {screen: HistoryScreen},
          current: { screen: HistoryCurrentScreen},
          previous: {screen: HistoryPreviousScreen},
          sold: {screen: HistorySoldScreen},
        }),
          navigationOptions: {
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-time'} size={25} 
              color={'white'} />;
            },
          },
      },
    },
    {
      initialRouteName: 'Home',
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      barStyle: { backgroundColor: '#ff0000' },
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        fontWeight: 'bold',
        style: {
          backgroundColor: '#ff0000',
        }
      }
    }
  ),
  navigationOptions: {
    headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
  header:null
  }
  }
});
/*
  {
    initialRouteName: 'Login',
    navigationOptions: {
      header: null,
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      headerMode: 'none',
    }
  }
);
*/

export default RootStack;
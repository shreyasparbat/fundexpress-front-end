import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Input } from '../components/input';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import axios from 'axios';
//import HomeScreen from './src/pages/home';
//import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import RegisterScreen from './register';
import HomeScreen from './home.1';
import ProfileScreen from './profile';
import HistoryScreen from './history';
import HistoryCurrentScreen from './historyCurrent';
import HistoryPreviousScreen from './historyPrevious';
import HistorySoldScreen from './historySold';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadScreen from './uploadimage';
import PawnScreen from './pawn';

class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false, code: '200' };
  static navigationOptions = {
    header: null
  };

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
          onPress={this.onButtonPress.bind(this)}
        />
      </View>
    );
  }

  onButtonPress() {
    const { email, password } = this.state;
    
    this.setState({ error: '', loading: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.onLoginSuccess()

    /*if(this.state.email === 'Test' && this.state.password === 'test'){
      this.onLoginSuccess();
        }else{
          this.onLoginFail();
    }
  }

    /*axios.post('http://206.189.145.2:3000/user/login', { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(this.onLoginFail())*/
  }

  onLoginFail() {
    this.setState({ 
      error: 'Authentication Failed',
      loading: false
    });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
     });
     this.props.navigation.navigate('Home', { email: this.state.email });
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
          borderRadius: 10 }}>
          <View style={{width: 260, height: 50, borderColor: 'grey', borderBottomWidth: 1}}>
            <Input 
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder='NRIC'
            />
          </View>
          <Input 
            value={this.state.password}
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
          >Don't have an account?</Text>
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
        upload: {screen: UploadScreen}
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
            edit: {screen: HistoryScreen},
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
            pawn:{screen: PawnScreen}
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
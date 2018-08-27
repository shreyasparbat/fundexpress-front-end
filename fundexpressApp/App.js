import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity } from 'react-native';
import { Input } from './src/components/Input';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
//import HomeScreen from './src/pages/home';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import RegisterScreen from './src/pages/register';
import HomeScreen from './src/pages/home.1';
import ProfileScreen from './src/pages/profile';
import HistoryScreen from './src/pages/history';
import HistoryCurrentScreen from './src/pages/historyCurrent';
import HistoryPreviousScreen from './src/pages/historyPrevious';
import HistorySoldScreen from './src/pages/historySold';
import Ionicons from 'react-native-vector-icons/Ionicons';

class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false };
  static navigationOptions = {
    header: null
  };

  renderButton() {
    if (this.state.loading) {
      return <Text> Loading... </Text>;
    }

    return (
      <View style={{ width: 300, height: 10, }}>
      <TouchableOpacity 
        //onPress={this.onButtonPress.bind(this)}
        onPress={() => this.props.navigation.navigate('Home')}
        activeOpacity= {0.8}  
        style={{
          width: 250,
          alignSelf: 'center',
          backgroundColor: '#ff0000',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#ff0000',
          marginLeft: 5,
          marginRight: 5,
          marginTop: 20
        }}
      >
        <Text style={{
              alignSelf: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              paddingTop: 10,
              paddingBottom: 10
        }}
          >
          Log In
        </Text>
      </TouchableOpacity>
    </View>
    );
  }

  onButtonPress() {
    console.log (this.state.email, ' and ', this.state.password)
    const { email, password } = this.state;
    
    this.setState({ error: '', loading: true });

    fetch('http://206.189.145.2:3000/user/login', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    })
    .then((response) => {
      if(response.status === 200){
        //this.onLoginSuccess.bind(this);
        this.props.navigation.navigate('Home');
      }else{
        this.onLoginFail.bind(this);
      }
    })
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
     this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <ImageBackground 
        source={require('./src/images/bg.jpg')}
        imageStyle={{ resizeMode: 'stretch', opacity: 0.45 }}
        style={styles.container}
      >
        <Image
          source={require('./src/images/felogo.png')}
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
          marginTop: 130 }}>
          <Text
            style={{color: 'black'}}
          >Don't have an account?</Text>
          <Text
            onPress={() => this.props.navigation.navigate('register')}
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
      }),
      navigationOptions: {
        header: null,
      }
    },
    mainFlow : {
      screen: createMaterialBottomTabNavigator({
        Profile: {screen: ProfileScreen},
        Home: {screen: HomeScreen},
        History: {
          screen: createStackNavigator({
          main: {screen: HistoryScreen},
          current: { screen: HistoryCurrentScreen},
          previous: {screen: HistoryPreviousScreen},
          sold: {screen: HistorySoldScreen},
        }),
          navigationOptions: {
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
    header: null,
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

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
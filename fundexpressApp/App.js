import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button, TouchableOpacity } from 'react-native';
import { Input } from './src/components/Input';
import { createStackNavigator } from 'react-navigation';
//import HomeScreen from './src/pages/home';
import RegisterScreen from './src/pages/register';
import HistoryScreen from './src/pages/history';
import Home from './src/pages/home';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
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
            //value={this.state.email}
            //onChangeText={email => this.setState({ email })}
            placeholder='NRIC'
            />
          </View>
          <Input 
            //value={this.state.email}
            //onChangeText={email => this.setState({ email })}
            placeholder='Password'
            secureTextEntry= {true}
          />
        </View>
        <View style={{ width: 300, height: 10, }}>
          <TouchableOpacity 
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
        <View 
          style={{ justifyContent: 'center', alignItems: 'center', 
          marginTop: 130 }}>
          <Text
            style={{color: 'black'}}
          >Don't have an account?</Text>
          <Text
            onPress={() => this.props.navigation.navigate('Register')}
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

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: Home,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import { Input } from './src/components/Input';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/pages/home';
import RegisterScreen from './src/pages/register';
import HistoryScreen from './src/pages/history';
import TabNav from './src/pages/tab';

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ImageBackground 
        source={require('./src/images/bg.jpg')}
        imageStyle={{ resizeMode: 'stretch', opacity: 0.3 }}
        style={styles.container}
      >
        <Image
          source={require('./src/images/felogo.png')}
          style={{ resizeMode: 'contain', width: 300, height: 100 }}
        />
        <View style={{ width: 300, height: 100 }}>
          <Input 
            //value={this.state.email}
            //onChangeText={email => this.setState({ email })}
            label='NRIC'
            placeholder='S1234567A'
          />
          <Input 
            //value={this.state.email}
            //onChangeText={email => this.setState({ email })}
            label='Password'
            placeholder='pass123'
          />
        </View>
        <View style={{ width: 300, height: 10, marginTop: 20 }}>
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('Home')}
            style={{ backgroundColor: '#ff0000' }}
          />
        </View>
        <View style={{ width: 300, height: 10, marginTop: 50 }}>
          <Button
            title="Register"
            onPress={() => this.props.navigation.navigate('Register')}
            style={{ backgroundColor: '#ff0000' }}
          />
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
    TabNav: TabNav,
    History: HistoryScreen
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
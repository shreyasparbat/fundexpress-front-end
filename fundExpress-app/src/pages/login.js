import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Input } from '../components/input';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import RegisterScreen from './register';
import UploadScreen from './uploadimage';
import camera from './camera';
import url from '../configs/config';
//Home page imports
import HomeScreen from './home.1';
import PawnScreen from './pawn';
import RenewScreen from './renew';
import RedeemScreen from './redeem';
import ProposeScreen from './propose';
import selectPawn from './selectPawn';

//profile imports
import ProfileScreen from './profile';
import ProfileEditScreen from './profileEdit';

//tickets imports
import MyTicketsScreen from './MyTickets/MyTickets';
import AllPawnTicketsScreen from './MyTickets/AllPawnTickets';
import AllSellTicketsScreen from './MyTickets/AllSellTickets';

//icon imports
import Ionicons from 'react-native-vector-icons/Ionicons';

//contact us imports
import ContactUsScreen from './ContactUs/ContactUs';
import InformationScreen from './ContactUs/Information';
import ContactScreen from './ContactUs/contact';
import FAQScreen from './ContactUs/faq';


class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false, auth: '' };
  static navigationOptions = {
    header: null
  };

  //url = config.url;

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
          backgroundColor='#C00000'
          onPress={() => this.props.navigation.navigate('Home')}
          //onPress={() => this.onButtonPress()}
        />
      </View>
    );
  }

  onButtonPress() {
    console.log('login pressed')
    console.log(this.state.email)
    console.log(this.state.password)
    //const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    } 

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
        <Text style={styles.textStyle}>
          {this.state.error}
        </Text>
          {this.renderButton()}
        <View
          style={{ justifyContent: 'center', alignItems: 'center',
          marginTop: 130, flexDirection: 'row' }}>
          <Text
            style={{color: 'black'}}
          >Dont have an account? </Text>
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
  textStyle: {
      fontSize: 20,
      fontFamily: Expo.Font.OpenSansLight,
      alignSelf: 'center',
      color: 'red',
      marginTop: 10
  }
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
        disabledBackGesture: true
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
            select: {screen: selectPawn},
            renew: {screen: RenewScreen},
            redeem: {screen: RedeemScreen},
            faq: {screen: FAQScreen},
            upload: {screen: UploadScreen},
            propose: {screen: ProposeScreen}
          }),
          navigationOptions: {
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-home'} size={25}
              color={'white'} />;
            },
          }
        },
        "My Tickets": {screen: createStackNavigator({
              main: {screen: MyTicketsScreen},
              AllPawnTickets: {screen: AllPawnTicketsScreen},
              AllSellTickets: {screen: AllSellTicketsScreen}
          }),
          navigationOptions: {
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-document'} size={25}
              color={'white'} />;
            },
          }
      },
      "Contact Us" : {
        screen: createStackNavigator({
          main: {screen: InformationScreen}
        }),
        navigationOptions: {
          initialRouteName: 'main',
          tabBarIcon: ({ focused, tintColor }) => {
            return <Ionicons name={'md-call'} size={25}
            color={'white'} />;
          },
        },
      }
    },
    {
      initialRouteName: 'Home',
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      barStyle: { backgroundColor: '#C00000' },
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        fontWeight: 'bold',
        style: {
          backgroundColor: '#C00000',
        }
      }
    }
  ),
  navigationOptions: {
    headerStyle: {
        backgroundColor: '#C00000',
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

export default RootStack;

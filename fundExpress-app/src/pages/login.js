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
import BuyScreen from './buy';
import SellScreen from './sell';

//pawn imports
//import SellScreen from './sell';
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
import ContactUsScreen from './ContactUs';
import InformationScreen from './Information';



class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false, auth: '' };
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  //url = config.url;

  //set all states to empty when loaded
  componentWillMount(){
    this.setState({
      email: '',
      password:'',
      error:'',
      loading: false,
      auth: '',
    })
  }

  //this stores the x-auth token in app cache
  storeData = async (auth) => {
    try{
      await AsyncStorage.setItem('auth', auth);
      console.log('token stored successfully');
    } catch (error) {
      console.log(error)
    }
  }

  //this retrieves the x-auth from the app cache, not used in this page though
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  //This method renders the button, will render a spinner if loading = true
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
  //these two onPress determine what the button does, either go to home page (for easy work), or run the login api call
          //onPress={() => this.props.navigation.navigate('Home')}
          onPress={() => this.onButtonPress()}
        />
      </View>
    );
  }

  //this is the login API call
  onButtonPress() {
    //log info for debuggging purposes
    console.log('login pressed')
    console.log('email')
    console.log(this.state.email)
    console.log('password')
    console.log(this.state.password)
    //const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    // const user = {
    //   email: this.state.email,
    //   password: this.state.password
    // }

  //the actual API call
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
        return response.json()
      })
      .then((response) => {
        console.log("logged in")
        console.log("x-auth")
        //console.log(response)
        console.log(response.headers.get('x-auth'))
        //store x-auth in the app cache
        this.storeData(response.headers.get('x-auth'));
        this.onLoginSuccess()
      })
      .catch((error) => {
      console.log("error")
      console.log(error)
      this.onLoginFail(error)
      })
  }

  onLoginFail(error) {
    this.setState({
      error: 'Login failed, please try again',
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
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder='Email'
            />
          </View>
          <Input
            value={this.state.password}
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
        gesturesEnabled: false
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
            swipeEnabled: false,
            gesturesEnabled: false,
          }

        },
        Home: {
          screen: createStackNavigator({
            main:{screen: HomeScreen},
            pawn:{screen: PawnScreen},
            buy: {screen: BuyScreen},
            sell: {screen: SellScreen},
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
            swipeEnabled: false,
            gesturesEnabled: false,
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
  header:null,
  gesturesEnabled: false,
  }
  }
});

export default RootStack;

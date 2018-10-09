import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Input } from '../components/input';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import RegisterScreen from './register';
import UploadScreen from './uploadimage';
import camera from './camera';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../configs/config';
//Home page imports
import HomeScreen from './home.1';
import PawnScreen from './pawn';
import RenewScreen from './renew';
import RedeemScreen from './redeem';
import ProposeScreen from './propose';
import BuyScreen from './buy';
import SellScreen from './sell';
import FAQScreen from './ContactUs/faq'
import PawnTicket from './pawnticket';
import PawnOptions from './pawnoptions';

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
import ContactUsScreen from './ContactUs/ContactUs';
import InformationScreen from './ContactUs/Information';



class LoginScreen extends React.Component {
  state = { email: '', password: '', error: '', loading: false, auth: '', showAlert: false };
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
      showAlert: false
    })
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
          backgroundColor='#C00000'
          onPress={() => this.onButtonPress()}
        />
      </View>
    );
  }

  //this is the login API call
  onButtonPress() {
    //log info for debuggging purposes
    console.log('login pressed')
    console.log('email: ' + this.state.email)
    console.log('password: ' + this.state.password)
    this.setState({ error: '', loading: true });

    var res = ''

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
        //store the response as a var
        res = response
        //return the response in json() to obtain the error message
        return response.json()
      })
      .then((response) => {
        //check if error message exists
        if(response.error==null){
          //if does not exist, pull xauth from stored res var
          console.log(res)
          console.log(this.state.email + " logged in")
          console.log("x-auth")
          console.log(res.headers.get('x-auth'))
          //store x-auth in the app cache
          this.storeData(res.headers.get('x-auth'));
          this.onLoginSuccess()
        }else{
          //else pass the error message to be displayed
          console.log(response.error)
          this.onLoginFail(response.error)
        }          
      })
      .catch((error) => {
      //for any other errors (likely to be connection failed)
      this.onLoginFail("Network error")
      })
  }

  onLoginFail(error) {
    this.setState({
      error: error,
      loading: false,
      showAlert: true
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
          marginTop: 40 }}
        />
        <View style={{
          width: 260, height: 100,
          marginTop: 40,
          borderColor: 'grey',
          borderWidth: 1,
          borderRadius: 3 }}>
          <View style={{width: 260, height: 50, borderColor: 'grey', borderBottomWidth: 1}}>
            <Input
            value={this.state.email}
            autoCapitalize="none"
            onChangeText={email => this.setState({ email })}
            placeholder='Email'
            />
          </View>
          <Input
            value={this.state.password}
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            placeholder='Password'
            secureTextEntry= {true}
          />
        </View>
        <View
          style={{ justifyContent: 'center', alignItems: 'center',
          marginTop: 30, flexDirection: 'row' }}>
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
        {/* <Text style={styles.textStyle}>
          {this.state.error}
        </Text> */}
          {this.renderButton()}
          <AwesomeAlert
          show= {this.state.showAlert}
          title="Login Error!"
          message={this.state.error}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          onConfirmPressed={() => {
            this.hideAlert();
            ;
          }}
        />
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
    // pawnTicket:{
    //   screen: createStackNavigator({
    //     main:{screen: PawnTicket},
    //   }),
    //   navigationOptions: {
    //     tabBarVisible: false,
    //     header: null
    //   }
    // },
    // sellTicket:{
    //   screen: createStackNavigator({
    //     main:{screen: SellScreen},
    //   }),
    //   navigationOptions: {
    //     tabBarVisible: false,
    //     header: null,
    //   }
    // },
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
            sellTicket: {screen: SellScreen},
            select: {screen: selectPawn},
            renew: {screen: RenewScreen},
            redeem: {screen: RedeemScreen},
            faq: {screen: FAQScreen},
            upload: {screen: UploadScreen},
            propose: {screen: ProposeScreen},
            options: {screen: PawnOptions},
            pawnTicket: {screen: PawnTicket},
          }),
          navigationOptions: {
            gesturesEnabled:false,
            hardwareBackPress: true,
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
  header:null,
  gesturesEnabled: false,
  }
  }
});

export default RootStack;

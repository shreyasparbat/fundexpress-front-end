import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Input } from '../components/input';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import RegisterScreen from './register';
import Icon from 'react-native-vector-icons/FontAwesome';
// import RegisterScreen from './giftedReg';
import UploadScreen from './uploadimage';
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
import PawnTicketScreen from './pawnticket';
import PawnOptions from './pawnoptions';

//pawn imports
//import SellScreen from './sell';
import selectPawn from './selectPawn';

//profile imports
import ProfileScreen from './profile';
import ProfileEditScreen from './profileEdit';
import PasswordEditScreen from './passwordEdit';

//tickets imports
import MyTicketsScreen from './MyTickets/MyTickets';
import AllPawnTicketsScreen from './MyTickets/AllPawnTickets';
import PawnTicket from '../components/PawnTicket';

import CurrentPawnTickets from './MyTickets/PawnTickets/CurrentPawnTickets';
import PastPawnTickets from './MyTickets/PawnTickets/PastPawnTickets';
import PendingPawnTickets from './MyTickets/PawnTickets/PendingPawnTickets';

import AllSellTicketsScreen from './MyTickets/AllSellTickets';
import SellTicket from '../components/SellTicket';

import PastSellTickets from './MyTickets/SellTickets/PastSellTickets';
import PendingSellTickets from './MyTickets/SellTickets/PendingSellTickets';

import PayInterestScreen from './MyTickets/PayInterest';
//import PayResultScreen from './MyTickets/PayResult';
import pTicket from './pTicket';
import sTicket from './sTicket';

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
      // console.log('token stored successfully');
    } catch (error) {
      // console.log(error)
    }
  }

  //this retrieves the x-auth from the app cache, not used in this page though
  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      return value;
    } catch (error) {
      // console.log(error)
    }
  }

  //This method renders the button, will render a spinner if loading = true
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator
      style={{marginTop:30}}
      />;
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
    if(this.state.email==''){
      this.setState({
        error: "Username Required",
        loading: false,
        showAlert: true
      })
    }else{
      if(this.state.password==''){
        this.setState({
          error: "Password Required",
          loading: false,
          showAlert: true
        })
      }else{
    //     console.log('login pressed')
    // console.log('email: ' + this.state.email)
    // console.log('password: ' + this.state.password)
    this.setState({ error: '', loading: true });

    var res = ''

   fetch(url.url + 'user/login', {
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
          // console.log(res)
          // console.log(this.state.email + " logged in")
          // console.log("x-auth")
          // console.log(res.headers.get('x-auth'))
          //store x-auth in the app cache
          this.storeData(res.headers.get('x-auth'));
          this.onLoginSuccess()
        }else{
          //else pass the error message to be displayed
          // console.log(response.error)
          this.onLoginFail(response.error)
        }
      })
      .catch((error) => {
      //for any other errors (likely to be connection failed)
      this.onLoginFail("Network error")
      })
      }
      
    }
    
  }

  onLoginFail(error) {
    if(error=='Error: User does not exist'){
      this.setState({
        error: "User does not exist",
        loading: false,
        showAlert: true
      });
    }
    if(error=='Error: Passwords do not match'){
      this.setState({
        error: "Incorrect Password",
        loading: false,
        showAlert: true
      });
    }
    if(error=='Error: User already logged in'){
      this.setState({
        error: "User already logged in",
        loading: false,
        showAlert: true
      });
    }
  }

  onLoginSuccess() {
    //console.log(this.state.auth)
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
     });
    //  console.log(this.retrieveData());
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
            password: {screen: PasswordEditScreen},
          }),
          navigationOptions: {
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-contact'} size={25}
              color={tintColor} />;
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
            propose: {screen: ProposeScreen},
            options: {screen: PawnOptions},
            pawnTicket: {screen: PawnTicketScreen},
          }),
          navigationOptions: {
            gesturesEnabled:false,
            hardwareBackPress: true,
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Ionicons name={'md-home'} size={25}
              color={tintColor} />;
            },
          }
        },
        "My Tickets": {screen: createStackNavigator({
              main: {screen: MyTicketsScreen},
              AllPawnTickets: {screen: AllPawnTicketsScreen},
              AllSellTickets: {screen: AllSellTicketsScreen},
              CurrentPawnTickets: {screen: CurrentPawnTickets},
              PastPawnTickets: {screen: PastPawnTickets},
              PendingPawnTickets: {screen: PendingPawnTickets},
              PastSellTickets: {screen: PastSellTickets},
              PendingSellTickets: {screen: PendingSellTickets},
              SellTicket: {screen: SellTicket},
              PawnTicket: {screen: PawnTicket},
              PayInterest: {screen: PayInterestScreen},
              pTicket: {screen: pTicket},
              sTicket: {screen: sTicket}
            //  PayResult: {screen: PayResultScreen},
          }),
          navigationOptions: {
            initialRouteName: 'main',
            tabBarIcon: ({ focused, tintColor }) => {
              return <Icon name={'ticket'} size={25}
              color={tintColor} />;
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
            color={tintColor}/>;
          },
        },
      }
    },
    {
      initialRouteName: 'Home',
      activeTintColor: '#C00000',
      inactiveTintColor: '#d3d1cd',
      barStyle: { backgroundColor: 'white' },
      tabBarOptions: {
        activeTintColor: '#C00000',
        inactiveTintColor: '#d3d1cd',
        fontWeight: 'bold',
        style: {
          backgroundColor: 'white',
        }
      }
    }
  ),
  navigationOptions: {
    headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'black'
      },
  header:null,
  gesturesEnabled: false,
  }
  }
});

export default RootStack;

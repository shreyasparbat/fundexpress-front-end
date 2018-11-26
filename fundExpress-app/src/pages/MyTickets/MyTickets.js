import React from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import AllPawnTicketsScreen from './AllPawnTickets';
import AllSellTicketsScreen from './AllSellTickets';
import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';
import { createStackNavigator } from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Icon } from 'react-native-elements';
import url from '../../configs/config';

class MyTicketsScreen extends React.Component {
  state={showAlert:false}

  static navigationOptions = {
    title: "My Tickets",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "black"
      },
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      // console.log("token retrieved")
      // console.log(value);
      return value;
    } catch (error){
      throw error
    }
  }

  checkReg(destination){
    this.retrieveData().then((token) => {
      fetch(url.url + 'profile/me', {
      method: 'POST',
      headers: new Headers({
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'x-auth' : token,
      }),
      // body: JSON.stringify({
      //   auth : token
      // })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((response) => {
        // console.log("profile retrieved")
        // console.log(response)
        //console.log(response.body)
        if(response.registrationCompleted==false){
          this.setState({
            showAlert: true
          });
        }else{
          this.props.navigation.navigate(destination)
        }
        //console.log("state fullName: " + this.state.fullName)
      })
      .catch((errorResponse) => {
        // console.log("error with profile/me ")
        // console.log(errorResponse)
      })
    }).catch((error) => {
      // console.log("error retrieving  profile data")
      // console.log(error)
    });
  }



  render() {
    return (
      <View style={{flex:1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:0.14, alignSelf: 'center', justifyContent: 'center', marginTop: 20}}>
          <Image
            source={require('../../images/felogo.png')}
            style={{ resizeMode: 'contain', width: 200 }}
          />
        </View>
        <View style={{flex: 0.4, marginTop: 100, alignSelf: 'center', alignItems:'center'}}>
          <View style={{ flexDirection: 'row', }}>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Icon
              raised
              name='ticket'
              type='font-awesome'
              color='#C00000'
              containerStyle={{justifyContent:'center', alignItems:"center"}}
              size={35}
              onPress={() => this.checkReg('AllPawnTickets')}
              />
            <Text style={styles.textStyle}>
              Pawn Tickets
            </Text>
            </View>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Icon
              raised
              name='dollar'
              type='font-awesome'
              color='#C00000'
              containerStyle={{justifyContent:'center', alignItems:"center"}}
              size={35}
              onPress={() => this.checkReg('AllSellTickets')}
              />
            <Text style={styles.textStyle}>
              Sell Tickets
            </Text>
            </View>
          </View>
        </View>
      </View>
      <AwesomeAlert
          show= {this.state.showAlert}
          //showProgress={false}
          title="Registration Incomplete"
          message="Before you can pawn or sell an item, you have to register fully. Please proceed to the profile page to complete your registration"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showConfirmButton={true}
          confirmText="Take me there!"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.setState({
              showAlert:false
            })
            this.props.navigation.navigate('edit');
            ;
          }}
        />

      </View>
    );
  }
}
const TicketsStack = createStackNavigator({
  MyTickets : {
    screen: createStackNavigator({
      AllPawnTickets: { screen: AllPawnTicketsScreen },
      AllSellTickets: { screen: AllSellTicketsScreen },
    }),
  },
})

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
    //fontFamily: 'sans'
  },
  buttonStyle: {
      width: 120,
      height: 120,
      alignSelf: 'center',
      backgroundColor: '#ededed',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 6,
      marginRight: 2,
      //marginTop: 20
  }
};


export default MyTicketsScreen;

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AllPawnTicketsScreen from './AllPawnTickets';
import AllSellTicketsScreen from './AllSellTickets';
import { Container, Header, Tab, Tabs, TabHeading} from 'native-base';
import { createStackNavigator } from 'react-navigation';

class MyTicketsScreen extends React.Component {
  static navigationOptions = {
    title: "My Tickets",
      headerStyle: {
        backgroundColor: "#C00000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:0.14, alignSelf: 'center', justifyContent: 'center', marginTop: 20}}>
          <Image
            source={require('../../images/felogo.png')}
            style={{ resizeMode: 'contain', width: 200 }}
          />
        </View>
        <View style={{flex: 0.4, marginTop: 100, alignSelf: 'center'}}>
          <View style={{ flexDirection: 'row', }}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AllPawnTickets')}
              activeOpacity= {0.8}
              style={styles.buttonStyle}
            >
              <Text style={styles.textStyle}>
                Pawn Tickets
              </Text>
              <View style={{alignSelf: 'center'}}>
                <Icon name={'ticket'} size={50}
                color={'#C00000'} />
              </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AllSellTickets')}
              activeOpacity= {0.8}
              style={styles.buttonStyle}
            >
              <Text style={styles.textStyle}>
                Sell Tickets
              </Text>
              <View style={{alignSelf: 'center'}}>
                <Icon name={'dollar'} size={50}
                color={'#C00000'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 18,
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

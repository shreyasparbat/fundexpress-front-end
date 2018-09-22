import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TicketsPastScreen from './TicketsPast';
import TicketsCurrentScreen from './TicketsCurrent';
import TicketsSoldScreen from './TicketsSold';
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';

class MyTicketsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Tickets',
      headerStyle: {
        backgroundColor: '#ff0000',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-time'} size={25}
        color={'white'} />;
      },
  };

  render() {
    return (
      <Container >

        <Tabs>
          <Tab heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}} ><Icon name='md-help-circle' style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}>Pawn</Text></TabHeading>}  >
            <TicketsCurrentScreen />
          </Tab>
          <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='call'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}>Sell</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
            <TicketsSoldScreen />
          </Tab>
          <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='call'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}>Past</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
            <TicketsPastScreen />
          </Tab>
        </Tabs>
      </Container>

    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',

  },
  buttonStyle: {
      width: 105,
      height: 105,
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

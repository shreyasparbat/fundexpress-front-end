import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import PendingSellTickets from './SellTickets/PendingSellTickets';
import PastSellTickets from './SellTickets/PastSellTickets';
import { Container, Header, Tab, Tabs, TabHeading } from 'native-base';

class AllSellTicketsScreen extends React.Component {
  static navigationOptions = {
    title: 'Sell Tickets',
    //header:null,
      // headerStyle: {
      //   backgroundColor: 'white',
      // },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'black'
      },
      // tabBarIcon: ({ focused, tintColor }) => {
      //   return <Ionicons name={'md-time'} size={25}
      //   color={'white'} />;
      // },
  };

  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <Tabs tabBarUnderlineStyle={{backgroundColor:'#C00000'}} >
          <Tab  heading={ <TabHeading style={{backgroundColor:'white',borderColor:'white'}}><Icon name='add-to-list'  style={{color:'black'}}/><Text style={{color:'black'}}> Pending</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
            <PendingSellTickets navigation={this.props.navigation} />
          </Tab>
          <Tab  heading={ <TabHeading style={{backgroundColor:'white',borderColor:'white'}}><Icon name='back-in-time'  style={{color:'black'}}/><Text style={{color:'black'}}> Approved</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
            <PastSellTickets navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </View>

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


export default AllSellTicketsScreen;

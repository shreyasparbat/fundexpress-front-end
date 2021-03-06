//this was HistorySold
import React from 'react';
import { ScrollView, Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import SellTicket from '../../../components/SellTicket';
import SGListView from 'react-native-sglistview';
import Ticket from '../../../components/Ticket';
import url from '../../../configs/config';
class PendingSellTickets extends React.Component {
  //header
  static navigationOptions = {
    title: 'Currently Sold Items',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  };

  constructor(props){
    super(props)
    this.state={
      data:[],
      navigation:props.navigation,
    }
  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      // console.log('2. auth retrieved: ' + value)
      return value;
    } catch (error) {
      // console.log(error)
    }
  }

  retrieveTickets(){
    this.retrieveData().then((auth) => {
    fetch(url.url + 'tickets/',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
      },
      //body:{}
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      // console.log("/tickets Success");
      // console.log("response" + response);
      this.setState({
        data: response.sellTicketPendingApproval,
        loading:false
      })
    })
    .catch((error) => {
      // console.log("error")
      // console.log(error)
    })
  })
  }

  componentWillMount(){
    this.retrieveTickets()
  }

  renderTickets(){
    return this.state.data.map(ticket =>
    <SellTicket
      key={ticket._id}
      data={ticket}
      navigation={this.state.navigation}
    />
    );
  }

  render(){
    // console.log(this.state);
    if(this.state.loading){
      return <ActivityIndicator />
    }
      return (
        <ScrollView style={{paddingTop:5,backgroundColor:'#e5e5e5'}}>
          {this.renderTickets()}
        </ScrollView>
      );
    }
}

export default PendingSellTickets;

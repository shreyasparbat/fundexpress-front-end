//this was HistorySold
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, AsyncStorage, ScrollView } from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import SellTicket from '../../../components/SellTicket';

class CurrentSellTickets extends React.Component {
  //header
  static navigationOptions = {
    title: 'Currently Sold Items',
    headerStyle: {
      backgroundColor: '#C00000',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };

  state = { data: [] };

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      console.log('2. auth retrieved: ' + value)
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  retrieveTickets(){
    this.retrieveData().then((auth) => {
    fetch('http://206.189.145.2:3000/tickets/',{
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
      console.log("/tickets Success");
      console.log("response" + response);
      this.setState({
        data: response.approvedSellTickets,
        loading:false
      })
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
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
    />
    );
  }

  render(){
    console.log(this.state);
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

export default CurrentSellTickets;


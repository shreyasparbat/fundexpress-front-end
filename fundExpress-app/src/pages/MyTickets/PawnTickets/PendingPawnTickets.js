//this was historyCurrent
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, AsyncStorage, ScrollView} from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import PawnTicket from '../../../components/PawnTicket';
import url from '../../../configs/config';

class PendingPawnTickets extends React.Component {

  //header
  static navigationOptions = {
    title: 'Currently Pawned Items',
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
        data: response.pawnTicketsPendingApproval,
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
      <PawnTicket
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

export default PendingPawnTickets;

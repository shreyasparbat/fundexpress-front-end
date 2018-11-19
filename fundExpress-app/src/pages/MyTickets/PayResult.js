import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import url from '../../configs/config';

export default class PayResultScreen extends React.Component{
  static navigationOptions = {
    title: 'Payment',
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#000000'
      },
  };
  constructor(props){
    super(props)

    this.state={
      isPaymentPending:false,
      ticketId: this.props.navigation.getParam('ticketId'),
      charge: this.props.navigation.getParam('charge'),

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

  recordTransaction(){
    if (this.state.charge==null){
      this.retrieveData().then((auth) => {
      fetch(url.url + 'payment/',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth': auth,
        },
        body:JSON.stringify({
          "ticketID": this.state.ticketId,
          "paymentAmount": 0,
          "date": (new Date()).toString(),
          "success": false
        })
      })
      .then((response) => {
        console.log(response.ok)
        return response.json()
      })
      .then((response) => {
        // console.log("/tickets Success");
        console.log("response" + response);
      })
      .catch((error) => {
        console.log("error")
        console.log(error)
      })
    })
  } else {
    this.retrieveData().then((auth) => {
    fetch(url.url + 'payment/',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
      },
      body:JSON.stringify({
        "ticketID": this.state.charge.description,
        "paymentAmount": this.state.charge.amount/100,
        "date": (new Date()).toString(),
        "success": this.state.charge.captured && this.state.charge.outcome.network_status=="approved_by_network" && this.state.charge.paid
      })
    })
    .then((response) => {
      console.log(response.ok)
      return response.json()
    })
    .then((response) => {
      // console.log("/tickets Success");
      console.log("response" + response);
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  })
  }
  }

  render(){
    if (this.state.charge!=null){
      console.log("7. payment result")
      console.log("amount: " + this.state.charge.amount/100);
      console.log("currency: " + this.state.charge.currency);
      console.log("description: " + this.state.charge.description);
      return(
        <View style={{padding:5, backgroundColor:'white', flex:1, justifyContent:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:'20%', alignSelf:'center'}}>{this.state.charge.outcome.seller_message}</Text>
          <Text style={{fontSize:'14%', alignSelf:'center', paddingTop:5}}>{this.state.charge.currency.toUpperCase()} {this.state.charge.amount/100} has been paid for </Text>
          <Text style={{fontSize:'14%', alignSelf:'center', paddingBottom: 5}}>Ticket ID {this.state.charge.description}</Text>
          <Button
            title="Back to My Tickets"
            color='#ffffff'
            backgroundColor='#c00000'
            onPress={()=>{
              this.recordTransaction();
              this.props.navigation.navigate('MyTickets');
            }}
          />
        </View>
      );
    } else {
      console.log("7. payment result: no charge")
      return(
        <View style={{padding:5, backgroundColor:'white', flex:1, justifyContent:'center'}}>
          <Text style={{fontWeight:'bold', fontSize:'20%', alignSelf:'center'}}>Payment Failed. </Text>
          <Text style={{fontSize:'14%', alignSelf:'center', paddingTop:5}}> No money has been deducted from your card </Text>
          <Button
            title="Back to My Tickets"
            color='#ffffff'
            backgroundColor='#c00000'
            onPress={()=>{
              this.recordTransaction();
              this.props.navigation.navigate('MyTickets');
            }}
          />
        </View>
      );
    }

  }
}

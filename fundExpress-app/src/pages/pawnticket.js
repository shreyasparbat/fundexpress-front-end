import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator} from 'react-native';
import { Button, Card } from 'react-native-elements';
class PawnTicketScreen extends React.Component {
  static navigationOptions = {
    title: "New Pawn Ticket",
    gesturesEnabled: false,
    header: null,
    tabBarVisible: false,
      headerStyle: {
        backgroundColor: "#C00000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }

  state = {item:'', itemID: '', isLoading:true}

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      console.log("successfully retrieved: " + value)
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  pawn(sValue){
    this.retrieveData('auth').then((auth) => {
      fetch('http://206.189.145.2:3000/item/pawn',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth': auth,
        },
        body: JSON.stringify({
          itemID: this.state.itemID,
          specifiedValue: sValue
        }),
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        console.log("/item/pawn Success");
        console.log("response");
        console.log(response);
        this.setState({
          item:response,
          isLoading:false
        })
        //console.log(JSON.stringify(response.item));
        //this.storeData('itemObj', JSON.stringify(response));
        //this.props.navigation.navigate('pawnTicket')
      })
      .catch((error) => {
        console.log("error")
        console.log(error)
      })
    })
  }

  componentWillMount() {
    this.retrieveData('itemID').then((ID) => {
      this.setState({
        itemID: ID
      })
    })
    this.retrieveData('specifiedValue').then((sValue) => {
      this.pawn(sValue);
    })
    // console.log(this.state.item)
  }

  componentWillUnmount(){
    AsyncStorage.multiRemove([
      'itemID',
      'pov',
      'sov',
      'photo',
    ])
  }

  render() {
    // console.log("render called")
    if(this.state.isLoading) return <ActivityIndicator />
    else{
      // console.log("creating display")
      // console.log(this.state.item.item)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Pawn Ticket" >

        <Text>item ID: {this.state.item.item._id}</Text>
        <Text>Name: {this.state.item.item.name}</Text>
        <Text>Type: {this.state.item.item.type}</Text>
        <Text>Condition: {this.state.item.item.condition}</Text>
        <Text>Material: {this.state.item.item.material}</Text>
        <Text>Weight (in grams): {this.state.item.item.weight}</Text>
        <Text>Purity: {this.state.item.item.purity}</Text>
        <Text>Brand: {this.state.item.item.brand}</Text>
        <Text>Date Purchased: {this.state.item.item.dateOfPurchase.slice(0,-14)}</Text>
        <Text>Pawn Offered Value: ${Math.round(this.state.item.item.pawnOfferedValue)}</Text>
        <Text>Sell Offered Value: ${Math.round(this.state.item.item.sellOfferedValue)}</Text>
        <Text>Additional Comments: {this.state.item.item.otherComments}</Text>
        <Text>Expiry Date: {this.state.item.expiryDate.slice(0,-14)}</Text>
        <Text>Interest Payable: {Math.round(this.state.item.interestPayable)}</Text>
        <Text>Ticket Pending Approval.</Text>
        <Text>Please go down to your nearest FundExpress to submit your item!</Text>

      </Card>

        <Button
              title='Return to Home'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 200, marginTop: 15}}
              backgroundColor='#C00000'
              onPress={() => this.props.navigation.navigate("main")}
            />
      </View>
    );
      }
  }
}

export default PawnTicketScreen;

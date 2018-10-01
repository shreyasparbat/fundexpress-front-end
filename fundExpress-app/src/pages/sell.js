import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator} from 'react-native';
import { Button, Card } from 'react-native-elements';

class SellScreen extends React.Component {
  static navigationOptions = {
    title: "New Sell Ticket",
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

  state = {item: '',itemID:'', isLoading:true}

  sell(){
    this.retrieveData('itemID').then((ID) => {
    fetch('http://206.189.145.2:3000/item/sell',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.state.auth,
      },
      body: JSON.stringify({
        itemID: ID,
      }),
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log("/item/sell Success");
      console.log("response");
      console.log(JSON.stringify(response.item));
      this.storeData('itemObj', JSON.stringify(response.item)); 
      // console.log('pov');
      // console.log(response.item.pawnOfferedValue);
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  })
  }

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      console.log("successfully retrieved: " + value)
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  componentWillMount() {
    this.retrieveData('itemObj').then((item) => {
      sItem = JSON.parse(item);
      console.log(sItem);
      this.setState({
        item:sItem,
        isLoading:false
      })
      console.log(this.state.item)
      console.log(this.state.item._id)
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Sell Ticket" >

        <Text>item ID: {this.state.item._id}</Text>
        <Text>Name: {this.state.item.name}</Text>
        <Text>Type: {this.state.item.type}</Text>
        <Text>Condition: {this.state.item.condition}</Text>
        <Text>Material: {this.state.item.material}</Text>
        <Text>Weight (in grams): {this.state.item.weight}</Text>
        <Text>Purity: {this.state.item.purity}</Text>
        <Text>Brand: {this.state.item.brand}</Text>
        <Text>Date Purchased: {this.state.item.dateOfPurchase.slice(0,-14)}</Text>
        <Text>Pawn Offered Value: ${Math.round(this.state.item.pawnOfferedValue)}</Text>
        <Text>Sell Offered Value: ${Math.round(this.state.item.sellOfferedValue)}</Text>
        <Text>Additional Comments: {this.state.item.otherComments}</Text>
        <Text>Ticket Pending Approval.</Text>
        <Text>Please go down to your nearest FundExpress to submit your item!</Text>
        
      </Card>
        
        <Button
              title='Return to Home'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 200,}}
              backgroundColor='#C00000'
              onPress={() => this.props.navigation.navigate("main")}
            />
      </View>
    );
    
  }
}

export default SellScreen;
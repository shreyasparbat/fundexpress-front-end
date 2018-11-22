import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, Image, ScrollView} from 'react-native';
import { Button, Card } from 'react-native-elements';
import url from '../configs/config';
class sTicket extends React.Component {
  static navigationOptions = {
    title: "Sell Ticket",
    gesturesEnabled: false,
    header: null,
    tabBarVisible: false,
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "black"
      },
  }

  state = {itemID:this.props.navigation.getParam('itemID',''), ticketID: this.props.navigation.getParam('ticketID',''), isLoading:false,
            name:'',
            type:'',
            condition:'',
            material:'',
            weight:'',
            purity:'',
            brand:'',
            datePurchased:'',
            comments:'',
            sellValue:'',
            dateSold:'',
            pawnOfferedValue:''
}

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      // console.log("successfully retrieved: " + value)
      return value;
    } catch (error) {
      // console.log(error)
    }
  }

  retrieveTicket(ticketID){
    this.retrieveData('auth').then((auth) => {
      fetch(url.url + 'tickets/getSellTicket',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth': auth,
        },
        body: JSON.stringify({
          ticketID: ticketID,
        }),
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        // console.log("sell ticket retrieved");
        // console.log("response");
        // console.log(response);
        // console.log(response.item.name)
        // console.log(response.dateCreated)
        this.setState({
            name: response.item.name,
            type:response.item.type,
            condition:response.item.condition,
            material:response.item.material,
            weight:response.item.weight,
            purity:response.item.purity,
            brand:response.item.brand,
            datePurchased:response.item.dateOfPurchase.slice(0,-14),
            comments:response.item.otherComments,
            sellValue:Math.round(response.item.sellOfferedValue),
            dateSold:response.dateCreated.slice(0,-14),
            pawnOfferedValue:Math.round(response.item.pawnOfferedValue)
        })
        //console.log(JSON.stringify(response.item));
        //this.storeData('itemObj', JSON.stringify(response));
        //this.props.navigation.navigate('pawnTicket')
      })
      .catch((error) => {
        // console.log("error")
        // console.log(error)
      })
    })
  }

  generateURIFront(itemID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'
    uri = uri.concat(itemID)
    uri = uri.concat('_front.png')
    // console.log('uri: ' + uri)
    return uri
  }

  generateURIBack(itemID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'
    uri = uri.concat(itemID)
    uri = uri.concat('_back.png')
    // console.log('uri: ' + uri)
    return uri
  }

  componentWillMount() {
    // console.log("ticketID: " + this.state.ticketID)
    this.retrieveTicket(this.state.ticketID)
  }

  render() {
    // console.log("render called")
    if(this.state.isLoading) return <ActivityIndicator />
    else{
      // console.log("creating display")
      // console.log(this.state.item.item)
    return (
      <View style={{flex:1, alignItems: 'center' }}>
      <Text style={{fontWeight:'bold', fontSize:40, marginTop:'10%'}}>{this.state.name}</Text>
      <View style={{justifyContent:'center', flexDirection:'row', marginTop:'2%'}}>
          <Image
                source={{uri: this.generateURIFront(this.state.itemID)}}
                loadingIndicatorSource={<ActivityIndicator />}
                style={{ resizeMode: 'center', width: 150 , height: 150}}
          />
          <Image
                source={{uri: this.generateURIBack(this.state.itemID)}}
                loadingIndicatorSource={<ActivityIndicator />}
                style={{ resizeMode: 'center', width: 150 , height: 150}}
          />
        </View>
        <Card containerStyle={{maxWidth:'90%',width:'90%'}}>
        <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column', flex:0.5}}>
              <Text style={{fontWeight:'bold', fontSize:20}}>Sell Value: </Text>
              <Text style={{fontSize:15}}>${this.state.sellValue}</Text>
            </View>

            <View style={{flexDirection:'column', flex:0.5}}>
              <Text style={{fontWeight:'bold', fontSize:20}}>Date Sold: </Text>
              <Text style={{fontSize:15}}>{new Date(this.state.dateSold).toLocaleDateString('en-GB')}</Text>
            </View>

            {/* <View style={{flexDirection:'column'}}>
              <Text>Pawn Offered Value: </Text>
              <Text>${this.state.pawnOfferedValue}</Text>
            </View> */}
        </View>
      </Card>

      <Card containerStyle={{height:'30%', width:'90%'}}>
        <ScrollView style={{flexDirection:'column'}}>
            <Text>Type: {this.state.type}</Text>
            <Text>Condition: {this.state.condition}</Text>
            <Text>Material: {this.state.material}</Text>
            <Text>Weight: {this.state.weight}g</Text>
            <Text>Purity: {this.state.purity}</Text>
            <Text>Brand: {this.state.brand}</Text>
            <Text>Date Purchased: {this.state.datePurchased}</Text>
            <Text>Additional Comments: {this.state.comments}</Text>
          </ScrollView>
      </Card>
        <Button
              title='Back'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 200, marginTop: 15}}
              backgroundColor='#C00000'
              onPress={() => this.props.navigation.goBack(null)}
            />
    </View>
    );
      }
  }
}

export default sTicket;

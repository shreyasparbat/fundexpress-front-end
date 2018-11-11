import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, Image} from 'react-native';
import { Button, Card } from 'react-native-elements';
import url from '../configs/config';
class pTicket extends React.Component {
  static navigationOptions = {
    title: "Pawn Ticket",
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
            valueLoaned:'',
            datePawned:'',
            pawnValue:'',
            dateExpiry:'',
            interest:''
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
      fetch(url.url + 'tickets/getPawnTicket',{
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
        // console.log("pawn ticket retrieved");
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
            valueLoaned:response.value,
            datePawned:response.dateCreated.slice(0,-14),
            pawnValue:Math.round(response.item.pawnOfferedValue),
            dateExpiry:response.expiryDate.slice(0,-14),
            interest:response.outstandingInterest
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
      <View style={{flex:1, justifyContent:'center'}}>
      <Card  image={require('../images/felogo.png')} imageProps={{resizeMode:'contain'}} imageStyle={{height:50, justifyContent:'center', marginTop:10}} containerStyle={{flex:1, marginTop: 23}}>
      <Text>Description of Pledge</Text>
      <View style={{borderColor:'grey',borderWidth:1}}>
        <View style={{justifyContent:'center', flexDirection:'row', borderBottomWidth:1, borderColor:'grey'}}>
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
      <View style={{flexDirection:'column'}}>
          <Text>Name: {this.state.name}</Text>
          <Text>Type: {this.state.type}</Text>
          <Text>Condition: {this.state.condition}</Text>
          <Text>Material: {this.state.material}</Text>
          <Text>Weight: {this.state.weight}g</Text>
          <Text>Purity: {this.state.purity}</Text>
          <Text>Brand: {this.state.brand}</Text>
          <Text>Date Purchased: {this.state.datePurchased}</Text>
          <Text>Additional Comments: {this.state.comments}</Text>
        </View>
      <View style={{borderColor:'grey', borderWidth:1 ,borderLeftWidth:0, borderRightWidth:0}}>
        <Text>Value Loaned: ${this.state.valueLoaned}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
          <Text>Date Pawned: </Text>
          <Text>{this.state.datePawned}</Text>
        </View>
        <View style={{borderColor:'grey', borderLeftWidth:0.5, borderRightWidth:0.5, flexDirection:'column'}}>
          <Text>Pawn Offered Value: </Text>
          <Text>${this.state.pawnValue}</Text>
        </View>
        <View style={{flexDirection:'column'}}>
          <Text>Expiry Date: </Text> 
          <Text>{this.state.dateExpiry}</Text> 
        </View>
        </View>
         
      </View>
      <View style={{borderColor:'grey', borderWidth:1 , borderTopWidth:0}}>
        <Text>Interest Payable: ${this.state.interest}</Text>  
      </View> 
        {/* <Text>Sell Offered Value: ${Math.round(this.state.item.item.sellOfferedValue)}</Text> */}
        {/* <View style={{justifyContent: 'center', flexDirection:'row', marginTop:6}}>
                      <Button fontSize={12} borderRadius={3} title='Renew Now' color='white'containerViewStyle={{margin: 3,height:50,width:100}} backgroundColor= '#C00000' justifyContent= 'center' onPress={() => this.props.navigation.navigate('renew')}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Renew Now</Text>
                      </Button>

                      <Button fontSize={12} borderRadius={3} title='Value' color='white' containerViewStyle={{margin: 3,height:50,width:100}} backgroundColor= '#C00000' justifyContent= 'center'>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Value</Text>
                      </Button>
                      <Button fontSize={12} borderRadius={3} title='Pay Interest' color='white' containerViewStyle={{margin: 3,height:50,width:100}} backgroundColor= '#C00000' justifyContent= 'center'onPress={() => this.props.navigation.navigate('PayInterest',
                      {
                        amountPaid: this.state.interestPayable,
                        pawnTicketID: this.state.ticketNumber,
                      }
                      )}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Pay Interest</Text>
                      </Button>
                    </View>        */}
      </Card>
      </View>
      <View>
        <Button
              title='Back'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 200, marginTop: 15}}
              backgroundColor='#C00000'
              onPress={() => this.props.navigation.goBack(null)}
            />
      </View>
    </View>
    );
      }
  }
}

export default pTicket;

import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, Image, ScrollView} from 'react-native';
import { Button, Card } from 'react-native-elements';
import url from '../configs/config';
class pTicket extends React.Component {
  static navigationOptions = {
    title: "Pawn Ticket",
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
            // dateExpiry: response.expiryDate
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
        this.props.navigation.navigate('Home')
      })
    })
  }

  generateURIFront(itemID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'
    uri = uri.concat(itemID)
    uri = uri.concat('_front.jpg')
    // console.log('uri: ' + uri)
    return uri
  }

  generateURIBack(itemID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'
    uri = uri.concat(itemID)
    uri = uri.concat('_back.jpg')
    // console.log('uri: ' + uri)
    return uri
  }

  componentWillMount() {
    this.retrieveTicket(this.state.ticketID)
  }

  daysLeft(){
    var expiryDate_m = new Date(this.state.dateExpiry).getTime()
    var today_m = new Date().getTime()

    var daysLeft = (expiryDate_m - today_m)/86400000

    return Math.round(daysLeft)
  }

  render() {
    // console.log("render called")
    if(this.state.isLoading) return <ActivityIndicator />
    else{
      // console.log("creating display")
      // console.log(this.state.item.item)
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
      <ScrollView>
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

      <Card containerStyle={{width:'90%'}}>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'column', flex:0.5}}>
              <Text style={{fontWeight:'bold', fontSize:20}}>Expiry Date: </Text>
              <Text style={{fontSize:15}}>{ (new Date(this.state.dateExpiry)).toLocaleDateString('en-GB')}</Text>
            </View>
          
          <View style={{flexDirection:'column', flex:0.5}}>
            <Text style={{fontWeight:'bold', fontSize:20}}>Days Left: </Text>
            <Text style={{fontSize:15}}>{this.daysLeft()}</Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={{maxWidth:'90%',width:'90%'}}>
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'column', flex:0.5}}>
          <Text style={{fontWeight:'bold', fontSize:20}}>Value Loaned: </Text>
          <Text style={{fontSize:15}}>${this.state.valueLoaned}</Text>
        </View>
        
          {/* <View style={{flexDirection:'column'}}>
            <Text>Pawn Offered Value: </Text>
            <Text>${this.state.pawnValue}</Text>
          </View> */}

        <View style={{flexDirection:'column', flex:0.5}}>
          <Text style={{fontWeight:'bold',fontSize:17}}>Interest Payable: </Text>
          <Text style={{fontSize:15}}>${this.state.interest}</Text>
        </View>
      </View>
      </Card>

      <Card containerStyle={{width:'90%'}}>
        <View style={{flexDirection:'column'}}>
            <Text>Type: {this.state.type}</Text>
            <Text>Condition: {this.state.condition}</Text>
            <Text>Material: {this.state.material}</Text>
            <Text>Weight: {this.state.weight}g</Text>
            <Text>Purity: {this.state.purity}</Text>
            <Text>Brand: {this.state.brand}</Text>
            <Text>Date Purchased: {this.state.datePurchased}</Text>
            <Text>Additional Comments: {this.state.comments}</Text>
          </View>
      </Card>


       {/* <Text>Sell Offered Value: ${Math.round(this.state.item.item.sellOfferedValue)}</Text> 
         <View style={{justifyContent: 'center', flexDirection:'row', marginTop:6}}>
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
                    </View>         */}
      <Button
                    title='Back'
                    color='white'
                    borderRadius= {3}
                    containerViewStyle={{height: 50, width: 200, marginTop: '2%'}}
                    backgroundColor='#C00000'
                    onPress={() => this.props.navigation.goBack(null)}
                  />
    </View>
    </ScrollView>
    </View>
    );
      }
  }
}

export default pTicket;

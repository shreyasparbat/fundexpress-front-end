import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, Image} from 'react-native';
import { Button, Card } from 'react-native-elements';
class sTicket extends React.Component {
  static navigationOptions = {
    title: "Sell Ticket",
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
            sellValue:'',
            dateSold:''
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

  retrieveTicket(ticketID){
    this.retrieveData('auth').then((auth) => {
      fetch('http://206.189.145.2:3000/tickets/getSellTicket',{
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
        console.log("pawn ticket retrieved");
        console.log("response");
        console.log(response);
        console.log(response.item.name)
        console.log(response.dateCreated)
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
            sellValue:response.sellOfferedValue,
            dateSold:response.dateCreated.slice(0,-14),
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

  generateURIFront(itemID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'
    uri = uri.concat(itemID)
    uri = uri.concat('_front.jpg')
    console.log('uri: ' + uri)
    return uri
  }

  generateURIBack(itemID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'
    uri = uri.concat(itemID)
    uri = uri.concat('_back.jpg')
    console.log('uri: ' + uri)
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
        <Text>Sell Value: ${this.state.valueLoaned}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
          <Text>Date Sold: </Text>
          <Text>{this.state.dateSold}</Text>
        </View>
        <View style={{borderColor:'grey', borderLeftWidth:0.5, borderRightWidth:0.5, flexDirection:'column'}}>
          <Text>Pawn Offered Value: </Text>
          <Text>${this.state.sellValue}</Text>
        </View>
        </View>
         
      </View>       
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

export default sTicket;

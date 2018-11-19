import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, Image} from 'react-native';
import { Button, Card } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../configs/config';
class PawnTicketScreen extends React.Component {
  static navigationOptions = {
    title: "New Pawn Ticket",
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

  state = {item:'', itemID: '', isLoading:true, showAlert:true}

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      // console.log("successfully retrieved: " + value)
      return value;
    } catch (error) {
      // console.log(error)
    }
  }

  pawn(sValue){
    this.retrieveData('auth').then((auth) => {
      fetch(url.url + 'item/pawn',{
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
        // console.log("/item/pawn Success");
        // console.log("response");
        // console.log(response);
        this.setState({
          item:response,
          isLoading:false
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
    this.retrieveData('itemID').then((ID) => {
      this.setState({
        itemID: ID
      })
    })
    this.retrieveData('specifiedValue').then((sValue) => {
      this.setState({
        specifiedValue: sValue
      })
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
      <View style={{flex:1, alignItems: 'center' }}>
      <View style={{flex:1, justifyContent:'center'}}>
      <Card  image={require('../images/felogo.png')} imageProps={{resizeMode:'contain'}} imageStyle={{height:50, justifyContent:'center', marginTop:10}} containerStyle={{flex:1, marginTop: 23}}>
      <Text>Description of Pledge</Text>
      <View style={{borderColor:'grey',borderWidth:1}}>
        <View style={{justifyContent:'center', flexDirection:'row', borderBottomWidth:1, borderColor:'grey'}}>
          <Image
                source={{uri: this.generateURIFront(this.state.item.item._id)}}
                loadingIndicatorSource={<ActivityIndicator />}
                style={{ resizeMode: 'center', width: 150 , height: 150}}
          />
          <Image
                source={{uri: this.generateURIBack(this.state.item.item._id)}}
                loadingIndicatorSource={<ActivityIndicator />}
                style={{ resizeMode: 'center', width: 150 , height: 150}}
          />


      </View>
      <View style={{flexDirection:'column'}}>
          <Text>Name: {this.state.item.item.name}</Text>
          <Text>Type: {this.state.item.item.type}</Text>
          <Text>Condition: {this.state.item.item.condition}</Text>
          <Text>Material: {this.state.item.item.material}</Text>
          <Text>Weight: {this.state.item.item.weight}g</Text>
          <Text>Purity: {this.state.item.item.purity}</Text>
          <Text>Brand: {this.state.item.item.brand}</Text>
          <Text>Date Purchased: {this.state.item.item.dateOfPurchase.slice(0,-14)}</Text>
          <Text>Additional Comments: {this.state.item.item.otherComments}</Text>
        </View>
      <View style={{borderColor:'grey', borderWidth:1 ,borderLeftWidth:0, borderRightWidth:0}}>
        <Text>Value Loaned: ${this.state.specifiedValue}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        {/* <View style={{flexDirection:'column'}}>
          <Text>Date Pawned: </Text>
          <Text>{this.state.datePawned}</Text>
        </View> */}
        <View style={{borderColor:'grey', borderLeftWidth:0.5, borderRightWidth:0.5, flexDirection:'column'}}>
          <Text>Pawn Offered Value: </Text>
          <Text>${Math.round(this.state.item.item.pawnOfferedValue)}</Text>
        </View>
        <View style={{flexDirection:'column'}}>
          <Text>Expiry Date: </Text>
          <Text>{this.state.item.expiryDate.slice(0,-14)}</Text>
        </View>
        </View>

      </View>
      <View style={{borderColor:'grey', borderWidth:1 , borderTopWidth:0}}>
        <Text>Interest Payable: ${Math.round(this.state.item.indicativeTotalInterestPayable)}</Text>
      </View>
      </Card>
      </View>
        <Button
              title='Return to Home'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 200, marginTop: 15}}
              backgroundColor='#C00000'
              onPress={() => this.props.navigation.navigate("main")}
            />
      <AwesomeAlert
        show= {this.state.showAlert}
        title="Ticket Pending Approval"
        message={"Please go down to your nearest FundExpress to submit your item!"}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmButtonColor="#C00000"
        confirmText="Ok"
        overlayStyle={{flex:1}}
        onConfirmPressed={() => {
          this.setState({
            showAlert:false
          })
        }}
      />
      </View>
    );
      }
  }
}

export default PawnTicketScreen;

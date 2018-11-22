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
      <Text style={{fontWeight:'bold', fontSize:40, marginTop:'10%'}}>{this.state.name}</Text>
      <View style={{justifyContent:'center', flexDirection:'row', marginTop:'2%'}}>
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


      <Card containerStyle={{height:'20%', width:'90%'}}>
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

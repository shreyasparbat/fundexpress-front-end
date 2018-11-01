import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, Image} from 'react-native';
import { Button, Card } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';

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

  state = {item: '', isLoading:true, showAlert:true}

  sell(auth){
    this.retrieveData('itemID').then((ID) => {
    fetch('http://206.189.145.2:3000/item/sell',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
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
      console.log(response.item);
      if(response.item==null){
        this.navigation.navigate(options);
      }else{
      // console.log(JSON.stringify(response.item));
      // this.storeData('itemObj', JSON.stringify(response.item)); 
      this.setState({
        item: response.item
      })
    }
      // console.log('pov');
      // console.log(response.item.pawnOfferedValue);
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
    this.retrieveData('auth').then((auth) => {
      this.sell(auth)
    })
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
          <Text>Name: {this.state.item.name}</Text>
          <Text>Type: {this.state.item.type}</Text>
          <Text>Condition: {this.state.item.condition}</Text>
          <Text>Material: {this.state.item.material}</Text>
          <Text>Weight: {this.state.item.weight}g</Text>
          <Text>Purity: {this.state.item.purity}</Text>
          <Text>Brand: {this.state.item.brand}</Text>
          {/* <Text>Date Purchased: {this.state.item.item.dateOfPurchase.slice(0,-14)}</Text> */}
          <Text>Additional Comments: {this.state.item.otherComments}</Text>
        </View>
      <View style={{borderColor:'grey', borderWidth:1 ,borderLeftWidth:0, borderRightWidth:0}}>
        <Text>Value Sold: ${Math.round(this.state.item.sellOfferedValue)}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{flexDirection:'column'}}>
          <Text>Date Sold: </Text>
          <Text>{this.state.datePawned}</Text>
        </View>
        <View style={{borderColor:'grey', borderLeftWidth:0.5, borderRightWidth:0.5, flexDirection:'column'}}>
          <Text>Pawn Offered Value: </Text>
          <Text>${Math.round(this.state.item.pawnOfferedValue)}</Text>
        </View>
        </View>
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

export default SellScreen;
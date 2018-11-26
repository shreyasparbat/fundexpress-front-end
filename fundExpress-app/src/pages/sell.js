import React from 'react';
import {View, Text, AsyncStorage, ActivityIndicator, Image, ScrollView} from 'react-native';
import { Button, Card } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../configs/config';

class SellScreen extends React.Component {
  static navigationOptions = {
    title: "Sell Ticket",
    gesturesEnabled: false,
    // header: null,
    headerLeft:null,
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

  state = {isLoading:true, showAlert:true,
          name:'',
          _id:'',
          type:'',
          condition:'',
          material:'',
          weight:'',
          purity:'',
          brand:'',
          comments:'',
          valueSold:'',
          dateSold:'',
          pawnOfferedValue:'',
          showAlert:''
          }

  sell(auth){
    this.retrieveData('itemID').then((ID) => {
    fetch(url.url + 'item/sell',{
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
      // console.log("/item/sell Success");
      // console.log("response");
      // console.log(response.item);
      if(response.item==null){
        this.navigation.navigate(options);
      }else{
      // console.log(JSON.stringify(response.item));
      // this.storeData('itemObj', JSON.stringify(response.item));
      this.setState({
          name:response.item.name,
          _id:response.item._id,
          type:response.item.type,
          condition:response.item.condition,
          material:response.item.material,
          weight:response.item.weight,
          purity:response.item.purity,
          brand:response.item.brand,
          comments:response.item.otherComments,
          valueSold:Math.round(response.item.sellOfferedValue),
          datePurchased:response.item.dateOfPurchase.slice(0,-14),
          dateSold:response.dateCreated.slice(0,-14),
          pawnOfferedValue:Math.round(response.item.pawnOfferedValue),
          isLoading:false,
          showAlert:true
      })
    }
      // console.log('pov');
      // console.log(response.item.pawnOfferedValue);
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

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      // console.log("successfully retrieved: " + value)
      return value;
    } catch (error) {
      // console.log(error)
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
      <View style={{flex:1, backgroundColor:'white'}}>
      <ScrollView>
      <View style={{flex:1, alignItems: 'center', width:'100%' }}>
      <Text style={{fontWeight:'bold', fontSize:40, marginTop:'8%'}}>{this.state.name}</Text>
      <View style={{justifyContent:'center', flexDirection:'row', marginTop:'2%'}}>
          <Image
                source={{uri: this.generateURIFront(this.state._id)}}
                loadingIndicatorSource={<ActivityIndicator />}
                style={{ resizeMode: 'center', width: 150 , height: 150}}
          />
          <Image
                source={{uri: this.generateURIBack(this.state._id)}}
                loadingIndicatorSource={<ActivityIndicator />}
                style={{ resizeMode: 'center', width: 150 , height: 150}}
          />
        </View>
        <Card containerStyle={{maxWidth:'90%',width:'90%'}}>
        <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column', flex:0.5}}>
              <Text style={{fontWeight:'bold', fontSize:20}}>Sell Value: </Text>
              <Text style={{fontSize:15}}>${this.state.valueSold}</Text>
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
      <Button
              title='Return to Home'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 200, marginTop: 15}}
              backgroundColor='#C00000'
              onPress={() => this.props.navigation.navigate("main")}
            />
      
    </View>
    </ScrollView>
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

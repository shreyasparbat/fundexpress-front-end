import React, { Component } from "react";
import { Icon, Picker, DatePicker,Form} from "native-base";
import {AsyncStorage, View, Text,  Image} from "react-native";
import { Avatar , Button, FormLabel, FormInput } from "react-native-elements";
import { Input } from "../components/input";
import AwesomeAlert from 'react-native-awesome-alerts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import url from '../configs/config';

class PawnScreen extends Component {
  state = {
    name: "",
    type: "",
    condition: "",
    material: "",
    weight: '',
    unit: '',
    weightInGrams:"",
    purity: "",
    brand: "",
    DOP: "",
    ID: '',
    otherComments: '',
    auth: '',
    error:'',
    imageFront:'dummy',
    imageBack:'dummy',
    showAlert: false
  }
  static navigationOptions = {
    title: "Pawn/Sell New Item",
      headerStyle: {
        backgroundColor: "#FFFFFF",
      },
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#000000"
      },
      // headerLeft: {
      //   onPress: this.goBack()
      // }

  }

  goBack(){
    this.props.navigation.navigate('select');
  }
  submit(){
    this.storeData(this.state);
    this.props.navigation.navigate('ticket');
  }

  retrieveData = async (item) => {
    try {
      const value = await AsyncStorage.getItem(item);
      // console.log(item + " retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }

 storeData = async (key, item) => {
  try{
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    // console.log(error)
  }
}

validate(){
  var errorArray = []
  if(this.state.material==''){
    errorArray.push("Item Material required")
  }
  if(this.state.purity==''){
    errorArray.push("Item Purity required")
  }
  if(this.state.weight==''){
    errorArray.push("Item Weight required")
  }
  if(this.state.DOP==''){
    errorArray.push("Date of Purchase required")
  }
  if(this.state.brand==''){
    errorArray.push("Brand required")
  }
  if(isNaN(this.state.weight)==true){
    errorArray.push("Weight should be a Number eg. 10")
  }
  if(errorArray.length==0){
    this.submit();
  }else{
    // console.log(errorArray)
    this.setState({
      error: errorArray.toString(),
      showAlert: true
    })
  }

}

 componentWillMount(){
  this.retrieveData('front').then((front) => {
    this.setState({
      imageFront: front,
    })
  })
  this.retrieveData('back').then((back) => {
    this.setState({
      imageBack: back,
    })
  })
  this.retrieveData('auth').then((token) => {
    this.setState({auth:token})
  }).catch((error) => {
    // console.log("error retrieving token")
    // console.log(error)
  });
  select = this.props.navigation.getParam('type','others');
  if(select=='Gold Bar'){
    this.setState({
      name: "",
      type: "Gold Bar",
      material: "Gold",
      condition: 'NA',
      brand: this.props.navigation.getParam('brand',''),
      purity: this.props.navigation.getParam('purity', ''),
      weight: this.props.navigation.getParam('weight', '')
    })
  }else{
    if(select=='Watch'){
      this.setState({
        name: "Watch",
        type: "Watch",
        material: "NA",
        weight: "0",
        purity: "NA"
      })
    }else{
      if(select=='Jewel'){
        this.setState({
          type: "Bracelet",
        })
      }else{
      this.setState({
        type: "Others"
      })
    }
  }
  }
}

  submit() {
    console.log("weight: " + this.state.weight)
    console.log("unit: " + this.state.unit)
    console.log("weightInGrams: " + this.state.weightInGrams)
    this.retrieveData('itemID').then((ID) => {
    //   console.log('pawn pressed');
    // console.log(this.state.auth);
    // console.log(
    //   JSON.stringify({
    //     itemID: ID,
    //     name: this.state.name,
    //     type: this.state.type,
    //     material: this.state.material,
    //     brand: this.state.brand,
    //     purity: this.state.purity,
    //     weight: parseInt(this.state.weight),
    //     condition: this.state.condition,
    //     dateOfPurchase: this.state.DOP,
    //     otherComments: this.state.otherComments,

    //   })
    // );
    //console.log(JSON.stringify(this.state))
    fetch(url.url + 'item/add',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.state.auth,
      },
      body: JSON.stringify({
        itemID: ID,
        name: this.state.name,
        type: this.state.type,
        material: this.state.material,
        brand: this.state.brand,
        purity: this.state.purity,
        weight: parseInt(this.state.weightInGrams),
        condition: this.state.condition,
        dateOfPurchase: this.state.DOP,
        otherComments: this.state.otherComments,

      }),
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      // console.log("/item/add Success");
      // console.log("response");
      // console.log(response);
      // console.log("itemID:");
      // console.log(response.itemID);
      // console.log('POV');
      // console.log(response.pawnOfferedValue);
      if(response.pawnOfferedValue==null){
          this.setState({
            error: response.error,
            showAlert:true
          })
      }else{
      this.storeData('pov',response.pawnOfferedValue.toString());
      // console.log('SOV');
      // console.log(response.sellOfferedValue);
      this.storeData('sov',response.sellOfferedValue.toString());
      this.props.navigation.navigate('options');
      }
    })
    .catch((error) => {
      // console.log("error")
      // console.log(error)
    })
    }).catch((error) => {
      // console.log("error retrieving token")
      // console.log(error)
    });

  }

  render() {
    return (
      <View>
        <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
          extraScrollHeight = {150}
          keyboardOpeningTime = {10}
        >
          {/* <Text style={{marginBottom: 10, marginTop: 30, flexDirection: "row"}}> First Upload Item Image </Text> */}
          <View style={{flexDirection: "row", justifyContent:'center', alignItems:'center'}}>
            {/* display taken image of item */}
            <Image
              style={{height: 200, width: 165, marginTop: 25, resizeMode: 'contain'}}
              source={{ uri: this.state.imageFront}}
            />

            <Image
              style={{height: 200, width: 165, marginTop: 25, resizeMode: 'contain'}}
              source={{ uri: this.state.imageBack}}
            />
          </View>

          <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          {/*<View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:30,marginLeft: 15, backgroundColor: 'white'}} >*/}
            <FormLabel>Name</FormLabel>
            <FormInput
              onChangeText={name => this.setState({ name })}
              value={this.state.name}
              placeholder='Item Name'
            />
          </View>

          <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          {/*}<View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>*/}
            <FormLabel>Type</FormLabel>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              iosHeader="Item Type"
              style={{ height: 40, width: 390}}
              placeholder="Item Type"
              placeholderStyle={{ color: "#c7c7cd", flexDirection: 'row' }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.type}
              onValueChange={type => this.setState({type})}
            >
              <Picker.Item label="Gold Bar" value="Gold Bar" />
              <Picker.Item label="Watch" value="Watch" />
              <Picker.Item label="Chain" value="Chain" />
              <Picker.Item label="Necklace" value="Necklace" />
              <Picker.Item label="Bracelet" value="Bracelet" />
              <Picker.Item label="Ring" value="Ring" />
              <Picker.Item label="Others" value="Others" />
            </Picker>
          </View>

          <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          {/*}<View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>*/}
            <FormLabel>Condition out of 10 (if applicable)</FormLabel>

            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              iosHeader="Condition (out of 10)"
              style={{ height: 40, width: 390}}
              placeholder="Condition (out of 10)"
              placeholderStyle={{ color: "#c7c7cd", flexDirection: 'row' }}
              placeholderIconColor="#007aff"
              selectedValue={this.state.condition}
              onValueChange={condition => this.setState({condition})}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="NA" value="NA" />
            </Picker>
          </View>

          <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          {/*}<View style={{flex: 1,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>*/}
            <FormLabel>Material (if applicable)</FormLabel>
            <Picker
              mode="dropdown"
              iosHeader="Item Material"
              placeholder="Item Material"
              placeholderStyle={{ color: "#c7c7cd" }}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ height: 40, width: 390 }}
              selectedValue={this.state.material}
              onValueChange={material => this.setState({material})}
            >
              <Picker.Item label="Gold" value="Gold" />
              <Picker.Item label="Silver" value="Silver" />
              <Picker.Item label="Platinum" value="Platinum" />
              <Picker.Item label="NA" value="NA" />

            </Picker>
          </View>

        {/*<View style={{flex:1,height:70,marginTop:15, marginLeft:15,backgroundColor:'white',flexDirection:'row'}}>*/}
        <View style={{flex: 1,borderBottomColor:"grey",borderBottomWidth:1, marginTop:15, backgroundColor:'white', flexDirection:'row'}}>
          <View style={{flex: 1.2}}>
            <FormLabel>Weight (if applicable)</FormLabel>
            <FormInput
              onChangeText={weight => this.setState({ weight })}
              value={this.state.weight}
              placeholder='Item Weight'
              // containerStyle={{width:'50%'}}
            />
          </View>
          <View style={{flex: 1.2, alignSelf:'flex-end'}}>
            <FormLabel>Unit of Weight</FormLabel>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                iosHeader="Unit"
                style={{ height: 40, }}
                placeholder="Unit"
                placeholderStyle={{ color: "#c7c7cd", flexDirection: 'row' }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.unit}
                onValueChange={unit => {
                  this.setState({unit})
                  this.setState({weightInGrams: parseInt(unit)*this.state.weight})
                }}
              >
              <Picker.Item label="gram (g)" value="1" />
              <Picker.Item label="ounce (oz)" value="28.349523125" />
              <Picker.Item label="kilogram (kg)" value="1000" />
              <Picker.Item label="pounds (lb)" value="453.59237" />
            </Picker>
          </View>
        </View>

        <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
        {/*<View style={{flex: 1,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>*/}
          <FormLabel>Purity (if applicable)</FormLabel>
          <Picker
            mode="dropdown"
            iosHeader="Item Purity"
            placeholder="Item Purity"
            placeholderStyle={{ color: "#c7c7cd" }}
            placeholderIconColor="#007aff"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            style={{ height: 40, width: 390 }}
            selectedValue={this.state.purity}
            onValueChange={purity => this.setState({purity})}
          >
            <Picker.Item label="24K" value="24k/999" />
            <Picker.Item label="22K" value="22k/916" />
            <Picker.Item label="20K" value="20k/835" />
            <Picker.Item label="18K(Yellow Gold)" value="18k/750 (Yellow gold)" />
            <Picker.Item label="18K(White Gold)" value="18k/750 (White gold)" />
            <Picker.Item label="14K" value="14k/585" />
            <Picker.Item label="9K" value="9k/375" />
            <Picker.Item label="NA" value="NA" />

          </Picker>
        </View>

          {/*}<View style={{flex:1,height:70,marginTop:15,marginLeft:15,backgroundColor:'white'}}>*/}
        <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          <FormLabel>Brand</FormLabel>
            <FormInput
              onChangeText={brand => this.setState({ brand })}
              value={this.state.brand}
              placeholder='Item Brand'
            />
        </View>

        {/*}// <View style={{height: 70, width: 390,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>*/}
        {/*}// <View style={{height: 70, width: 390,marginTop:15, backgroundColor:'white'}}>*/}
        <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
        <FormLabel>Date Purchased</FormLabel>
        <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date(1900, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              style={{marginLeft:15}}
              locale={"en-GB"}
              //timeZoneOffsetInMinutes={0}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date of purchase"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#c7c7cd" }}
              onDateChange={DOP => this.setState({ DOP })}
              />
          </View>

          <View style={{height:70, backgroundColor: 'white', alignSelf: 'flex-start', width: '100%'}} >
          {/*}<View style={{flex:1,height:70,marginTop:15,marginLeft:15,backgroundColor:'white'}}>*/}
              <FormLabel>Additional Comments</FormLabel>
              <FormInput
                onChangeText={otherComments => this.setState({ otherComments })}
                placeholder='Input any additional comments here'
                value={this.state.otherComments}
              />
          </View>

          {/* <Text style={{
            fontSize: 20,
            fontFamily: Expo.Font.OpenSansLight,
            alignSelf: 'center',
            color: 'red',
            marginTop: 10
          }}>
            {this.state.error}
          </Text> */}
          <Button
            title="Submit"
            color="white"
            backgroundColor="#C00000"
            onPress={() => this.validate()}
            //onPress={() => this.props.navigation.navigate("ticket")}
            //onPress={() => console.log(this.state)}
            containerViewStyle={{marginTop:30,marginBottom:30}}
          />

        </KeyboardAwareScrollView>
        <AwesomeAlert
              show= {this.state.showAlert}
              title="Pawn Error!"
              message={this.state.error}
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              confirmButtonColor="#C00000"
              confirmText="Close"
              onConfirmPressed={() => {
                this.setState({
                  showAlert:false
                });
                ;
              }}
            />
      </View>
    );
  }
}

export default PawnScreen;

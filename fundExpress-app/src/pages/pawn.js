import React, { Component } from "react";
import { Icon, Picker, DatePicker,Form} from "native-base";
import {AsyncStorage, View, Text,  ScrollView} from "react-native";
import { Avatar , Button, FormLabel, FormInput } from "react-native-elements";
import { Input } from "../components/input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class PawnScreen extends Component {
  state = {
    name: "",
    type: "",
    condition: "",
    material: "",
    weight: '',
    purity: "",
    brand: "",
    DOP: "",
    ID: '', 
    otherComments: '',
    auth: ''
  }
  static navigationOptions = {
    title: "Pawn New Item",
      headerStyle: {
        backgroundColor: "#C00000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }

  submit(){
    this.storeData(this.state);
    this.props.navigation.navigate('ticket');
  }

  retrieveData = async (item) => {
    try {
      const value = await AsyncStorage.getItem(item);
      console.log(item + " retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }

 storeData = async (key, item) => {
  try{
    await AsyncStorage.setItem(key, item);
  } catch (error) {
    console.log(error)
  }
}

 componentWillMount(){
  this.retrieveData('auth').then((token) => {
    this.setState({auth:token})
  }).catch((error) => {
    console.log("error retrieving token")
    console.log(error)
  });
  select = this.props.navigation.getParam('type','others');
  if(select=='bar'){
    this.setState({
      name: "Gold Bar #0000",
      type: "Gold Bar",
      material: "Gold",
      condition: 'NA',

    })
  }else{
    if(select=='watch'){
      this.setState({
        name: "Watch",
        type: "Watch",
        material: "NA",
        weight: "0",
        purity: "NA"
      })
    }else{
      if(select=='jewel'){
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
    this.retrieveData('itemID').then((ID) => {
      console.log('pawn pressed');
    console.log(this.state.auth);
    console.log(ID);
    //console.log(JSON.stringify(this.state))
    fetch('http://206.189.145.2:3000/item/add',{
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
        weight: parseInt(this.state.weight),
        condition: this.state.condition,
        dateOfPurchase: this.state.DOP,
        otherComments: this.state.otherComments,

      }),
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log("/item/add Success");
      console.log("response");
      console.log(response);
      console.log("itemID:");
      console.log(response.itemID);
      console.log('POV');
      console.log(response.pawnOfferedValue);
      this.storeData('pov',response.pawnOfferedValue.toString());
      console.log('SOV');
      console.log(response.sellOfferedValue);
      this.storeData('sov',response.sellOfferedValue.toString());
      this.props.navigation.navigate('options');
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
    }).catch((error) => {
      console.log("error retrieving token")
      console.log(error)
    });
    
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }} 
        extraScrollHeight = {150}
        keyboardOpeningTime = {10}
      >
        <Text style={{marginBottom: 10, marginTop: 30, flexDirection: "row"}}> Upload Item Image </Text>
        <View style={{flexDirection: "row"}}>
          <Avatar
            large
            rounded
            icon={{name: "camera-alt", color: 'white'}}
            containerStyle={{marginLeft: 15, backgroundColor:'#C00000'}}
            onPress={() => this.props.navigation.navigate('upload', {'type': this.state.type})}
            //source={{ uri: this.props.navigation.getParam('uri' , '') }}
          />

          {/* <Avatar
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
            onPress={() => this.props.navigation.navigate('upload')}
          /> */}

        </View>

        <View style={{flex: 1,height:70,borderBottomColor:"black",marginTop:30,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder='Item Name'
          />
        </View>

        <View style={{flex: 1 , borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>
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

          <View style={{flex:1,height:70,marginTop:15,marginLeft:15,backgroundColor:'white'}}>
            <FormLabel>Condition out of 10 (if applicable)</FormLabel>
            <FormInput
              onChangeText={condition => this.setState({ condition })}
              value={this.state.condition}
              placeholder=''
            />
          </View>

          <View style={{flex: 1,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>
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
      
      <View style={{flex:1,height:70,marginTop:15, marginLeft:15,backgroundColor:'white'}}>
        <FormLabel>Weight in Grams (if applicable)</FormLabel>
          <FormInput 
            onChangeText={weight => this.setState({ weight })} 
            value={this.state.weight} 
            placeholder='Item Weight'
          />
      </View>

      <View style={{flex: 1,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>
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

        <View style={{flex:1,height:70,marginTop:15,marginLeft:15,backgroundColor:'white'}}>
          <FormLabel>Brand (if applicable)</FormLabel>
            <FormInput 
              onChangeText={brand => this.setState({ brand })} 
              value={this.state.brand} 
              placeholder='Item Brand'
            />
      </View>

      <View style={{height: 70, width: 390,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15, backgroundColor:'white'}}>
      <FormLabel>Date Purchased</FormLabel>
      <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(1900, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            style={{marginLeft:15}}
            locale={"SGP"}
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

        <View style={{flex:1,height:70,marginTop:15,marginLeft:15,backgroundColor:'white'}}>
            <FormLabel>Additional Comments</FormLabel>
            <FormInput 
              onChangeText={otherComments => this.setState({ otherComments })}  
              placeholder='Input any additional comments here'
              value={this.state.otherComments}
            />
        </View>

        <Button
          title="Submit"
          color="white"
          backgroundColor="#C00000"
          onPress={() => this.submit()}
          //onPress={() => this.props.navigation.navigate("ticket")}
          //onPress={() => console.log(this.state)}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />
    </KeyboardAwareScrollView>
    );
  }
}

export default PawnScreen;

import React, { Component } from "react";
import { Icon, Picker, DatePicker,} from "native-base";
import {AsyncStorage, View, Text,  ScrollView} from "react-native";
import { Avatar , Button, FormLabel, FormInput } from "react-native-elements";
import { Input } from "../components/input";

class PawnScreen extends Component {
  state = {
    name: "",
    type: "",
    condition: "",
    material: "",
    weight: "",
    purity: "",
    brand: "",
    DOP: "",
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
/*
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1",
      chosenDate: new Date
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  shouldComponentUpdate(newDate) {
    this.setState({
      chosenDate: newDate
     });
  }
  */

  submit(){
    this.storeData(this.state);
    this.props.navigation.navigate('ticket');
  }

 storeData = async (item) => {
  try{
    await AsyncStorage.setItem('item', item);
  } catch (error) {
    console.log(error)
  }
}

 componentWillMount(){
  select = this.props.navigation.getParam('type','others');
  if(select=='bar'){
    this.setState({
      name: "Gold Bar #0000",
      type: "gold bar",
      condition: "NA",
      material: "gold",

    })
  }else{
    if(select=='watch'){
      this.setState({
        name: "Watch",
        type: "watch",
        material: "NA",
        weight: "NA",
        purity: "NA"
      })
    }else{
      if(select=='jewel'){
        this.setState({
          type: "bracelet",
        })
      }else{
      this.setState({
        type: "others"
      })
    }
  }
  }


 }

  render() {
    return (
      <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{marginBottom: 10}}> Item Image </Text>
        <View style={{flexDirection: "row"}}>
          <Avatar
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
            onPress={() => this.props.navigation.navigate('upload')}
            source={{ uri: this.props.navigation.getParam('uri' , null) }}
          />

          <Avatar
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:"grey",marginTop:100}} >
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder='Item Name'
          />
        </View>

        <View style={{width:260,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:30}}>
          <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                iosHeader="Item Type"
                style={{ width: 275 }}
                placeholder="Item Type"
                placeholderStyle={{ color: "#c7c7cd" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.type}
                onValueChange={type => this.setState({type})}
              >
              <Picker.Item label="Gold Bar" value="gold bar" />
              <Picker.Item label="Watch" value="watch" />
              <Picker.Item label="Chain" value="chain" />
              <Picker.Item label="Necklace" value="necklace" />
              <Picker.Item label="Bracelet" value="bracelet" />
              <Picker.Item label="Ring" value="ring" />
              <Picker.Item label="Others" value="others" />
              </Picker>
          </View>

          <View style={{width:300,height:50,marginTop:15}}>
            <FormLabel>Condition</FormLabel>
            <FormInput
              onChangeText={condition => this.setState({ condition })}
              value={this.state.condition}
              placeholder='Item Condition'
            />
          </View>

          <View style={{width:260,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
            <Picker
              mode="dropdown"
              iosHeader="Item Material"
              placeholder="Item Material"
              placeholderStyle={{ color: "#c7c7cd" }}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 275 }}
              selectedValue={this.state.material}
              onValueChange={material => this.setState({material})}
            >
              <Picker.Item label="Gold" value="gold" />
              <Picker.Item label="Silver" value="silver" />
              <Picker.Item label="Platinum" value="platinum" />
              <Picker.Item label="NA" value="NA" />

            </Picker>
          </View>

      <View style={{width:300,height:50,marginTop:15}}>
        <FormLabel>Weight</FormLabel>
          <FormInput
            onChangeText={weight => this.setState({ weight })}
            value={this.state.weight}
            placeholder='Item Weight'
          />
      </View>

      <View style={{width:260,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
            <Picker
              mode="dropdown"
              iosHeader="Item Purity"
              placeholder="Item Purity"
              placeholderStyle={{ color: "#c7c7cd" }}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 275 }}
              selectedValue={this.state.purity}
              onValueChange={purity => this.setState({purity})}
            >
              <Picker.Item label="24K" value="98.5" />
              <Picker.Item label="22K" value="90" />
              <Picker.Item label="20K" value="83.5" />
              <Picker.Item label="18K(Yellow Gold)" value="70" />
              <Picker.Item label="18K(White Gold)" value="65" />
              <Picker.Item label="14K" value="50" />
              <Picker.Item label="9K" value="30" />
              <Picker.Item label="NA" value="NA" />

            </Picker>
        </View>

        <View style={{width:300,height:50,marginTop:15}}>
          <FormLabel>Brand</FormLabel>
            <FormInput
              onChangeText={brand => this.setState({ brand })}
              value={this.state.brand}
              placeholder='Item Brand'
            />
      </View>

      <View style={{width:260,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
      <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
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


        <Button
          title="Submit"
          color="white"
          backgroundColor="#C00000"
          //onPress={() => this.submit()}
          onPress={() => this.props.navigation.navigate("ticket", {
            name: this.state.name,
            type: this.state.type,
            material: this.state.material,
            weight: this.state.weight,
            DOP: this.state.DOP,
            POP: this.state.POP,

          })}
          //onPress={() => console.log(this.state)}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />
    </ScrollView>
    );
  }
}

export default PawnScreen;

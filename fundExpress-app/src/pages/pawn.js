import React, { Component } from "react";
import { Icon, Picker, DatePicker} from "native-base";
import {AsyncStorage, View, Text,} from "react-native";
import { Avatar , Button } from "react-native-elements";
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
        backgroundColor: "#ff0000", 
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
  

 }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text style={{marginBottom: 10}}> Item Image </Text>
        <View style={{flexDirection: "row"}}>
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

          <Avatar 
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />
        </View> */}

        <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
          <Input 
            //value={this.state.fullName}
            onChangeText={name => this.setState({ name })}
            placeholder="Item Name" 
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
          <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                iosHeader="Item Type"
                style={{ width: 325 }}
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
              <Picker.Item label="Other" value="other" />
              </Picker>
          </View>

          <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
            <Picker
              mode="dropdown"
              iosHeader="Item Material"
              placeholder="Item Material"
              placeholderStyle={{ color: "#c7c7cd" }}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 325 }}
              selectedValue={this.state.material}
              onValueChange={material => this.setState({material})}
            >
              <Picker.Item label="Gold" value="gold" />
              <Picker.Item label="Silver" value="silver" />
              <Picker.Item label="Platinum" value="platinum" />
              <Picker.Item label="Other" value="other" />

            </Picker>
          </View>
      
      <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
        <Input 
          //value={this.state.fullName}
          onChangeText={weight => this.setState({ weight })}
          placeholder="Item Weight" 
        />
      </View>

      <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
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
          backgroundColor="#ff0000"
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
    </View>
    );
  }
}

export default PawnScreen;
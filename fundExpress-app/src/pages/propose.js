import React from 'react';
import {View, Text, AsyncStorage,} from 'react-native';
import { Button, Slider, FormInput, FormLabel } from 'react-native-elements';

class ProposeScreen extends React.Component {
  static navigationOptions = {
    title: "New Pawn Ticket",
    headerLeft: null,
      headerStyle: {
        backgroundColor: "#C00000", 
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }

  state = {itemID:'', specifiedValue:'', maxValue:'1000'}

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      console.log("succssfully retrieved " + item + ': ' + value)
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      console.log(key + " stored successfully");
      this.props.navigation.navigate('pawnTicket')
    } catch (error) {
      console.log(error)
    }
  }

  go(){
    this.storeData('specifiedValue', this.state.specifiedValue)
  }

  componentWillMount(){
    this.retrieveData('itemID').then((ID) => {
      this.setState({
        itemID: ID
      })
      console.log(this.state.itemID)
    })
    this.retrieveData('pov').then((value) => {
      this.setState({
        specifiedValue: ((Math.round(value))-1).toString()
      })
      console.log(this.state.maxValue)
    })
  }

  pawn(){
    this.retrieveData('auth').then((auth) => {
      fetch('http://206.189.145.2:3000/item/pawn',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth': auth,
        },
        body: JSON.stringify({
          itemID: this.state.itemID,
          specifiedValue: this.state.specifiedValue
        }),
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        console.log("/item/pawn Success");
        console.log("response");
        console.log(response);
        //console.log(JSON.stringify(response.item));
        this.storeData('itemObj', JSON.stringify(response));
        //this.props.navigation.navigate('pawnTicket')
      })
      .catch((error) => {
        console.log("error")
        console.log(error)
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>How much do you wish to pawn your item for?</Text>
        <View style={{flex: 0.5,height:70,borderBottomColor:"black",marginTop:50,marginLeft: 15, backgroundColor: 'white'}} >
          <FormLabel>Value</FormLabel>
          <FormInput 
            onChangeText={specifiedValue => this.setState({ specifiedValue })} 
            value={this.state.specifiedValue} 
            placeholder='value here'
          />
        </View>
        {/* <Text>${this.state.specifiedValue}</Text> */}
        {/* <Slider 
          //value={parseFloat(this.state.maxValue)}
          maximumValue={parseInt(this.state.maxValue)}
          step={1}
          value={50}
          minimumValue={0}
          //maximumValue={100}
          maximumTrackTintColor="#C00000"
          minimumTrackTintColor="#C00000"
          //onValueChange={specifiedValue=>this.setState({specifiedValue})}
        /> */}
        <Button
              title='Pawn Item!'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 120,}}
              backgroundColor='#C00000'
              onPress={() => this.go()}
            />
      </View>
    );
  }
}

export default ProposeScreen;

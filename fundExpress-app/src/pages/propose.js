import React from 'react';
import {View, Text, AsyncStorage,} from 'react-native';
import { Button, Slider, FormInput, FormLabel } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../configs/config';
class ProposeScreen extends React.Component {
  static navigationOptions = {
    title: "New Ticket",
    headerLeft: null,
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "black"
      },
  }

  state = {itemID:'', specifiedValue:'',
            maxValue:0, showAlert:false,error:''}

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      // console.log("succssfully retrieved " + item + ': ' + value)
      return value;
    } catch (error) {
      // console.log(error)
    }
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      // console.log(key + " stored successfully");
      this.props.navigation.navigate('pawnTicket')
    } catch (error) {
      // console.log(error)
    }
  }

  validate(){
    if(this.state.specifiedValue>this.state.maxValue){
      this.setState({
        error: "Requested value cannot be more that the offered value!",
        showAlert: true
      })
    }else{
      this.go();
    }
  }

  go(){
    this.storeData('specifiedValue', (this.state.specifiedValue).toString())
  }

  componentWillMount(){
    this.retrieveData('itemID').then((ID) => {
      this.setState({
        itemID: ID
      })
      // console.log(this.state.itemID)
    })
    this.retrieveData('pov').then((value) => {
      this.setState({
        maxValue: ((Math.round(value))-1),
        specifiedValue: ((Math.round(value))-1)
      })
      // console.log(this.state.maxValue)
    })
  }

  pawn(){
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
          specifiedValue: this.state.specifiedValue
        }),
      })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        // console.log("/item/pawn Success");
        // console.log("response");
        // console.log(response);
        if(response.error==null){
          this.storeData('itemObj', JSON.stringify(response));
          this.props.navigation.navigate('pawnTicket')
        }else{
          this.setState({
            showAlert: true,
            error: response.error
          })
        }
      })
      .catch((error) => {
        // console.log("error")
        // console.log(error)
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>How much do you wish to pawn your item for?</Text> */}
        <FormLabel labelStyle={{color:'black'}}
        >How much do you wish to pawn your item for?</FormLabel>
        <View style={{width:'95%', justifyContent:'center'}}>
        {/* <Text style={{fontSize:25,}}>Loan Value:</Text> */}
        <FormLabel labelStyle={{fontSize:25, color:'black'}}
        >Loan Value:</FormLabel>
        {/* <Text style={{fontSize:35, fontWeight:'bold'}}> */}
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:35, fontWeight:'bold'}}>$</Text>
          <FormInput
                  onChangeText={specifiedValue => this.setState({ specifiedValue })}
                  value={(this.state.specifiedValue).toString()}
                  inputStyle={{fontSize:35, fontWeight:'bold', color:'black'}}
                  returnKeyType='done'
            /> 
          {/* $ {this.state.specifiedValue} */}
          {/* </Text> */}
        </View>
          
        </View>

        <View style={{flex: 0.5, alignItems: 'stretch', justifyContent: 'center', width: 350}}>
          <Slider
            value={parseInt(this.state.maxValue)}
            maximumValue={parseInt(this.state.maxValue)}
            step = {1}
            onValueChange={(specifiedValue => this.setState({specifiedValue}))}/>
        </View>
        <Button
              title='Pawn Item!'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 50, width: 120,}}
              backgroundColor='#C00000'
              onPress={() => this.validate()}
            />
            <AwesomeAlert
          show= {this.state.showAlert}
          title="Pawn Error!"
          message={this.state.error}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          onConfirmPressed={() => {
            this.setState({ showAlert: false })
            ;
          }}
        />
      </View>
    );
  }
}

export default ProposeScreen;

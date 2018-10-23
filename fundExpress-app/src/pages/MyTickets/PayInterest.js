import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const s = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});

const USE_LITE_CREDIT_CARD_INPUT = true;
export default class PayInterestScreen extends React.Component{
  static navigationOptions = {
    title: 'Pay Interest',
      headerStyle: {
        backgroundColor: '#C00000',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
  };
  constructor(props){
    super(props)

    this.state={
      pawnTicketID: '',
      amountPaid: 0,
      isSuccess: false,
      formData: {
        valid: true, // will be true once all fields are "valid" (time to enable the submit button)
        values: { // will be in the sanitized and formatted form
        	number: "4242 4242",
        	expiry: "06/19",
        	cvc: "300",
        	type: "visa", // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
        	name: "Sam",
        	postalCode: "34567",
        },
        status: {  // will be one of ["incomplete", "invalid", and "valid"]
          number: "incomplete",
          expiry: "incomplete",
          cvc: "incomplete",
          name: "incomplete",
          postalCode: "incomplete",
        },
      }
    }
  }
  componentWillMount(){
    this.setState(
      {
        pawnTicketID: this.props.navigation.getParam('pawnTicketID'),
        amountPaid: this.props.navigation.getParam('interestPayable'),
      }
    )
  }
  _onChange = formData => {
    /* eslint no-console: 0 */
    console.log(JSON.stringify(formData, null, " "));
    this.setState({formdata: JSON.stringify(formData, null, " ")})
  };

  _onFocus = field => {
    /* eslint no-console: 0 */
    console.log(field);
  };
  render(){
    return(
      <View style={{flex:1, backgroundColor:'white'}}>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>Interest Payment Information</Text>
        <Text style={{fontSize:14, fontWeight: 'bold'}}>Interest Payable: {this.state.amountPaid}</Text>
        <Text style={{fontSize:14, fontWeight: 'bold'}}>Pawn Ticket ID: {this.state.pawnTicketID}</Text>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>Card Information</Text>
        <View style={s.container}>
        <LiteCreditCardInput
            autoFocus
            inputStyle={s.input}

            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            onFocus={this._onFocus}
            onChange={this._onChange} />
          </View>

        <Button
          title='Pay'
          color='#FFFFFF'
          backgroundColor='#C00000'
          onPress={() => this.props.navigation.navigate('PayResult', {'paymentState': this.state})}
        />
      </View>
    );
  }
}
/*
<View style={s.container}>
  { USE_LITE_CREDIT_CARD_INPUT ?
    (<LiteCreditCardInput
        autoFocus
        inputStyle={s.input}

        validColor={"black"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}

        onFocus={this._onFocus}
        onChange={this._onChange} />) :
      (<CreditCardInput
          autoFocus

          requiresName
          requiresCVC
          requiresPostalCode

          labelStyle={s.label}
          inputStyle={s.input}
          validColor={"black"}
          invalidColor={"red"}
          placeholderColor={"darkgray"}

          onFocus={this._onFocus}
          onChange={this._onChange} />)
  }
</View>
*/

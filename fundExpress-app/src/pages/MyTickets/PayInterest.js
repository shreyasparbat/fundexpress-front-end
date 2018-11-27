import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import AwesomeAlert from 'react-native-awesome-alerts';

const s = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding:10,
    alignItems: 'center',
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

var stripe = require('stripe-client')('pk_test_EHiL03ZRGf51r3cUVqlq6cO9');
const USE_LITE_CREDIT_CARD_INPUT = false;
export default class PayInterestScreen extends React.Component{
  static navigationOptions = {
    title: 'Payment',
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#000000'
      },
  };
  constructor(props){
    super(props)

    this.state={
      ticketId: '',
      amountPaid: 0,
      isSuccess: false,
      showAlert: false,
      error:'',
      exp_month:0,
      exp_year:0,
      loading:false,
      formData: {
        valid: true, // will be true once all fields are "valid" (time to enable the submit button)
        values: { // will be in the sanitized and formatted form
        	number: "",
        	expiry: "",
        	cvc: "",
        	type: "", // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
        	name: "",
        	postalCode: "",
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
        ticketId: this.props.navigation.getParam('ticketId'),
        amountPaid: this.props.navigation.getParam('amountPaid'),
      }
    )
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ formData: values })
  }

  _onFocus = field => {
    /* eslint no-console: 0 */
     console.log(field);
  };
  onPayment = async () => {
    console.log("1. Payment button pressed");

    var card = await stripe.createToken({
      card : {
        number: this.state.formData.values.number,
        exp_month: parseInt(this.state.formData.values.expiry.substring(0,2)),
        exp_year: parseInt('20' + this.state.formData.values.expiry.substring(3,5)),
        cvc: this.state.formData.values.cvv
      }

    })
    var token = card.id;
    // send token to backend for processing
    console.log("3. retrieve token: " + token);
    return token;
  }
  getEncodedUrl(token){
    var result =  "amount=" + this.state.amountPaid*100 + "&currency=sgd&source=" + token + "&description=" + this.state.ticketId;
    return result;
  }
  requestPayment = async () =>{
     this.onPayment().then((token)=> {
        console.log("5. requestPayment() token: " + token);
        fetch('https://api.stripe.com/v1/charges',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer sk_test_q1uqX0M8Nc4XTTI1tr5ZmJOY ' //'Bearer <insert_secret_key_here>' (go to fundexpress stripe account to get)
          },
          body: this.getEncodedUrl(token)
        }).then(response=>{
          console.log("response.ok: " + response.ok);
          return response.json()
        }).then(response=>{
          console.log(response)
          this.props.navigation.navigate('PayResult',{charge: response, ticketId: this.state.ticketId})
        }).catch(error=>{
          console.log("error")
        })
      })
    }
    validateCard(){
      console.log("set loading=true");
      this.setState({loading:true});
      if(this.state.formData.status.number=='incomplete'){
        this.setState({
          error: "Card number is incomplete",
          showAlert: true
        });
        return false;
      } else if (this.state.formData.status.cvv=='incomplete'){
        this.setState({
          error: "Card cvv is imcomplete",
          showAlert: true
        });
        return false;
      } else if (this.state.formData.status.expiry=='incomplete'){
        this.setState({
          error: "Card expiry date is incomplete",
          showAlert: true
        });
        return false;
      } else if (this.state.formData.status.number=='invalid'){
        this.setState({
          error: "Card number is incorrect",
          showAlert: true
        });
        return false;
      } else if (this.state.formData.status.cvv=='invalid'){
        this.setState({
          error: "Card cvv is incorrect",
          showAlert: true
        });
        return false;
      } else if (this.state.formData.status.expiry=='invalid'){
        this.setState({
          error: "Card expiry date is incorrect",
          showAlert: true
        });
        return false;
      }else{

        return true;
      }
      return false;
    }
  render(){
    if (this.state.loading){
      return (
        <View style={{justifyContent:'center', alignSelf:'center', backgroundColor:'white', flex:1, flexDirection: 'row'}}>
          <ActivityIndicator/>
        </View>

      );
    }

    return(
      <View style={{flex:1, backgroundColor:'white', justifyContent:'center'}}>
        <View style={s.container}>
          <Text style={{fontSize:20, fontWeight: 'bold'}}>Interest Payment Information</Text>
          <Text style={{fontSize:18}}>Interest Payable: {this.state.amountPaid}</Text>
          {/* <Text style={{fontSize:14}}>Pawn Ticket ID: {this.state.ticketId}</Text> */}
        </View>
        <View style={s.container}>
        <Text style={{fontSize:20, fontWeight: 'bold'}}>Card Information</Text>

        <LiteCreditCardInput
            autoFocus
            inputStyle={s.input}

            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            onFocus={this._onFocus}
            onChange={this.handleValueChange.bind(this)} />
          </View>

        <Button
          title='Pay'
          color='#FFFFFF'
          backgroundColor='#C00000'
          onPress={() => {
              var bool = this.validateCard()
              if (bool==true){
                this.requestPayment()
              }

            }
          }
        />
        <AwesomeAlert
          show= {this.state.showAlert}
          title="Card Error!"
          message={this.state.error}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

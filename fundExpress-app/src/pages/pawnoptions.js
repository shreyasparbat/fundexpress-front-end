import React from 'react';
import {View, Text, AsyncStorage,Image} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../configs/config';

class PawnOptions extends React.Component {
  state = {
    pov:'',
    sov:'',
    image: '',
    auth: '',
    showAlert: false,
    showAlert2: false, 
    status:true,
  };

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

  retrieveData = async (item) => {
    try{
      const value = await AsyncStorage.getItem(item);
      return value;
    } catch (error) {
      // console.log(error)
    }
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      // console.log(key + " stored successfully");
    } catch (error) {
      // console.log(error)
    }
  }

  checkReg(){
    this.retrieveData().then((token) => {
      fetch(url.url + 'profile/me', {
      method: 'POST',
      headers: new Headers({
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'x-auth' : token,
      }),
      // body: JSON.stringify({
      //   auth : token
      // })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject(response.json())
        }
      })
      .then((response) => {
        // console.log("profile retrieved")
        // console.log(response)
        //console.log(response.body)
        this.setState({
          status: response.registrationCompleted
        });
        //console.log("state fullName: " + this.state.fullName)
      })
      .catch((errorResponse) => {
        // console.log("error with profile/me ")
        // console.log(errorResponse)
      })
    }).catch((error) => {
      // console.log("error retrieving  profile data")
      // console.log(error)
    });
  }
//load the image URI, Pawn offered value and Sell offered value
  componentWillMount() {
    this.checkReg();
      this.retrieveData('pov').then((pov) => {
        this.setState({
          pov: pov
        })
        // console.log(parseInt(pov))
      })
        this.retrieveData('sov').then((sov) => {
          this.setState({
            sov: sov
          })
    })
    this.retrieveData('auth').then((auth) => {
      this.setState({
        auth: auth
      })
    })
  }


  // sell(){
  //   this.retrieveData('itemID').then((ID) => {
  //   fetch('http://206.189.145.2:3000/item/sell',{
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'x-auth': this.state.auth,
  //     },
  //     body: JSON.stringify({
  //       itemID: ID,
  //     }),
  //   })
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((response) => {
  //     console.log("/item/sell Success");
  //     console.log("response");
  //     console.log(JSON.stringify(response.item));
  //     this.storeData('itemObj', JSON.stringify(response.item)); 
  //     // console.log('pov');
  //     // console.log(response.item.pawnOfferedValue);
  //     this.props.navigation.navigate('sellTicket')
  //   })
  //   .catch((error) => {
  //     console.log("error")
  //     console.log(error)
  //   })
  // })
  // }

  checkPawn(){
    if(this.state.status==true){
      this.props.navigation.navigate('propose');
    }else{
      this.setState({
        showAlert2:true
      })
    }
  }

  checkSell(){
    if(this.state.status==true){
      this.props.navigation.navigate('sell');
    }else{
      this.setState({
        showAlert2:true
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
      
      {/* Card for the POV and SOV */}
        <View style={{backgroundColor:'white',
         borderRadius:3, marginTop:30,
         height:150,
         width:300,
         justifyContent:'center',
         alignItems:'center',
         flexDirection:'row'
         }}>
         <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:25, }}> Pawn Value: </Text>
           <Text style={{fontSize:30,fontWeight:'bold'}}>${(Math.round(this.state.pov)-1)}</Text>
         </View>
         <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
           <Text style={{fontSize:25,}}> Sell Value: </Text> 
           <Text style={{fontSize:30,fontWeight:'bold'}}>${(Math.round(this.state.sov)-1)}</Text> 
         </View>
          
          
        </View>
        
        <View 
          style={{ justifyContent: 'center', alignItems: 'center', 
          marginTop: 35, flexDirection: 'row' }}>
          <Button
              title='Pawn'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#C00000'
              onPress={() => this.checkPawn()}
            />
          <Button
              title='Sell'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#C00000'
              onPress={() => this.checkSell()}
            />
            <Button
              title='Reject'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#C00000'
              onPress={() => this.showAlert()}
            />

        </View>
        <AwesomeAlert
          show= {this.state.showAlert}
          //showProgress={false}
          //title="AwesomeAlert"
          message="Are you sure you want to reject the offer?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Yes" //it's intentionally opposite to place the yes on the left button
          confirmText="No"
          confirmButtonColor="#DD6B55"
          cancelButtonColor="green"
          onCancelPressed={() => {
            this.hideAlert();
            this.props.navigation.navigate('main')

          }}
          onConfirmPressed={() => {
            this.hideAlert();
            ;
          }}
        />
        <AwesomeAlert
          show= {this.state.showAlert2}
          //showProgress={false}
          title="Registration Incomplete"
          message="Before you can pawn or sell an item, you have to register fully. Please proceed to the profile page to complete your registration"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Take me there!"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
            this.props.navigation.navigate('Profile');
            ;
          }}
        />
      </View>
    );
  }
}

export default PawnOptions;

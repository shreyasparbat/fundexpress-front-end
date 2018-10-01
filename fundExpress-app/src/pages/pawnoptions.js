import React from 'react';
import {View, Text, AsyncStorage,Image} from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';

class PawnOptions extends React.Component {
  state = {
    pov:'',
    sov:'',
    image: '',
    auth: '',
    showAlert: false 
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
      console.log(error)
    }
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      console.log(key + " stored successfully");
    } catch (error) {
      console.log(error)
    }
  }

//load the image URI, Pawn offered value and Sell offered value
  componentWillMount() {
    this.retrieveData('photo').then((photo) => {
      this.setState({
        image: photo
      })
    })
      this.retrieveData('pov').then((pov) => {
        this.setState({
          pov: pov
        })
        console.log(parseInt(pov))
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

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* display taken image of item */}
        <Image
            style={{height: 200, width: 200, marginTop: 70}}
            source={{ uri: this.state.image}}
          />
      
      {/* Card for the POV and SOV */}
        <View style={{backgroundColor:'white',
         borderRadius:3, marginTop:30,
         height:150,
         width:300,
         justifyContent:'center',
         alignItems:'center'
         }}>
          <Text> Pawn Value: ${Math.round(this.state.pov)}</Text>
          <Text> Sell Value: ${Math.round(this.state.sov)}</Text>
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
              onPress={() => this.props.navigation.navigate('propose')}
            />
          <Button
              title='Sell'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#C00000'
              onPress={() => this.props.navigation.navigate('sellTickets')}
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
          onCancelPressed={() => {
            this.hideAlert();
            this.props.navigation.navigate('main')

          }}
          onConfirmPressed={() => {
            this.hideAlert();
            ;
          }}
        />
      </View>
    );
  }
}

export default PawnOptions;

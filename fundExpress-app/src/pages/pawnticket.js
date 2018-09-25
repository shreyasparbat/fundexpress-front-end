import React from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';

class PawnTicket extends React.Component {
  state = {name: ", type: ", material:", DOP: ", POP: ", image: ", weight: '', LTV: '',
           showAlert: false };

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

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('item');
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  componentWillMount() {
    // this.retrieveData().then((item) => {
    //   this.setState({
    //     name : item.name,
    //     type: item.type,
    //     material: item.material,
    //     DOP: item.DOP,
    //     POP: item.POP,
    //     weight: item.weight
    //   })

    // })
    // this.setState({
    //   name:this.props.getParam('name', 'no name'),
    //   type:this.props.getParam('type', 'no type'),
    //   material:this.props.getParam('material','no material'),
    //   DOP:this.props.getParam('DOP', 'no DOP'),
    //   POP: this.props.getParam('POP', 'no POP'),
    //   weight: this.props.getParam('weight', 'no weight')
    // })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Proposed Loan To Value: $xxxx.xx</Text>
        <View
          style={{ justifyContent: 'center', alignItems: 'center',
          marginTop: 130, flexDirection: 'row' }}>
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
              onPress={() => this.props.navigation.navigate('sell')}
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

export default PawnTicket;

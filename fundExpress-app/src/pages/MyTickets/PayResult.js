import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';


export default class PayResultScreen extends React.Component{


  render(){
    if(this.state.loading){
      return <ActivityIndicator />
    }
    if(this.state.valid){
      return(
        <View>
          <Text>Valid Transaction</Text>
        </View>
      );
    }
    return(
      <View>
        <Text>Invalid Transaction</Text>
      </View>
    );
  }
}

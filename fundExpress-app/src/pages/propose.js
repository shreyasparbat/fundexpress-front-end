import React from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native-elements';

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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ticket Pending Approval.</Text>
        <Text>Please go down to your nearest FundExpress to submit your item!</Text>
        <Button
              title='Return to Home'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#ff0000'
              onPress={() => this.props.navigation.navigate("main")}
            />
      </View>
    );
  }
}

export default ProposeScreen;

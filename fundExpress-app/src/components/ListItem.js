import React, { Component } from 'react';
import { Card, Avatar } from 'react-native-elements';
import { Text, View } from 'react-native';

class ListItem extends Component {
/*
  render () {
    return (
      <Card>
        <Text> {this.props.dateCreated} </Text>
      </Card>
    );
  }
}
*/
  



render() {
  return (
    <Card>
      <View style={{flex:1, flexDirection: 'row'}}>
        <Avatar
          xlarge
          icon={{name: 'home'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={{flex: 5, marginRight: 30}}
        />
        <View style={{flexDirection: 'column', alignContent: 'center', justifyContent: 'center'}}>
          <Text> ticketNumber </Text>
          <Text> dateCreated </Text>
          <Text> expiryDate </Text>
          <Text> interestPayable </Text>
          <Text> offeredValue </Text>
        </View>
      </View>
    </Card>
  )
}

}

export default ListItem;
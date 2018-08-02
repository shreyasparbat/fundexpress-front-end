import React from 'react';
import { View, Text, Button } from 'react-native';


class HistoryPreviousScreen extends React.Component {
  static navigationOptions = {
    title: 'Previously pawned items',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Previously Pawned Items</Text>
      </View>
    );
  }
}

export default HistoryPreviousScreen;
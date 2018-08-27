import React from 'react';
import { View, Text, Button } from 'react-native';


class HistoryCurrentScreen extends React.Component {
  static navigationOptions = {
    title: 'Currently Pawned Items',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Currently Pawned Items</Text>
      </View>
    );
  }
}

export default HistoryCurrentScreen;
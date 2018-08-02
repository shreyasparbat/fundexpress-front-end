import React from 'react';
import { View, Text, Button } from 'react-native';


class HistorySoldScreen extends React.Component {
  static navigationOptions = {
    title: 'Sold Items',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sold Items</Text>
      </View>
    );
  }
}

export default HistorySoldScreen;
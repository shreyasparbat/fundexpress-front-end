import React from 'react';
import { View, Text, Button } from 'react-native';


class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>History</Text>
      </View>
    );
  }
}

export default HistoryScreen;
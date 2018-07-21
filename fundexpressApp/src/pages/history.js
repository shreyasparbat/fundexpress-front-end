import React from 'react';
import { View, Text, Button } from 'react-native';


class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Pawn History',
    headerRight: (
      <Button
      onPress={() => alert('filter')}
      title="Filter"
      color='#fff'
      />
    ),
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default HistoryScreen;
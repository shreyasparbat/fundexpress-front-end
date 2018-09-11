import React from 'react';
import { View, Text , FlatList} from 'react-native';
import ListItem from '../components/ListItem';

var sTick = {
  ticketNumber: '',
  dateCreated: '',
  offeredValue: ''
}

const list = [
  {
    ticketNumber: '001',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '500'
  },
  {
    ticketNumber: '002',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '700'
  },
  {
    ticketNumber: '003',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '700'
  },
  {
    ticketNumber: '004',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '700'
  },
];

class HistorySoldScreen extends React.Component {
  static navigationOptions = {
    title: 'Sold Items',
    headerStyle: {
      backgroundColor: '#ff0000', 
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };
  renderItem(library) {
    return <ListItem library = {list} />

  }

  render() {
    return (
      <View>
      <FlatList 
        data= {list}
        renderItem={this.renderItem}
        keyExtractor={(list) => list.ticketNumber}
      />
      </View>
    );
  }
}

export default HistorySoldScreen;
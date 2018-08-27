import React from 'react';
import { View, Text , FlatList} from 'react-native';
import ListItem from '../components/ListItem';

var pTick = {
  ticketNumber: '',
  dateCreated: '',
  expiryDate: '',
  interestPayable: '',
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

class HistoryPreviousScreen extends React.Component {
  static navigationOptions = {
    title: 'Previously pawned items',
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
      <FlatList 
        data= {list}
        renderItem={this.renderItem}
        keyExtractor={(list) => list.ticketNumber}
      />
    );
  }
}

export default HistoryPreviousScreen;
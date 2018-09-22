//this was HistorySold
import React from 'react';
import { View, Text , FlatList} from 'react-native';
import ListItem from '../components/ListItem';

var sTick = {
  ticketNumber: '',
  dateCreated: '',
  offeredValue: ''
}


class TicketsSoldScreen extends React.Component {
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
      <FlatList
        data= {list}
        renderItem={this.renderItem}
        keyExtractor={(list) => list.ticketNumber}
      />
    );
  }
}

export default TicketsSoldScreen;


const sellTickets = [
  {
    userId: 'user123',
    itemId: 'item001',
    ticketNumber: '202020',
    dateCreated: '01/04/2018',
    offeredValue: '1000',
    approvalStatus: 'approved'
  },
  {
    userId: 'user123',
    itemId: 'item001',
    ticketNumber: '202020',
    dateCreated: '01/04/2018',
    offeredValue: '1000',
    approvalStatus: 'approved'
  }
]
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

import React from 'react';
import { View, Text , FlatList} from 'react-native';
import ListItem from '../components/ListItem';
import axios from 'axios';

var pTick = {
  image: '',
  ticketNumber: '',
  dateCreated: '',
  expiryDate: '',
  interestPayable: '',
  offeredValue: ''
};
/*
componentDidMount() {
  axios.post('http://206.189.145.2:3000/history', {
    x-auth
  })
  .then(res => )
  .catch
};
*/
const list = [
  {
    ticketNumber: '1',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '500'
  },
  {
    ticketNumber: '2',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '700'
  },
  {
    ticketNumber: '3',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '700'
  },
  {
    ticketNumber: '4',
    dateCreated: '01/08/2018',
    expiryDate: '01/02/2019',
    interestPayable: '1%',
    offeredValue: '700'
  },
];


class HistoryCurrentScreen extends React.Component {

  static navigationOptions = {
    title: 'Currently Pawned Items',
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

export default HistoryCurrentScreen;
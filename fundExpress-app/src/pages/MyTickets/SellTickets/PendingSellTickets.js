//this was HistorySold
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList } from 'react-native';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import SellTicket from '../../../components/SellTicket';

class CurrentSellTickets extends React.Component {
  //header
  static navigationOptions = {
    title: 'Currently Sold Items',
    headerStyle: {
      backgroundColor: '#C00000',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#ffffff'
    },
  };

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

    this.state = {
        dataSource: ds.cloneWithRowsAndSections({}),
    };

  }



  componentDidMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(sellTickets)
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {

      return (
        <SellTicket
          userId={sellTickets.dataSource[rowID].userId}
          itemId={sellTickets.dataSource[rowID].itemId}
          itemName={sellTickets.dataSource[rowID].itemName}
          ticketNumber={sellTickets.dataSource[rowID].ticketNumber}
          dateCreated={sellTickets.dataSource[rowID].dateCreated}
          value={sellTickets.dataSource[rowID].value}
          approvalStatus={sellTickets.dataSource[rowID].approvalStatus}
        />
      );
  }


  renderSectionHeader(sectionData, category) {
    return (
      <View >

      </View>
    );
  }

  render(){
      return (
        <View style={{paddingTop:5}}>

            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
                renderSectionHeader={this.renderSectionHeader}
            />

        </View>
      );
    }
}

export default CurrentSellTickets;


const sellTickets = {dataSource: [
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202030',
    dateCreated: new Date('2018-09-25'),
    value: '1000',
    approvalStatus: 'approved'
  },
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202031',
    dateCreated: new Date('2018-09-23'),
    value: '1000',
    approvalStatus: 'approved'
  },
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202032',
    dateCreated: new Date('2018-09-22'),
    value: '1000',
    approvalStatus: 'approved'
  }
]
}

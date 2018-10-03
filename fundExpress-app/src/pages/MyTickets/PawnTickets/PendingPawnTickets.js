//this was historyCurrent
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import PawnTicket from '../../../components/PawnTicket';

const pawnTickets = {dataSource: [
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202029',
    dateCreated: new Date('2018-09-23'),
    expiryDate: new Date('2019-02-22'),
    interestPayable: '82',
    offeredValue: '1000',
    specifiedValue: '999',
    approvalStatus: 'approved'
  },
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202028',
    dateCreated: new Date('2018-09-21'),
    expiryDate: new Date('2019-03-21'),
    interestPayable: '82',
    offeredValue: '1000',
    specifiedValue: '999',
    approvalStatus: 'approved'
  },
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202027',
    dateCreated: new Date('2018-09-11'),
    expiryDate: new Date('2019-02-11'),
    interestPayable: '82',
    offeredValue: '1000',
    specifiedValue: '999',
    approvalStatus: 'approved'
  }]
}
class PendingPawnTickets extends React.Component {
  //state has an empty array initially. it will hold pawn tickets
  //each of the pawnTickets has the following attributes
  //userId, itemId, ticketNumber, dateCreated, expiryDate, interestPayable, offeredValue, specifiedValue, approvalStatus
  //each of the sellTickets has the following attributes
  //userId, itemId, ticketNumber, dateCreated, offeredValue, approvalStatus


  //header
  static navigationOptions = {
    title: 'Currently Pawned Items',
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
          dataSource: this.state.dataSource.cloneWithRowsAndSections(pawnTickets)
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {

      return (
        <PawnTicket
          userId={pawnTickets.dataSource[rowID].userId}
          itemId={pawnTickets.dataSource[rowID].itemId}
          itemName={pawnTickets.dataSource[rowID].itemName}
          ticketNumber={pawnTickets.dataSource[rowID].ticketNumber}
          dateCreated={pawnTickets.dataSource[rowID].dateCreated}
          expiryDate={pawnTickets.dataSource[rowID].expiryDate}
          interestPayable={pawnTickets.dataSource[rowID].interestPayable}
          offeredValue={pawnTickets.dataSource[rowID].offeredValue}
          specifiedValue={pawnTickets.dataSource[rowID].specifiedValue}
          approvalStatus={pawnTickets.dataSource[rowID].approvalStatus}
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

export default PendingPawnTickets;
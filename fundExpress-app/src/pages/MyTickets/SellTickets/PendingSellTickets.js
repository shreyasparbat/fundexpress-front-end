//this was HistorySold
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
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
    console.log("1. create state");
    this.state = {
        dataSource: ds.cloneWithRowsAndSections({}),
        sellTickets:'',
        loading: false
    };

  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('auth');
      console.log('2. auth retrieved: ' + value)
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  retrieveTickets(){
    this.retrieveData().then((auth) => {
    fetch('http://206.189.145.2:3000/tickets/',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth': auth,
      },
      //body:{}
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log("/tickets Success");
      console.log("response" + response);
      //console.log(response.sellTicketPendingApproval[0]);
      //console.log("set state")
      this.setState({
        //dataSource: this.state.dataSource.cloneWithRowsAndSections(response.sellTicketPendingApproval),
        sellTickets: {dataSource: response.sellTicketPendingApproval},
        loading:false
      })
      console.log('state.sellTickets: ' + this.state.sellTickets)
      //console.log("userID: " + this.state.sellTickets[0].userID)
      //console.log('dataRow' + sellTickets.dataSource[0].userID)
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  })
  }


  // componentWillMount(){
  //   console.log("3. retrieve tickets called")
  //   this.retrieveTickets();
      
  // }

  componentDidMount(){
    this.retrieveTickets()
    //console.log('const sellTickets: ' + sellTickets)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.sellTickets)
    });
    
  }

//   componentWillMount(){
//     this.retrieveTickets().then((tickets) => {
//       this.setState({
//         sellTickets: {dataSource: [tickets]}
//       })
//     })
//     console.log('selltickets: ' + this.state.sellTickets);
//     //console.log(this.retrieveTickets());
//     this.setState({
//         dataSource: this.state.dataSource.cloneWithRowsAndSections(this.state.sellTickets)
//     });
// }

  renderRow(rowData: string, sectionID: number, rowID: number) {
      // const sellTickets = this.state.sellTickets;
      // console.log(sellTickets[0]);
      return (
        <SellTicket
          userId={this.state.sellTickets.dataSource[rowID].userID}
          itemId={this.state.sellTickets.dataSource[rowID].item._id}
          itemName={this.state.sellTickets.dataSource[rowID].item.name}
          ticketNumber={this.state.sellTickets.dataSource[rowID].item._v}
          dateCreated={this.state.sellTickets.dataSource[rowID].dateCreated}
          value={this.state.sellTickets.dataSource[rowID].value}
          approvalStatus={this.state.sellTickets.dataSource[rowID].approved}
          // userId={this.state.sellTickets[rowID].userID}
          // itemId={this.state.sellTickets[rowID].itemid}
          // itemName={this.state.sellTickets[rowID].itemName}
          // ticketNumber={this.state.sellTickets[rowID].ticketNumber}
          // dateCreated={this.state.sellTickets[rowID].dateCreated}
          // value={this.state.sellTickets[rowID].value}
          // approvalStatus={this.state.sellTickets[rowID].approvalStatus}
          
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
    if(this.state.loading){
      return <ActivityIndicator />
    }
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

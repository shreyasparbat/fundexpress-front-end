//this was historyCurrent
import React from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import ListItem from '../components/ListItem';
import ProgressBar from '../components/ProgressBar';
import axios from 'axios';
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import Moment from 'moment'; //for date
import url from '../configs/config';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const pawnTickets = {dataSource: [
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202020',
    dateCreated: new Date('2018-03-26'),
    expiryDate: new Date('2018-09-26'),
    interestPayable: '82',
    offeredValue: '1000',
    specifiedValue: '999',
    approvalStatus: 'approved'
  },
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202021',
    dateCreated: new Date('2018-03-01'),
    expiryDate: new Date('2018-09-01'),
    interestPayable: '82',
    offeredValue: '1000',
    specifiedValue: '999',
    approvalStatus: 'approved'
  },
  {
    userId: 'user123',
    itemId: 'item001',
    itemName: 'ROLEX Datejust Automatic Gold Dial 18kt Yellow Gold Watch',
    ticketNumber: '202022',
    dateCreated: new Date('2018-05-01'),
    expiryDate: new Date('2018-11-01'),
    interestPayable: '82',
    offeredValue: '1000',
    specifiedValue: '999',
    approvalStatus: 'approved'
  }]
}



class TicketsCurrentScreen extends React.Component {
  //state has an empty array initially. it will hold pawn tickets
  //each of the pawnTickets has the following attributes
  //userId, itemId, ticketNumber, dateCreated, expiryDate, interestPayable, offeredValue, specifiedValue, approvalStatus
  //each of the sellTickets has the following attributes
  //userId, itemId, ticketNumber, dateCreated, offeredValue, approvalStatus


  //header
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

  getTimePassed(dateCreated, expiryDate){

    //find number of milliseconds in days
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    //get the day difference between dateCreated and expiryDate
    var totalDays = Math.round(Math.abs((dateCreated.getTime() - expiryDate.getTime())/(oneDay)));

    //get the difference in number of days between dateCreated and the date now
    var now = new Date();
    var progressedDays = Math.round(Math.abs((dateCreated.getTime() - now.getTime())/(oneDay)));

    //return the percentage of time passed
    var percentage = (progressedDays/totalDays)*100.0
    if (percentage<100){
      return percentage
    } else {
      return 100
    }
  }

  getProgressBarColor(dateCreated, expiryDate){
    //find number of milliseconds in days
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

    //get the difference in number of days between expiryDate and the date now
    var now = new Date();
    var remainingDays = Math.round((expiryDate.getTime() - now.getTime())/(oneDay));

    //get the ProgressBar color
    /*
    red: 100%
    yellow: 7days or less
    green: everything else
    */
    if (remainingDays <=0) {
      return "#C00000"; //return red if remainingDays is negative
    } else if (remainingDays <= 7) {
      return "#FFc000"; // return yellow if there are 7 or less remainingDays
    } else {
      return "#4cbb17"; //return green for all other values of remainingDays
    }
  }

  getDateNicelyFormatted(date){
    var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year:"numeric" })
    var arrayOfDateParts = currentDateString.split(" ");
    var month = arrayOfDateParts[0]
    var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
    var year = arrayOfDateParts[2]
    return day + " " + month + "\r\n" + year;
  }

  retrieveData = async (item) => {
    try {
      const value = await AsyncStorage.getItem(item);
      // console.log("token retrieved")
      // console.log(value);
      return value;
    } catch (error){
      throw error
    }
  }

  componentDidMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(pawnTickets)
      });

      this.retrieveData('auth').then((auth) => {
        fetch(url.url + 'tickets/',{
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth': auth,
          },
          body: {}
        })
        .then((response) => {
          return response.json()
        })
        .then((response) => {
          // console.log("/item/pawn Success");
          // console.log("response");
          // console.log(response);
          //this.props.navigation.navigate('propose')
        })
        .catch((error) => {
          console.log("error")
          console.log(error)
        })
      })
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {

      return (
        <View>
              <Card style={{flex: 0}}>
                <CardItem>
                <Left>
                <Image
                  source={require('../images/felogo.png')}
                  style={{ resizeMode: 'contain', width: 90 , height: 90}}
                />
                </Left>
                    <Body>

                      //
                      <View style={{marginBottom: 10}}>
                        <Text style={{fontSize:25}}>Ticket #{pawnTickets.dataSource[rowID].ticketNumber}</Text>
                        <Text note>{pawnTickets.dataSource[rowID].itemName}</Text>
                      </View>

                      //ProgressBar
                      <ProgressBar
                          percentage={this.getTimePassed(pawnTickets.dataSource[rowID].dateCreated, pawnTickets.dataSource[rowID].expiryDate)}
                          color={this.getProgressBarColor(pawnTickets.dataSource[rowID].dateCreated, pawnTickets.dataSource[rowID].expiryDate)}
                      />

                      // date under the ProgressBar
                      <View style={{flexDirection: 'row', marginBottom: 10}}>
                      <Text style={{width:85}}>{this.getDateNicelyFormatted(pawnTickets.dataSource[rowID].dateCreated)}</Text>
                      <Text style={{width:85, textAlign: 'right'}}>{this.getDateNicelyFormatted(pawnTickets.dataSource[rowID].expiryDate)}</Text>
                      </View>

                      //pawn amount and interestPayable
                      <View style={{flexDirection: 'row', padding: 5}}>
                        //column 1
                        <View style={{flexDirection: 'column', backgroundColor: '#d3d3d3'}}>
                          <Text>Pawn amount: </Text>
                          <Text>Interest Payable: </Text>

                        </View>
                        //column 2
                        <View style={{flexDirection: 'column'}}>
                          <Text>{pawnTickets.dataSource[rowID].offeredValue}</Text>
                          <Text>{pawnTickets.dataSource[rowID].interestPayable}</Text>
                        </View>
                      </View>

                      //Buttons container
                      <CardItem style={{justifyContent: 'center'}}>
                        //Renew Now Button
                        <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('renew')}>
                          <Text style={{fontSize: 16, color: '#ffffff', }}>Renew Now</Text>
                        </Button>

                        //Value Button
                        <Button style={styles.buttonStyle}>
                          <Text style={{fontSize: 16, color: '#ffffff', }}>Value</Text>
                        </Button>
                      </CardItem>
                    </Body>

                </CardItem>


              </Card>

          </View>
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

export default TicketsCurrentScreen;

const styles = {
  buttonStyle: {
    margin: 5,
    height:35,
    backgroundColor: '#ff0000',
    width:80,
    justifyContent: 'center'
  }
}

/*
componentDidMount() {
  axios.post('http://206.189.145.2:3000/history', {
    x-auth
  })
  .then(res => )
  .catch
};
*/
/*
const list = [
  //userId, itemId, ticketNumber, dateCreated, expiryDate, interestPayable, offeredValue, specifiedValue, approvalStatus
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
var pTick = {
  image: '',
  ticketNumber: '',
  dateCreated: '',
  expiryDate: '',
  interestPayable: '',
  offeredValue: ''
};
*/

import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import React from 'react';
import ProgressBar from './ProgressBar';
import { Image, Text, Linking, ListView, View, TouchableOpacity, FlatList, Platform } from 'react-native';

const styles = {
  buttonStyle: {
    height:35,
    backgroundColor: '#C00000',
    width:80,
    justifyContent: 'center'
  }
}

export default class SellTicket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: props.data.userID,
      itemId: props.data.itemId,
      itemName: props.data.item.name,
      ticketNumber: props.data.item._id,
      dateCreated: new Date(props.data.dateCreated),
      value: props.data.value,
      approvalStatus: props.data.approved
    }
  }
  getDateNicelyFormatted(date){
    if(Platform.OS==="ios"){
      // console.log("date: " + date);
      var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year:"numeric" })
      // console.log("currentDateString: " + currentDateString)
      var arrayOfDateParts = currentDateString.split(" ");
      // console.log("arrayOfDateParts: " + arrayOfDateParts)
      var month = arrayOfDateParts[0]
      // console.log('month: ' + month)
      var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
      // console.log('day: ' + day)
      var year = arrayOfDateParts[2]
      // console.log('year: ' + year)
      return day + " " + month.substring(0, 3) + year;
    }else{
      // console.log("date: " + date);
      var currentDateString = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year:"numeric" })
      // console.log("currentDateString: " + currentDateString)
      var arrayOfDateParts = currentDateString.split("/");
      // console.log("arrayOfDateParts: " + arrayOfDateParts)
      var month = arrayOfDateParts[0]
      // console.log('month: ' + month)
      var day = arrayOfDateParts[1].substring(0, arrayOfDateParts[1].indexOf(","))
      // console.log('day: ' + day)
      var year = arrayOfDateParts[2]
      // console.log('year: ' + year)
      return day + " " + month.substring(0, 3) + "/" + year;
    }
  }
  roundTo(number) {
      return parseFloat(Math.round(number * 100) / 100).toFixed(2);
  }
  render(){
    // console.log(this.state);
    return(
      <View>
            <Card style={{flex: 0}}>
              <CardItem>
              {/* <Left>
              <Image
                source={require('../images/feplaceholder.png')}
                style={{ resizeMode: 'contain', width: 100 , height: 100}}
              />
              </Left> */}
                  <Body>

                    {/* // */}
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize:25}}>{this.state.itemName}</Text>
                      {/* <Text note>Ticket #{this.state.ticketNumber}</Text> */}
                    </View>


                    {/* //pawn amount and interestPayable */}
                    <View style={{flexDirection: 'row', padding: 5}}>
                      {/* //column 1 */}
                      <View style={{flexDirection: 'column', backgroundColor: '#d3d3d3'}}>
                        <Text>Date Created: </Text>
                        <Text>Item Value: </Text>

                      </View>
                      {/* //column 2 */}
                      <View style={{flexDirection: 'column'}}>
                        <Text>{this.getDateNicelyFormatted(this.state.dateCreated)}</Text>
                        <Text>{this.roundTo(this.state.value)}</Text>
                      </View>
                    </View>

                    {/* //Buttons container */}
                    <View style={{alignSelf: 'center'}}>
                    <CardItem>
                      {/* //Value Button */}
                      <Button style={styles.buttonStyle}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Value</Text>
                      </Button>
                    </CardItem>
                    </View>
                  </Body>

              </CardItem>


            </Card>

        </View>
    );
  }

}

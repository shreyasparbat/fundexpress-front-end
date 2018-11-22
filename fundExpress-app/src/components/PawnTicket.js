import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import React from 'react';
import ProgressBar from './ProgressBar';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ActivityIndicator, Image, Text, Linking, ListView, View, TouchableOpacity, FlatList,Platform } from 'react-native';

const styles = {
  buttonStyle: {
    margin: 5,
    height:35,
    backgroundColor: '#C00000',
    width:100,
    justifyContent: 'center'
  }
}

export default class PawnTicket extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navigation:props.navigation,
      ticketId: props.data._id,
      userId: props.userID,
      itemName: props.data.item.name,
      itemId: props.data.item._id,
      dateCreated: new Date(props.data.dateCreated),
      expiryDate: new Date(props.data.expiryDate),
      interestPayable: this.roundTo(props.data.indicativeTotalInterestPayable),
      value: props.data.value,
      approvalStatus: props.data.approved,
      closed: props.data.closed,
      outstandingPrincipal: this.roundTo(props.data.outstandingPrincipal),
      outstandingInterest: this.roundTo(props.data.outstandingInterest),
      showAlert: false,
      error: '',
    }
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
      return day + " " + month.substring(0, 3) + " " + year;
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
      return day + " " + month.substring(0, 3) + " "+ year;
    }

  }
  roundTo(number) {
      return parseFloat(Math.round(number * 100) / 100).toFixed(2);
  }

  generateURI(itemID){
    var uri = 'https://fundexpress-api-storage.sgp1.digitaloceanspaces.com/item-images/'
    uri = uri.concat(itemID)
    uri = uri.concat('_front.png')
    // console.log('uri: ' + uri)
    // console.log('itemID: ' + this.state.ticketNumber)
    return uri
  }
  renderPayInterestButton(){
    if (this.state.approvalStatus==true&&this.state.outstandingInterest>0){
      return(
        <CardItem style={{justifyContent: 'center'}}>
          {/* Pay Interest Button */}
          <Button style={styles.buttonStyle} onPress={() => {
              this.props.navigation.navigate('PayInterest',{
                amountPaid: this.state.outstandingInterest,
                ticketId: this.state.ticketId,
              })
            }}>
            <Text style={{fontSize: 16, color: '#ffffff', }}>Pay Interest</Text>
          </Button>
        </CardItem>
      );
    }
    return <CardItem/>
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
  render(){
    return(

            <Card style={{flex: 1}}>

              <CardItem style={{flexDirection:'column'}} button onPress={()=> this.props.navigation.navigate('pTicket', {'itemID':this.state.itemId, 'ticketID':this.state.ticketId})}>

              <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center', alignItems:'center',flex:0.3}}>
                  <Image
                    source={{uri: this.generateURI(this.state.itemId)}}
                    loadingIndicatorSource={<ActivityIndicator />}
                    style={{ resizeMode: 'contain', width: 90 , height: 90}}
                  />
                </View>

                  <View style={{flex:0.7, marginLeft:10}}>
                    <View style={{marginBottom: 10}}>
                      <Text style={{fontSize:25}}>{this.state.itemName}</Text>
                      {/* <Text note>Ticket #{this.state.ticketNumber}</Text> */}
                    </View>

                    {/* //ProgressBar */}
                    <ProgressBar
                        percentage={this.getTimePassed(this.state.dateCreated, this.state.expiryDate)}
                        color={this.getProgressBarColor(this.state.dateCreated, this.state.expiryDate)}
                    />

                    {/* // date under the ProgressBar */}
                    <View style={{flexDirection: 'row', marginBottom: 10}}>
                      <Text style={{width:85}}>{this.getDateNicelyFormatted(this.state.dateCreated)}</Text>
                      <Text style={{width:85, textAlign: 'right'}}>{this.getDateNicelyFormatted(this.state.expiryDate)}</Text>
                    </View>

                    {/* //outstanding Principal and outstandingInterest */}
                    <View style={{flexDirection: 'row', padding: 5}}>
                      {/* //column 1 */}
                      <View style={{flexDirection: 'column', backgroundColor: '#d3d3d3'}}>
                        <Text>Outstanding Principal: </Text>
                        <Text>Outstanding Interest: </Text>

                      </View>
                      {/* //column 2 */}

                      {/* //${Math.round(this.state.offeredValue)} */}
                      <View style={{flexDirection: 'column'}}>
                        <Text>{this.roundTo(this.state.outstandingPrincipal)}</Text>
                        <Text>{this.roundTo(this.state.outstandingInterest)}</Text>
                      </View>
                    </View>
                  </View>
              </View>
              {/* //Buttons container */}
              {this.renderPayInterestButton()}
              {/* <CardItem style={{justifyContent: 'center'}}>

                      <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('renew')}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Renew Now</Text>
                      </Button>


                      <Button style={styles.buttonStyle}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Value</Text>
                      </Button>

                      <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('PayInterest',
                      {
                        amountPaid: this.state.interestPayable,
                        pawnTicketID: this.state.ticketNumber,
                      }
                      )}>
                        <Text style={{fontSize: 16, color: '#ffffff', }}>Pay Interest</Text>
                      </Button>
                    </CardItem> */}

              </CardItem>

            </Card>

    );
  }

}

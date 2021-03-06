import React, { Component } from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity,  } from 'react-native';//linking
import { Container,  Content, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
//^these are for the store information, except Textarea and Form
import call from 'react-native-phone-call'; //for calling
import { List, ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { Permissions, Location, Constants } from 'expo';

//address and contact information that is shown to the user
const dataArray = { dataSource: [

  {
    //OUTLET 1: Balestier
    number:0,
    name: "Fund Express (Balestier) Pawnshop Pte Ltd",
    address: "296 Balestier Rd, 329735",
    weekdayStartTime: [9, 0], // [hr, min] in 24h clock
    weekdayEndTime: [17, 0],
    satStartTime:[9, 0],
    satEndTime:[13,0],
    sunStartTime: 'Closed',
    sunEndTime: '',
    publicHoliday: 'Closed',
    phoneNumber: "+65 68993060",
    linkToGoogleMaps: "https://goo.gl/maps/4mZLBp9cgpn",
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/55/imgFundExpressBalestiers-1489999904.jpg"
  },
  {
    //OUTLET 2: Bukit Merah
    number:1,
    name: "Fund Express (Bukit Merah) Pawnshop Pte Ltd",
    address: "Jalan Bukit Merah, #01-1508 Block 133, 160133",
    weekdayStartTime: [8, 30], // [hr, min] in 24h clock
    weekdayEndTime: [17, 30],
    satStartTime:[8, 30],
    satEndTime:[13,30],
    sunStartTime: 'Closed',
    sunEndTime: '',
    publicHoliday: 'Closed',
    phoneNumber: '+65 6270 3624',
    linkToGoogleMaps: 'https://goo.gl/maps/o1nwdeYogBC2',
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/56/imgFundExpressBukitMerahs-1490000431.jpg"
  },
  {
    //OUTLET 3: Jurong East
    number:2,
    name: "Fund Express (Jurong East) Pawnshop Pte Ltd",
    address: "345 Jurong East Street 31, Singapore 600345",
    weekdayStartTime: [8, 30], // [hr, min] in 24h clock
    weekdayEndTime: [18, 0],
    satStartTime:[8, 30],
    satEndTime:[14,0],
    storeLat:1.345637,
    storeLon:103.731137,
    sunStartTime: 'Closed',
    sunEndTime: '',
    publicHoliday: 'Closed',
    phoneNumber: '+65 6896 1978',
    linkToGoogleMaps: 'https://goo.gl/maps/ZCqMEM56ryx',
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png"//"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/57/imgFundExpressJurongEast-1490001143.jpg"
  },
  {
    //OUTLET 4: Jurong West
    number:3,
    name: "Fund Express (Jurong West) Pawnshop Pte Ltd",
    address: "463 Jurong West Street 41, Singapore 640463",
    weekdayStartTime: [8, 30], // [hr, min] in 24h clock
    weekdayEndTime: [17, 30],
    satStartTime:[8, 30],
    satEndTime:[13,30],
    storeLat:1.350629,
    storeLon:103.723092,
    sunStartTime: 'Closed',
    sunEndTime: '',
    publicHoliday: 'Closed',
    phoneNumber: '+65 6567 8661',
    linkToGoogleMaps: 'https://goo.gl/maps/Kkzocz1QF5z',
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/58/imgFundExpressJurongwest-1490002114.jpg"
  },
  {
    //OUTLET 5: Tampines
    number:4,
    name: "Fund Express (Tampines) Pawnshop Pte Ltd",
    address: "201E Tampines Street 23, Singapore 527201",
    weekdayStartTime: [8, 30], // [hr, min] in 24h clock
    weekdayEndTime: [19, 30],
    satStartTime:[8, 30],
    satEndTime:[17,30],
    sunStartTime: [8, 30],
    sunEndTime: [15,0],
    publicHoliday: 'Closed',
    phoneNumber: '+65 6785 1955',
    linkToGoogleMaps: 'https://goo.gl/maps/kats5UP8VWU2',
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/59/imgFundExpressTampines-1490003014.jpg"
  },
  {
    //OUTLET 6: Tekka
    number:5,
    name: "Fund Express (Tekka) Pawnshop Pte Ltd",
    address: "4 Buffalo Rd, Singapore 219781",
    weekdayStartTime: [9, 0], // [hr, min] in 24h clock
    weekdayEndTime: [19, 0],
    satStartTime:[9, 0],
    satEndTime:[15,0],
    sunStartTime: 'Closed',
    sunEndTime: '',
    publicHoliday: 'Closed',
    phoneNumber: '+65 6293 8753',
    linkToGoogleMaps: 'https://goo.gl/maps/PbeUKfXshtk',
    imageURL: "https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png"//"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/237/imgFundExpressTekkas-1509951245.jpg"
  }


]}



export default class ContactUsScreen extends Component {
  static navigationOptions = {
    title: "Contact Us",
      headerStyle: {
        backgroundColor: "#C00000",
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.renderSectionHeader = this.renderSectionHeader.bind(this);


    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2});

    this.state = {
        dataSource: ds.cloneWithRowsAndSections({}),
        currLat:'',
        currLon:'',
        nearest:''

    };

  }

  componentDidMount(){
    this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataArray)
    });
}

  componentWillMount(){
    this._getLocationAsync();
   }

  _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        currLat: location.coords.latitude,
        currLon: location.coords.longitude
      });
      this.calculateDistances();
      // this.distanceBtwCoords(1.350629,103.723092); 
    // console.log(this.state.location)
      // console.log(this.state.location.coords.longitude)
      // console.log(this.state.location.coords.latitude)
  };

  toRadians(x){
    return x*Math.PI / 180
  }

  distanceBtwCoords(disArray){
    // console.log('calculating')
    var currLat = this.state.currLat
    var currLon = this.state.currLon
    // console.log(currLat)
    // console.log(this.toRadians(currLat))
    // console.log(disArray[0])
    // console.log(disArray[1])

    var R = 6371e3; // metres
    var φ1 = this.toRadians(currLat);
    var φ2 = this.toRadians(disArray[0]);
    var Δφ = this.toRadians(disArray[0]-currLat);
    var Δλ = this.toRadians(disArray[1]-currLon);

    var a = Math.sin(Δφ/2)*Math.sin(Δφ/2)+Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)*Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    // console.log('distance:' + d)
    return d;
  }

  calculateDistances(){
    var coordArray = [
      [1.323101,103.852608],
      [1.279643, 103.827285],
      [1.345637, 103.731137],
      [1.350629, 103.723092],
      [1.353173, 103.954146],
      [1.306405, 103.851491]
    ]
    var disArray = []
    for(i=0;i<coordArray.length;i++){
      var d = this.distanceBtwCoords(coordArray[i])
      disArray.push(d)
    }
    // console.log(disArray)
    var index = 0;
    var value =  disArray[0];
    for(i=0;i<disArray.length;i++){
      if(disArray[i]<value){
        value = disArray[i]
        index = i
      }
      // console.log(index)
      this.setState({
        nearest: index
      })
    }
  }

  renderNearest(rowID){
    if(rowID===this.state.nearest){
      return(
        <Text style={{fontWeight:'bold', color:'green'}}>Nearest to your current location!</Text>
      )
    }else{
      return null
    }
  }

  

  checkIfStoreIsOpen(startTime, endTime){
    // console.log("checkIfStoreIsOpen")
    if(startTime=='Closed'){
      return 'Closed'
    }
    var now = new Date()
    // console.log("time now: " + now)
    var month = now.getMonth()
    var year = now.getFullYear()
    var day = now.getDate()
    var start = new Date(year, month, day, startTime[0], startTime[1])
    // console.log("start time: " + start)
    var end = new Date(year, month, day, endTime[0], endTime[1])
    // console.log("end time: " + end)
    if (now<start||now>end){
      // console.log('store is closed now ')
      return 'Closed now'
    }
    // console.log('open now')
    return 'Open now'
  }
  displayStoreStatus(store){
    // console.log("displayStoreStatus")
    // console.log(store.name)
    var now = new Date()
    var dayOfWeek = now.getDay() //returns 0-6
    // console.log("dayOfWeek:" + dayOfWeek)
    if (dayOfWeek==0){//sunday
      if(store.sunStartTime=='Closed'){
        return 'Closed now'
      } else {
        return this.checkIfStoreIsOpen(store.sunStartTime, store.sunEndTime);
      }
    } else if (dayOfWeek>=1||dayOfWeek<=5){ //weekdays
      return this.checkIfStoreIsOpen(store.weekdayStartTime, store.weekdayEndTime)
    } else {
      return this.checkIfStoreIsOpen(store.satStartTime, store.satEndTime)
    }

  }
  displayOpeningTimes(startTime, endTime){
    // console.log("displayOpeningTimes")
    if (startTime=='Closed'){
      // console.log('opening hours: closed')
      return 'Closed'
    }
    var startHour = startTime[0].toString()
    var startMin = startTime[1].toString()
    if (startMin=='0'){
      startMin='00'
    }
    var endHour = endTime[0].toString()
    var endMin = endTime[1].toString()
    if (endMin=='0'){
      endMin='00'
    }
    // console.log("opening hours: ")
    // console.log(startHour + ':' + startMin + ' - ' + endHour + ':' + endMin)
    return startHour + ':' + startMin + ' - ' + endHour + ':' + endMin;

  }
  renderRow(rowData: string, sectionID: number, rowID: number) {

      return (
        <View style={{backgroundColor:'#e5e5e5'}}>
              <Card style={{flex: 0}}>
                <CardItem>
                  <Left>
                    <Image
                      source={require('../../images/felogo.png')}
                      style={{ resizeMode: 'contain', width: 45, height: 45
                      }}
                    />
                    <Body style={{justifyContent:'center'}}>
                      <Text>{dataArray.dataSource[rowID].name}</Text>
                      <Text note>{this.displayStoreStatus(dataArray.dataSource[rowID])}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body >
                    {this.renderNearest(dataArray.dataSource[rowID].number)}
                    <View style={{flexDirection: 'row', padding: 5}}>
                      {/* //column 1 */}
                      <View style={{flexDirection: 'column', }}>
                        <Text> Monday - Friday: </Text>
                        <Text> Saturday: </Text>
                        <Text> Sundays: </Text>
                        <Text> Public Holidays: </Text>
                      </View>
                      {/* //column 2 */}

                      {/* //${Math.round(this.state.offeredValue)} */}
                      <View style={{flexDirection: 'column'}}>
                        <Text>{this.displayOpeningTimes(dataArray.dataSource[rowID].weekdayStartTime, dataArray.dataSource[rowID].weekdayEndTime)}</Text>
                        <Text>{this.displayOpeningTimes(dataArray.dataSource[rowID].satStartTime, dataArray.dataSource[rowID].satEndTime)}</Text>
                        <Text>{this.displayOpeningTimes(dataArray.dataSource[rowID].sunStartTime, dataArray.dataSource[rowID].sunEndTime)}</Text>
                        <Text>Closed</Text>
                      </View>
                    </View>





                  </Body>
                </CardItem>
                <CardItem>
                <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>


                  <Button
                    title='Call'
                    style={styles.buttonStyle}
                    onPress={()=> call({number:dataArray.dataSource[rowID].phoneNumber, prompt : false }).catch(console.error)}
                    color= 'white'
                    backgroundColor='#c00000'
                  />
                  <Button
                    title='Directions'
                    style={styles.buttonStyle}
                    onPress={() => Linking.openURL(dataArray.dataSource[rowID].linkToGoogleMaps)}
                    color= 'white'
                    backgroundColor='#C00000'
                  />
                  </View>
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
const styles = {
  buttonStyle: {
    flex:1,
    margin: 5,
    backgroundColor: '#C00000',
    width:100,
    justifyContent: 'center',
  }
}

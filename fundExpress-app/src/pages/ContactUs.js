import React, { Component } from 'react';
import { Image, Text, Linking, ListView, View, TouchableOpacity } from 'react-native';//linking for all the "HERE" except the one in FAQ 20
import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';
import call from 'react-native-phone-call'; //for contact us button
import { List, ListItem } from 'react-native-elements';

//outlet phone numbers to call
const phoneNumbers =  [
  {
    //test number: call this one to test
    number: '+65 8499 5158', // String value with the number to call
    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
  },
  {
    //OUTLET 1: Balestier
    number: '+65 6251 7368', // String value with the number to call
    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
  },
  {
    //OUTLET 2: Bukit Merah
    number: '+65 6270 3624', // String value with the number to call
    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
  },
  {
    //OUTLET 3: Jurong East
    number: '+65 6896 1978', // String value with the number to call
    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
  },
  {
    //OUTLET 4: Jurong West
    number: '+65 6567 8661', // String value with the number to call
    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
  },
  {
    //OUTLET 5: Tampines
    number: '+65 6785 1955', // String value with the number to call
    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
  },
  {
    //OUTLET 6: Tekka
    number: '+65 6293 8753', // String value with the number to call
    prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
  }
];

//address and contact information that is shown to the user
const dataArray = { dataSource: [

  {
    //OUTLET 1: Balestier
    name: "Fund Express (Balestier) Pawnshop Pte Ltd",
    address: "296 Balestier Rd, 329735",
    phoneNumber: "+65 6251 7368",
    linkToGoogleMaps: "https://goo.gl/maps/4mZLBp9cgpn",
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/55/imgFundExpressBalestiers-1489999904.jpg"
  },
  {
    //OUTLET 2: Bukit Merah
    name: "Fund Express (Bukit Merah) Pawnshop Pte Ltd",
    address: "Jalan Bukit Merah, #01-1508 Block 133, 160133",
    phoneNumber: "+65 6270 3624",
    linkToGoogleMaps: "https://goo.gl/maps/o1nwdeYogBC2",
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/56/imgFundExpressBukitMerahs-1490000431.jpg"
  },
  {
    //OUTLET 3: Jurong East
    name: "Fund Express (Jurong East) Pawnshop Pte Ltd",
    address: "345 Jurong East Street 31, Singapore 600345",
    phoneNumber: "+65 6896 1978",
    linkToGoogleMaps: "https://goo.gl/maps/ZCqMEM56ryx",
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png"//"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/57/imgFundExpressJurongEast-1490001143.jpg"
  },
  {
    //OUTLET 4: Jurong West
    name: "Fund Express (Jurong West) Pawnshop Pte Ltd",
    address: "463 Jurong West Street 41, Singapore 640463",
    phoneNumber: "+65 6567 8661",
    linkToGoogleMaps: "https://goo.gl/maps/Kkzocz1QF5z",
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/58/imgFundExpressJurongwest-1490002114.jpg"
  },
  {
    //OUTLET 5: Tampines
    name: "Fund Express (Tampines) Pawnshop Pte Ltd",
    address: "201E Tampines Street 23, Singapore 527201",
    phoneNumber: "+65 6785 1955",
    linkToGoogleMaps: "https://goo.gl/maps/kats5UP8VWU2",
    imageURL:"https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png" //"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/59/imgFundExpressTampines-1490003014.jpg"
  },
  {
    //OUTLET 6: Tekka
    name: "Fund Express (Tekka) Pawnshop Pte Ltd",
    address: "4 Buffalo Rd, Singapore 219781",
    phoneNumber: "+65 6293 8753",
    linkToGoogleMaps: "https://goo.gl/maps/PbeUKfXshtk",
    imageURL: "https://wiki.smu.edu.sg/is480/img_auth.php/d/d7/Definitive.png"//"https://www.singpawn.org/media/com_jbusinessdirectory/pictures/companies/237/imgFundExpressTekkas-1509951245.jpg"
  }


]}



export default class ContactUsScreen extends Component {
  static navigationOptions = {
    title: "Contact Us",
      headerStyle: {
        backgroundColor: "#ff0000",
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

    };

  }

  componentDidMount(){

      this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(dataArray)
      });
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {
      return (
          <TouchableOpacity /*onPress={()=>this.onRowPress(rowData)}*/>
            <Card style={{flex: 0}}>
              <CardItem>
                <Left>
                  <Image
                    source={require('../images/felogo.png')}
                    style={{ resizeMode: 'contain', width: 45, height: 45
                    }}
                  />
                  <Body>
                    <Text>{dataArray.dataSource[rowID].name}</Text>
                    <Text note>open now</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>



                  <Text>Telephone:
                    <Text style={{color: 'blue'}} onPress={() => call({number: <Text>{dataArray.dataSource[rowID].phoneNumber}</Text>, prompt : true}).catch(console.error)}>
                      {dataArray.dataSource[rowID].phoneNumber}
                    </Text>
                  </Text>

                  <Text>Address:
                    <Text style={{color: 'blue'}} onPress={() => Linking.openURL(<Text>{dataArray.dataSource[rowID].linkToGoogleMaps}</Text>)}>
                      {dataArray.dataSource[rowID].address}
                    </Text>
                  </Text>

                </Body>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent textStyle={{color: '#87838B'}}>
                    <Icon name="md-time" />
                    <Text>8:30AM -5:00PM</Text>
                  </Button>
                </Left>
              </CardItem>
            </Card>




          </TouchableOpacity>
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
        <View >
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

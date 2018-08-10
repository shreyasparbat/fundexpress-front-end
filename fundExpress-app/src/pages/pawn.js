import React, { Component } from "react";
import { Icon, Picker, DatePicker} from "native-base";
import {View, Text,} from "react-native";
import { Avatar , Button } from "react-native-elements";
import { Input } from "../components/input";

class PawnScreen extends Component {
  state = {name: ", type: ", material:", DOP: ", POP: ", image: ", weight: ''}
  static navigationOptions = {
    title: "Pawn New Item",
      headerStyle: {
        backgroundColor: "#ff0000", 
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }
/*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1",
      chosenDate: new Date 
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  shouldComponentUpdate(newDate) {
    this.setState({ 
      chosenDate: newDate
     });
  }
  */

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{marginBottom: 10}}> Item Image </Text>
        <View style={{flexDirection: "row"}}>
          <Avatar 
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar 
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar 
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar 
            large
            icon={{name: "camera-alt", color: "grey"}}
            containerStyle={{marginLeft: 15}}
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
          <Input 
            //value={this.state.fullName}
            onChangeText={name => this.setState({ name })}
            placeholder="Item Name" 
          />
        </View>

        <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
          <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                iosHeader="Item Type"
                style={{ width: 325 }}
                placeholder="Item Type"
                placeholderStyle={{ color: "#c7c7cd" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.type}
                onValueChange={type => this.setState({type})}
              >
              <Picker.Item label="Gold Bar" value="gold bar" />
              <Picker.Item label="Watch" value="watch" />
              <Picker.Item label="Chain" value="chain" />
              <Picker.Item label="Necklace" value="necklace" />
              <Picker.Item label="Bracelet" value="bracelet" />
              <Picker.Item label="Ring" value="ring" />
              <Picker.Item label="Other" value="other" />
              </Picker>
          </View>

          <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
            <Picker
              mode="dropdown"
              iosHeader="Item Material"
              placeholder="Item Material"
              placeholderStyle={{ color: "#c7c7cd" }}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 325 }}
              selectedValue={this.state.itemType}
              onValueChange={material => this.setState({material})}
            >
              <Picker.Item label="Gold" value="gold" />
              <Picker.Item label="Silver" value="silver" />
              <Picker.Item label="Platinum" value="platinum" />
              <Picker.Item label="Other" value="other" />

            </Picker>
          </View>
      
      <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
        <Input 
          //value={this.state.fullName}
          onChangeText={name => this.setState({ weight })}
          placeholder="Item Weight" 
        />
      </View>

      <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
      <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"SGP"}
            //timeZoneOffsetInMinutes={0}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date of purchase"
            textStyle={{ color: "black" }}
            placeHolderTextStyle={{ color: "#c7c7cd" }}
            onDateChange={DOP => this.setState({ DOP })}
            />
        </View>

        <View style={{width:300,height:50,borderBottomColor:"grey",borderBottomWidth:1,marginTop:15}}>
            <Picker
              note
              mode="dropdown"
              iosHeader="Place of Purchase"
              placeholder="Place of Purchase"
              placeholderStyle={{ color: "#c7c7cd" }}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 325 }}
              selectedValue={this.state.itemType}
              onValueChange={POP => this.setState({itemType})}
            >
              <Picker.Item label="Singapore" value="gold" />
              <Picker.Item label= "Afghanistan" value="afghanistan" />
              <Picker.Item label= "Albania" value= "albania" />
              <Picker.Item label= "Algeria" value= "algeria" />
              <Picker.Item label= "American Samoa" value= "american samoa"/>
              <Picker.Item label= "Andorra" value= "andorra"/>
              <Picker.Item label= "Angola" value= "angola"/>
              <Picker.Item label= "Anguilla" value= "anguilla"/>
              <Picker.Item label= "Antarctica" value= "antartica"/>
              <Picker.Item label= "Antigua and Barbuda" value= "antigua and barbuda" />
              <Picker.Item label= "Argentina" value= "argentina" />
              <Picker.Item label= "Armenia" value= "armenia" />
              <Picker.Item label= "Aruba" value= "aruba" />
              <Picker.Item label= "Australia" value= "australia" />
              <Picker.Item label= "Austria" value= "austria" />
<Picker.Item label= "Azerbaijan" value= "azerbaijan" />
<Picker.Item label= "Bahamas" value= "bahamas" />
<Picker.Item label= "Bahrain" value= "bahrain" />
<Picker.Item label= "Bangladesh" value= "bangladesh" />
<Picker.Item label= "Barbados" value= "barbados" />
<Picker.Item label= "Belarus" value= "belarus" />
<Picker.Item label= "Belgium" value= "belgium" />
<Picker.Item label= "Belize" value= "belize" />
<Picker.Item label= "Benin" value= "benin" />
<Picker.Item label= "Bermuda" value= "bermuda" />
<Picker.Item label= "Bhutan" value= "bhutan" />
<Picker.Item label= "Bolivia" value= "bolivia" />
<Picker.Item label= "Bosnia and Herzegovina" value= "bosnia and herzegovnia" />
<Picker.Item label= "Botswana" value= "botswana" />
<Picker.Item label= "Bouvet Island" value= "bouvet island" />
<Picker.Item label= "Brazil" value= "brazil" />
<Picker.Item label= "British Indian Ocean Territory" value= "british indian open terrirory" />
<Picker.Item label= "Brunei Darussalam" value= "brunei darussalam" />
<Picker.Item label= "Bulgaria" value= "bulgaria" />
<Picker.Item label= "Burkina Faso" value= "burkina faso" />
<Picker.Item label= "Burundi" value= "burundi" />
<Picker.Item label= "Cambodia" value= "cambodia" />
<Picker.Item label= "Cameroon" value= "cameroon" />
<Picker.Item label= "Canada" value= "canada" />
<Picker.Item label= "Cape Verde" value= "cape verde" />
<Picker.Item label= "Cayman Islands" value= "cayman islands" />
<Picker.Item label= "Central African Republic" value= "central african republic" />
<Picker.Item label= "Chad" value= "chad" />
<Picker.Item label= "Chile" value= "chile" />
<Picker.Item label= "China" value= "china" />
<Picker.Item label= "Christmas Island" value= "christmas island" />
<Picker.Item label= "Cocos (Keeling) Islands" value= "cocos islands" />
<Picker.Item label= "Colombia" value= "colombia" />
<Picker.Item label= "Comoros" value= "comoros" />
<Picker.Item label= "Congo" value= "congo" />
<Picker.Item label= "Cook Islands" value= "cook islands" />
<Picker.Item label= "Costa Rica" value= "costa rica" />
<Picker.Item label= "Cote D' Ivoire" value= "cote d ivoire" />
<Picker.Item label= "Croatia" value= "croatia" />
<Picker.Item label= "Cuba" value= "cuba" />
<Picker.Item label= "Cyprus" value= "cyprus" />
<Picker.Item label= "Czech Republic" value= "czech republic" />
<Picker.Item label= "Denmark" value= "denmark" />
<Picker.Item label= "Djibouti" value= "djinouti" />
<Picker.Item label= "Dominica" value= "dominica" />
<Picker.Item label= "Dominican Republic" value= "dominican republic" />
<Picker.Item label= "Ecuador" value= "ecuador" />
<Picker.Item label= "Egypt" value= "egypt" />
<Picker.Item label= "El Salvador" value= "el salvador" />
<Picker.Item label= "Equatorial Guinea" value= "equatorial guinea=" />
<Picker.Item label= "Eritrea" value= "eritrea" />
<Picker.Item label= "Estonia" value= "estonia" />
<Picker.Item label= "Ethiopia" value= "ethiopia" />
<Picker.Item label= "Falkland Islands (Malvinas)" value= "falklands island" />
<Picker.Item label= "Faroe Islands" value= "faroe island" />
<Picker.Item label= "Fiji" value= "fiji" />
<Picker.Item label= "Finland" value= "finland" />
<Picker.Item label= "France" value= "france" />
<Picker.Item label= "French Guiana" value= "french guiana" />
<Picker.Item label= "French Polynesia" value= "french polynesia" />
<Picker.Item label= "French Southern Territories" value= "french southern territories" />
<Picker.Item label= "Gabon" value= "gabon" />
<Picker.Item label= "Gambia" value= "gambia" />
<Picker.Item label= "Georgia" value= "georgia" />
<Picker.Item label= "Germany" value= "germany" />
<Picker.Item label= "Ghana" value= "ghana" />
<Picker.Item label= "Gibraltar" value= "gibraltar" />
<Picker.Item label= "Greece" value= "greece" />
<Picker.Item label= "Greenland" value= "greenland" />
<Picker.Item label= "Grenada" value= "grenada" />
<Picker.Item label= "Guadeloupe" value= "guadeloupe" />
<Picker.Item label= "Guam" value= "guam" />
<Picker.Item label= "Guatemala" value= "guatemala" />
<Picker.Item label= "Guinea" value= "guinea" />
<Picker.Item label= "Guinea-Bissau" value= "guinea-bissau" />
<Picker.Item label= "Guyana" value= "guyana" />
<Picker.Item label= "Haiti" value= "haiti" />
<Picker.Item label= "Heard Island and Mcdonald Islands" value= "heard island and mcdonald islands" />
<Picker.Item label= "Holy See (Vatican City State)" value= "holy see" />
<Picker.Item label= "Honduras" value= "honduras" />
<Picker.Item label= "Hong Kong" value= "hong kong" />
<Picker.Item label= "Hungary" value= "hungary" />
<Picker.Item label= "Iceland" value= "iceland" />
<Picker.Item label= "India" value= "india" />
<Picker.Item label= "Indonesia" value= "indonesia" />
<Picker.Item label= "Iran" value= "iran" />
<Picker.Item label= "Iraq" value= "iraq" />
<Picker.Item label= "Ireland" value= "ireland" />
<Picker.Item label= "Israel" value= "israel" />
<Picker.Item label= "Italy" value= "italy" />
<Picker.Item label= "Jamaica" value= "jamaica" />
<Picker.Item label= "Japan" value= "japan" />
<Picker.Item label= "Jordan" value= "jordan" />
<Picker.Item label= "Kazakhstan" value= "kazakhstan" />
<Picker.Item label= "Kenya" value= "kenya" />
<Picker.Item label= "Kiribati" value= "kiribati" />
<Picker.Item label= "North Korea" value = "north korea" />
<Picker.Item label= "South Korea" value= "south korea" />
<Picker.Item label= "Kuwait" value= "kuwait" />
<Picker.Item label= "Kyrgyzstan" value= "kyrgyztan" />
<Picker.Item label= "Laos" value= "laos" />
<Picker.Item label= "Latvia" value= "latvia" />
<Picker.Item label= "Lebanon" value= "lebanon" />
<Picker.Item label= "Lesotho" value= "lesotho" />
<Picker.Item label= "Liberia" value= "liberia" />
<Picker.Item label= "Libyan Arab Jamahiriya" value= "libya" />
<Picker.Item label= "Liechtenstein" value= "liechtenstein" />
<Picker.Item label= "Lithuania" value= "lithuania" />
<Picker.Item label= "Luxembourg" value= "luxembourg" />
<Picker.Item label= "Macao" value= "macao" />
<Picker.Item label= "Macedonia" value= "macedonia" />
<Picker.Item label= "Madagascar" value= "madagascar" />
<Picker.Item label= "Malawi" value= "malawi" />
<Picker.Item label= "Malaysia" value= "malaysia" />
<Picker.Item label= "Maldives" value= "maldives" />
<Picker.Item label= "Mali" value= "mali" />
<Picker.Item label= "Malta" value= "malta" />
<Picker.Item label= "Marshall Islands" value= "marshall islands" />
<Picker.Item label= "Martinique" value= "martinique" />
<Picker.Item label= "Mauritania" value= "maurintania" />
<Picker.Item label= "Mauritius" value= "mauritius" />
<Picker.Item label= "Mayotte" value= "mayotte" />
<Picker.Item label= "Mexico" value= "mexico" />
<Picker.Item label= "Micronesia" value= "micronesia" />
<Picker.Item label= "Moldova" value= "moldova" />
<Picker.Item label= "Monaco" value= "monaco" />
<Picker.Item label= "Mongolia" value= "mongolia" />
<Picker.Item label= "Montserrat" value= "montserrat" />
<Picker.Item label= "Morocco" value= "morocco" />
<Picker.Item label= "Mozambique" value= "mozambique" />
<Picker.Item label= "Myanmar" value= "myanmar" />
<Picker.Item label= "Namibia" value= "namibia" />
<Picker.Item label= "Nauru" value= "nauru" />
<Picker.Item label= "Nepal" value= "nepal" />
<Picker.Item label= "Netherlands" value= "netherlands" />
<Picker.Item label= "Netherlands Antilles" value= "netherlands antilles"/>
<Picker.Item label= "New Caledonia" value= "new caledonia" />
<Picker.Item label= "New Zealand" value= "new zealand" />
<Picker.Item label= "Nicaragua" value= "nicaragua" />
<Picker.Item label= "Niger" value= "niger" />
<Picker.Item label= "Nigeria" value= "nigeria" />
<Picker.Item label= "Niue" value= "niue" />
<Picker.Item label= "Norfolk Island" value= "norfolk island" />
<Picker.Item label= "Northern Mariana Islands" value= "northern mariana islands" />
<Picker.Item label= "Norway" value= "norway" />
<Picker.Item label= "Oman" value= "oman" />
<Picker.Item label= "Pakistan" value= "pakistan" />
<Picker.Item label= "Palau" value= "palau" />
<Picker.Item label= "Panama" value= "panama" />
<Picker.Item label= "Papua New Guinea" value= "papua new guinea" />
<Picker.Item label= "Paraguay" value= "paraguay" />
<Picker.Item label= "Peru" value= "peru" />
<Picker.Item label= "Philippines" value= "philippines" />
<Picker.Item label= "Pitcairn" value= "pitcairn" />
<Picker.Item label= "Poland" value= "poland" />
<Picker.Item label= "Portugal" value= "portugal" />
<Picker.Item label= "Puerto Rico" value= "puerto rico" />
<Picker.Item label= "Qatar" value= "qatar" />
<Picker.Item label= "Reunion" value= "reunion" />
<Picker.Item label= "Romania" value= "romania" />
<Picker.Item label= "Russian Federation" value= "russian federation" />
<Picker.Item label= "Rwanda" value= "rwanda" />
<Picker.Item label= "Saint Helena" value= "saint helena" />
<Picker.Item label= "Saint Kitts and Nevis" value= "saint kitts and nevis" />
<Picker.Item label= "Saint Lucia" value= "saint lucia" />
<Picker.Item label= "Saint Pierre and Miquelon" value= "saint pierre and miquelon" />
<Picker.Item label= "Saint Vincent and the Grenadines" value= "saint vincent and the grenadines"/>
<Picker.Item label= "Samoa" value= "samoa" />
<Picker.Item label= "San Marino" value= "san marino" />
<Picker.Item label= "Sao Tome and Principe" value= "sao tome and principe" />
<Picker.Item label= "Saudi Arabia" value= "saudi arabia" />
<Picker.Item label= "Senegal" value= "senegal" />
<Picker.Item label= "Serbia and Montenegro" value= "serbia and montenegro" />
<Picker.Item label= "Seychelles" value= "seychelles" />
<Picker.Item label= "Sierra Leone" value= "sierra leone"/>
<Picker.Item label= "Slovakia" value= "slovakia" />
<Picker.Item label= "Slovenia" value= "slovenia" />
<Picker.Item label= "Solomon Islands" value= "solomon islands" />
<Picker.Item label= "Somalia" value= "somalia" />
<Picker.Item label= "South Africa" value= "south africa" />
<Picker.Item label= "South Georgia and the South Sandwich Islands" value= "south georgia and the south sandwich islands" />
<Picker.Item label= "Spain" value= "spain" />
<Picker.Item label= "Sri Lanka" value= "sri lanka" />
<Picker.Item label= "Sudan" value= "sudan" />
<Picker.Item label= "Suriname" value= "suriname" />
<Picker.Item label= "Svalbard and Jan Mayen" value= "svalbard and jan mayen" />
<Picker.Item label= "Swaziland" value= "swaziland" />
<Picker.Item label= "Sweden" value= "sweden" />
<Picker.Item label= "Switzerland" value= "switzerland" />
<Picker.Item label= "Syrian Arab Republic" value= "syrian arab republic" />
<Picker.Item label= "Taiwan" value= "taiwan" />
<Picker.Item label= "Tajikistan" value= "tajikistan"/>
<Picker.Item label= "Tanzania" value= "tanzania" />
<Picker.Item label= "Thailand" value= "thailand" />
<Picker.Item label= "Timor-Leste" value= "timor-leste" />
<Picker.Item label= "Togo" value= "togo" />
<Picker.Item label= "Tokelau" value= "tokelau" />
<Picker.Item label= "Tonga" value= "tonga" />
<Picker.Item label= "Trinidad and Tobago" value= "trinidad and tobago" />
<Picker.Item label= "Tunisia" value= "tunisia" />
<Picker.Item label= "Turkey" value= "turkey" />
<Picker.Item label= "Turkmenistan" value= "turkmenistan" />
<Picker.Item label= "Turks and Caicos Islands" value= "turks and caicos islands" />
<Picker.Item label= "Tuvalu" value= "tuvalu" />
<Picker.Item label= "Uganda" value= "uganda" />
<Picker.Item label= "Ukraine" value= "ukraine" />
<Picker.Item label= "United Arab Emirates" value= "united arab emirates" />
<Picker.Item label= "United Kingdom" value= "united kingdom" />
<Picker.Item label= "United States" value= "united states" />
<Picker.Item label= "United States Minor Outlying Islands" value= "united states minor outlying islands" />
<Picker.Item label= "Uruguay" value= "uruguay" />
<Picker.Item label= "Uzbekistan" value= "uzbekistan" />
<Picker.Item label= "Vanuatu" value= "vanuatu" />
<Picker.Item label= "Venezuela" value= "venezuela" />
<Picker.Item label= "Vietnam" value= "vietnam" />
<Picker.Item label= "Virgin Islands" value= "virgin islands"/>
<Picker.Item label= "Wallis and Futuna" value= "wallis and futuna" />
<Picker.Item label= "Western Sahara" value= "western sahara" />
<Picker.Item label= "Yemen" value= "yemen" />
<Picker.Item label= "Zambia" value= "zambia" />
<Picker.Item label= "Zimbabwe" value= "zimbabwe" />

            </Picker>
          </View>

        <Button
          title="Submit"
          color="white"
          backgroundColor="#ff0000"
         // onPress={() => this.submit()}
          //onPress={() => this.props.navigation.navigate("Home")}
          onPress={() => console.log(this.state)}
          containerViewStyle={{marginTop:30,marginBottom:30}}      
        />
    </View>
    );
  }
}

export default PawnScreen;
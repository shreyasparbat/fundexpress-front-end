import React, { Component } from "react";
import { Icon, Picker, DatePicker } from "native-base";
import {View, Text,} from 'react-native';
import { Avatar , Button } from 'react-native-elements';
import { Input } from '../components/input';

class PawnScreen extends Component {
  state = {selected: '', chosenDate: ''}
  static navigationOptions = {
    title: 'Pawn New Item',
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Item Image </Text>
        <View style={{flexDirection: 'row'}}>
          <Avatar 
            large
            icon={{name: 'camera', color: 'grey'}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar 
            large
            icon={{name: 'camera', color: 'grey'}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar 
            large
            icon={{name: 'camera', color: 'grey'}}
            containerStyle={{marginLeft: 15}}
          />

          <Avatar 
            large
            icon={{name: 'camera', color: 'grey'}}
            containerStyle={{marginLeft: 15}}
          />
        </View>
        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
          <Input 
            //value={this.state.fullName}
            //onChangeText={fullName => this.setState({ fullName })}
            placeholder="Item Name" 
          />
        </View>
        <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:15}}>
            <Picker
              note
              mode="dropdown"
              //iosHeader="Select your SIM"
              placeholder='Item Type'
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: 325 }}
              selectedValue={this.state.selected}
              onValueChange={selected => this.setState({selected})}
            >
              <Picker.Item label="Item Type" value="key1" />
              <Picker.Item label="Gold Bar" value="key2" />
              <Picker.Item label="Watch" value="key3" />
              <Picker.Item label="Chain" value="key4" />
              <Picker.Item label="Necklace" value="key5" />
              <Picker.Item label="Bracelet" value="key6" />
              <Picker.Item label="Ring" value="key7" />
              <Picker.Item label="Other" value="key8" />

            </Picker>
          </View>
      <View style={{width:300,height:50,borderBottomColor:'grey',borderBottomWidth:1,marginTop:0}}>
      <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date of purchase"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={chosenDate => this.setState({ chosenDate })}
            />
        </View>
        <Button
          title='Submit'
          color='white'
          backgroundColor='#ff0000'
         // onPress={() => this.submit()}
          //onPress={() => this.props.navigation.navigate('Home')}
          onPress={console.log(this.state)}
          containerViewStyle={{marginTop:30,marginBottom:30}}      
        />
    </View>
    );
  }
}

export default PawnScreen;
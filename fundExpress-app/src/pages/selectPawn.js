import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, AsyncStorage} from 'react-native';
import { FormLabel, Button, Card } from 'react-native-elements';
import { Picker, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PawnScreen from './pawn';
import AwesomeAlert from 'react-native-awesome-alerts';

class selectPawn extends React.Component {
    static navigationOptions = {
    title: "Pawn/Sell Item",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "black",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "black"
      },
  }

  state = {type:'', showAlert:false}

  go(){
    if(this.state.type==''){
      this.setState({
        showAlert:true
      })
    }else{
      // console.log('select->upload: ' + this.state.type)
      this.storeData('type', this.state.type)
      this.props.navigation.navigate('upload', {'type':this.state.type})
    }
  }

  storeData = async (key, item) => {
    try{
      await AsyncStorage.setItem(key, item);
    } catch (error) {
      // console.log(error)
    }
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'white', justifyContent:'center'}}>
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
      <FormLabel labelStyle={{fontSize:15}}>What will you be Pawning today?</FormLabel>
            <Picker
                mode="dropdown"
                iosHeader="Select item type"
                placeholder='Item Type'
                placeholderStyle={{ color: "#c7c7cd" }}
                iosIcon={<Icon type='FontAwesome' name="angle-down" />}
                style={{ height: 40, width: (Dimensions.get('screen').width)*0.9}}
                textStyle = {{ color: 'black' }}
                selectedValue={this.state.type}
                onValueChange={type => this.setState({type})}
              >
                <Picker.Item label="Item Type" value='' />
                <Picker.Item label="Gold Bar" value="Gold Bar" />
                <Picker.Item label="Gold Coin" value="Gold Coin" />
                <Picker.Item label="Silver Bar" value="Silver Bar" />
                <Picker.Item label="Silver Coin" value="Silver Coin" />
                {/* <Picker.Item label="Watch" value="Watch" /> */}
                <Picker.Item label="Jewellery" value="Jewel" />
                {/* <Picker.Item label="Others" value="Others" /> */}
            </Picker>


            <Button
          title='Take Picture'
          color='white'
          backgroundColor='#C00000'
          onPress={() => this.go()}
          containerViewStyle={{marginTop:30,marginBottom:30}}
        />
        {/* <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('upload', { type: 'Gold Bar' })}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Gold Bar
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('upload', { type: 'Watch' })}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Watch
            </Text>
        </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row', marginTop: 7}}>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('upload', {type: 'Jewel'})}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Jewellery
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('upload', {type: 'Others'})}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Others
            </Text>
        </TouchableOpacity>
       </View> */}
      <AwesomeAlert
          show= {this.state.showAlert}
          title="Pawn Error!"
          message="Please select an Item Type!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          confirmButtonColor="#C00000"
          confirmText="Close"
          onConfirmPressed={() => {
            this.setState({
              showAlert:false
            })
            ;
          }}
        />
      </View>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    justifyContent:'center',
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 35,
    //fontFamily: 'sans'
  },
  buttonStyle: {
      width: 105,
      height: 105,
      alignSelf: 'center',
      backgroundColor: '#ededed',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 6,
      marginRight: 2,
      //marginTop: 20
  }
};

export default selectPawn;

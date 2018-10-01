import React from 'react';
import { AsyncStorage, Text, View, Image, TouchableOpacity, Platform, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';
//import { getGoldSilverPrice } from '../utils/priceScrapper';
//import { Container,  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
    header: null,
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-home'} size={25}
        color={'white'} />;
      },
  };

  handleBackButton(){
    return true;
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:0.14, alignSelf: 'center', justifyContent: 'center', marginTop: 50}}>
          <Image
            source={require('../images/felogo.png')}
            style={{ resizeMode: 'contain', width: 200 }}
          />
          
        </View>
        {/* <View style={{flex:0.06, alignSelf: 'center', marginTop: 5 }}>
        <Text
          style={{ textAlignVertical: 'bottom', fontSize: 25,
          fontWeight: 'bold', color: 'black', flex: 1, alignSelf: 'center', height: 150
          }}
          >Welcome </Text>
        </View> */}
        <Card
        containerStyle={{flex: 0.12, marginBottom: 10, marginTop: 5, backgroundColor: '#ededed'}}
        title= 'Gold & Silver Prices'
      />
      <View style={{flex: 0.4, marginTop: 10, alignSelf: 'center', }}>
        <View style={{ flexDirection: 'row',marginLeft: 58 }}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('select')}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Pawn/Sell
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-add-circle'} size={50}
              color={'#C00000'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('renew')}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Renew
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-refresh-circle'} size={50}
              color={'#C00000'} />
            </View>
          </TouchableOpacity>

        {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('sell')}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              My Tickets
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-document'} size={50}
              color={'#C00000'} />
            </View>
        </TouchableOpacity> */}
        </View>
        <View style={{ flexDirection: 'row', marginTop: 7}}>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('buy')}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Buy
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-cart'} size={50}
              color={'#C00000'} />
            </View>
        </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('redeem')}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Redeem
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-cash'} size={50}
              color={'#C00000'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('faq')}
            activeOpacity= {0.8}
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              FAQ
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-help-circle'} size={50}
              color={'#C00000'} />
            </View>
        </TouchableOpacity>
       </View>
      </View>
      
    </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
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
export default HomeScreen;

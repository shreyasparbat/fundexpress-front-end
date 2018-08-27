import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerLeft: null,
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-home'} size={25} 
        color={'white'} />;
      },
  };
  
  render() {
    return (
      <View style={{flex: 1}}>
       <View style={{ flex: 0.4,}}>
       <Text 
       style={{ textAlignVertical: 'bottom', fontSize: 25, 
       fontWeight: 'bold', color: 'black', flex: 1, alignSelf: 'center'
       }} 
        >Fund Express Services</Text>
       </View>
      
      <View style={{ flex: 1}}>
        <View style={{ flex: 0.4, flexDirection: 'row', }}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Pawn
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-add-circle'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Buy
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-cart'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Sell
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'logo-usd'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>
        </View>
        <View style={{ flex: 0.3, flexDirection: 'row', }}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Renew
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-refresh-circle'} size={50} 
              color={'#ff0000'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('History')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Redeem
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-cash'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('History')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              FAQ
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-help-circle'} size={50} 
              color={'#ff0000'} />
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
    paddingBottom: 10
  },
  buttonStyle: {
      width: 125,
      height: 125,
      alignSelf: 'center',
      backgroundColor: '#c9c9c9',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 8,
      marginRight: 2,
      //marginTop: 20
  }
};
export default HomeScreen;

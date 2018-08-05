import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-elements';
import PawnScreen from './pawn';

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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:0.14, alignSelf: 'center', justifyContent: 'center', marginTop: 20}}>
          <Image
            source={require('../images/felogo.png')}
            style={{ resizeMode: 'contain', width: 200 }}
          />
        </View>
        <View style={{flex:0.06, alignSelf: 'center', marginTop: 5 }}>
        <Text 
          style={{ textAlignVertical: 'bottom', fontSize: 25, 
          fontWeight: 'bold', color: 'black', flex: 1, alignSelf: 'center', height: 80
          }} 
          >Welcome {this.props.navigation.getParam('email')} </Text>
        </View>
      <View style={{flex: 0.4, marginTop: 25, alignSelf: 'center'}}>
        <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn')}
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
        <View style={{ flexDirection: 'row', marginTop: 7}}>
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
      <Card 
        containerStyle={{flex: 0.4, marginBottom: 10, marginTop: 70, backgroundColor: '#ededed'}}
        title= 'Gold & Silver Prices'
      />
    </View>
    );
  }
}

const HomeStack = createStackNavigator({
  mainFlow : {
    screen: createStackNavigator({
      home: { screen: HomeScreen },
      pawn: { screen: PawnScreen },
    }),
  },
})

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

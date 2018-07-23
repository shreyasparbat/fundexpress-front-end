import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import ProfileScreen from './profile';
import HistoryScreen from './history';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 0.7,alignItems: 'center',
       justifyContent: 'center',}}>
       <View style={{ flex: 0.2, alignItems: 'center',
       justifyContent: 'center',}}>
       <Text>Fund Express Services</Text>
       </View>
      
      <View style={{ flex: 0.8, alignItems: 'center',
       justifyContent: 'center', flexDirection: 'column' }}>
        <View style={{ flex: 0.7, alignItems: 'center',
       justifyContent: 'center', flexDirection: 'row' }}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Pawn
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Buy
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Renew
            </Text>
        </TouchableOpacity>
        </View>
        <View style={{ flex: 0.3, alignItems: 'center',
       justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Redeem
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              FAQ
            </Text>
        </TouchableOpacity>
       </View>
      </View>
      </View>
    );
  }
}

const Home = createBottomTabNavigator(
  {
  Profile: ProfileScreen,
  Home: HomeScreen,
  History: HistoryScreen,
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      fontWeight: 'bold',
      style: {
        backgroundColor: '#ff0000',
      }
    }
  },
);

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      backgroundColor: '#ff0000',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ff0000',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 20
  }
};
export default Home;

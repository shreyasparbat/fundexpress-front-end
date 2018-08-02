import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-time'} size={25} 
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
        >History</Text>
       </View>
       <View style={{ flex: 0.4, flexDirection: 'row', }}>
       <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Currently Pawned Items 
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-pricetags'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Previously Pawned Items
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-calendar'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Home')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Sold Items
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'logo-usd'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>
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
    justifyContent: 'center',
    
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


export default HistoryScreen;
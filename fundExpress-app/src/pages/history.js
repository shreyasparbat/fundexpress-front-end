import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {Tab, Tabs, TabHeading, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryCurrentScreen from './historyCurrent';
import HistoryPreviousScreen from './historyPrevious';
import HistorySoldScreen from './historySold';

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'My Tickets',
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicons name={'md-document'} size={25} 
        color={'white'} />;
      },
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
       {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
       <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('current')}
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
            onPress={() => this.props.navigation.navigate('previous')}
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
            onPress={() => this.props.navigation.navigate('sold')}
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
       </View> */}

       <Tabs>
          <Tab  heading={ <TabHeading style={styles.container}><Icon name='md-pricetags'/><Text>Current</Text></TabHeading>}
          >
            <HistoryCurrentScreen />
          </Tab>

          <Tab  heading={ <TabHeading style={styles.container}><Icon name='md-calendar'/><Text>Previous</Text></TabHeading>}>
            <HistoryPreviousScreen />
          </Tab>
          
        </Tabs>

      </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    
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


export default HistoryScreen;
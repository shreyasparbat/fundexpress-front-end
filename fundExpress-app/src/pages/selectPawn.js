import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';

class selectPawn extends React.Component {
    static navigationOptions = {
    title: "Pawn Item",
      headerStyle: {
        backgroundColor: "#ff0000", 
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>What will you be Pawning today?</Text>
        <View style={{flex: 0.4, marginTop: 25, alignSelf: 'center'}}>
        <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn', { type: 'bar' })}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Gold Bar
            </Text>
            {/* <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-add-circle'} size={50} 
              color={'#ff0000'} />
            </View> */}
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn', { type: 'watch' })}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Watch
            </Text>
            {/* <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-add-circle'} size={50} 
              color={'#ff0000'} />
            </View> */}
        </TouchableOpacity>
        {/* <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Chain
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-refresh-circle'} size={50} 
              color={'#ff0000'} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              etc
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-document'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity> */}
        
        </View>
        <View style={{ flexDirection: 'row', marginTop: 7}}>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn', {type: 'jewel'})}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Jewellery
            </Text>
            {/* <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-cart'} size={50} 
              color={'#ff0000'} />
            </View> */}
        </TouchableOpacity>
          {/* <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Bracelet
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-cash'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn')}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Ring
            </Text>
            <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-help-circle'} size={50} 
              color={'#ff0000'} />
            </View>
        </TouchableOpacity> */}
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('pawn', {type: 'others'})}
            activeOpacity= {0.8}  
            style={styles.buttonStyle}
          >
            <Text style={styles.textStyle}>
              Others
            </Text>
            {/* <View style={{alignSelf: 'center'}}>
              <Ionicons name={'md-document'} size={50} 
              color={'#ff0000'} />
            </View> */}
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

export default selectPawn;
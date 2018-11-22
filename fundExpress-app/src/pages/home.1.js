import React from 'react';
import { AsyncStorage, Text, View, Image, TouchableOpacity, Platform, BackHandler } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import url from '../configs/config';
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

  state ={ gold: '', silver: '', platinum: ''}

  retrievePrices(){
    this.setState({
      gold:'',
      silver:'',
      platinum:''
    })
    // console.log("retrieve prices")
    fetch(url.url + 'home/getPrices', {
      method: 'GET',
      // headers: '',
      // body: '',
      // //   auth : token
      // // })
    })
      .then((response) => {
        return response.json()
      })
      .then((res) => {
        this.setState({
          gold: Math.round(res.gold),
          silver: this.roundSilver(res.silver),
          platinum: Math.round(res.platinum)
        })
      })
      .catch((errorResponse) => {
        // console.log("error with getPrices")
        // console.log(errorResponse)
      })
    }

  roundSilver(silver){
    if(silver<1){
      return silver.toFixed(2)
    }else{
      return Math.round(silver)
    }
  }

  handleBackButton(){
    return true;
  }

  componentWillMount(){
    
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    
  }

  componentDidMount(){
    this.retrievePrices();
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
        <View
        style={{flex: 0.12, marginBottom: 10, marginTop: 15, height:20, justifyContent:'center', alignItems:'center'}}
        >
        <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <View style={{flexDirection:'row',}}>
          <Text style={{color:"#C5B358", fontWeight:'bold'}}>
            Gold 
          </Text>
          <Text>
            :SGD 
          </Text>
          <Text style={{fontWeight:'bold', marginLeft:3}}>
            {this.state.gold}
          </Text>
          <Text>
            /g
          </Text>

          <Text style={{marginLeft:8, color:"#C0C0C0", fontWeight:'bold'}}>
            Silver 
          </Text>
          <Text>
            :SGD 
          </Text>
          <Text style={{fontWeight:'bold', marginLeft:3}}>
            {this.state.silver}
          </Text>
          <Text>
            /g
          </Text>

          

          <Ionicons name={'md-sync'} size={20} style={{marginLeft:12}}
              color={'black'} onPress={() => this.retrievePrices()}/>

          
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Text style={{marginLeft:8, color:"#e5e4e2", fontWeight:'bold'}}>
            Platinum
          </Text>
          <Text>
            :SGD 
          </Text>
          <Text style={{fontWeight:'bold', marginLeft:3}}>
            {this.state.platinum}
          </Text>
          <Text>
            /g
          </Text>
        </View>
        
        </View>
        
        
        </View>
      <View style={{flex: 0.4, marginTop: 30, alignSelf: 'center', }}>
        <View style={{ flexDirection: 'row', justifyContent:"center" }}>

            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Icon
              raised
              name='md-add-circle'
              type='ionicon'
              color='#C00000'
              containerStyle={{justifyContent:'center', alignItems:"center"}}
              size={35}
              onPress={() => this.props.navigation.navigate('select')}
              />
            <Text style={styles.textStyle}>
              Pawn/Sell
            </Text>
            </View>
            
            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Icon
              raised
              name='md-refresh-circle'
              type='ionicon'
              color='#C00000'
              containerStyle={{justifyContent:'center', alignItems:"center"}}
              size={35}
              onPress={() => this.props.navigation.navigate('renew')}
              />
            <Text style={styles.textStyle}>
              Renew
            </Text>
            </View>

            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Icon
              raised
              name='md-cart'
              type='ionicon'
              color='#C00000'
              containerStyle={{justifyContent:'center', alignItems:"center"}}
              size={35}
              onPress={() => this.props.navigation.navigate('buy')}
              />
            <Text style={styles.textStyle}>
              Buy
            </Text>
            </View>

        </View>
        <View style={{ flexDirection: 'row', marginTop: 7, justifyContent:'center'}}>

            

            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Icon
              raised
              name='md-cash'
              type='ionicon'
              color='#C00000'
              containerStyle={{justifyContent:'center', alignItems:"center"}}
              size={35}
              onPress={() => this.props.navigation.navigate('redeem')}
              />
            <Text style={styles.textStyle}>
              Redeem
            </Text>
            </View>

            <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Icon
              raised
              name='md-help-circle'
              type='ionicon'
              color='#C00000'
              containerStyle={{justifyContent:'center', alignItems:"center"}}
              size={35}
              onPress={() => this.props.navigation.navigate('faq')}
              />
            <Text style={styles.textStyle}>
              FAQ
            </Text>
            </View>

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
    fontSize: 11,
    fontWeight: 'bold',
    // paddingTop: 10,
    // paddingBottom: 10,
    //fontFamily: 'sans'
  },
  buttonStyle: {
      width: 105,
      height: 105,
      alignSelf: 'center',
      backgroundColor: '#e8e8e8',
      borderRadius: 60,
      borderWidth: 1,
      borderColor: 'transparent',
      marginLeft: 6,
      marginRight: 2,
      //marginTop: 20
  }
};
export default HomeScreen;

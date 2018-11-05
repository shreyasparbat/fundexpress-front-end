import React from 'react';
import { StyleSheet, Text, View, NetInfo, Image, ActivityIndicator } from 'react-native';
import RootStack from './src/pages/login';



export default class App extends React.Component {

  state= { isConnected: true };
  
  handleConnectivityChange(isConnected) {
    this.setState({ isConnected });
  };

  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', 
    this.handleConnectivityChange.bind(this));
  }

  componentWillUnmount(){
    NetInfo.isConnected.removeEventListener('connectionChange',
    this.handleConnectivityChange.bind(this));
  }

  render() {
    if(this.state.isConnected==false){
      return (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
          {/* <Image
          source={require('./src/images/fesplash.png')}
          style={{ resizeMode: 'contain', width: 200, height: 200}}
          /> */}
          <ActivityIndicator />
          <Text style={{marginTop: 20}}>No Internet Connection</Text>
        </View>
        
      )
    }else{
       return <RootStack />;
    }
     
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

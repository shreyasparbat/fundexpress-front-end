import React from 'react';
import {View, Text} from 'react-native';
import { Button } from 'react-native-elements';

class PawnTicket extends React.Component {
  state = {name: ", type: ", material:", DOP: ", POP: ", image: ", weight: '', LTV: ''}
  static navigationOptions = {
    title: "Pawn New Item",
      headerStyle: {
        backgroundColor: "#ff0000", 
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff"
      },
  }

  retrieveData = async () => {
    try{
      const value = await AsyncStorage.getItem('item');
      return value;
    } catch (error) {
      console.log(error)
    }
  }

  componentWillMount() {
    // this.retrieveData().then((item) => {
    //   this.setState({
    //     name : item.name,
    //     type: item.type,
    //     material: item.material,
    //     DOP: item.DOP,
    //     POP: item.POP,
    //     weight: item.weight
    //   })
      
    // })
    // this.setState({
    //   name:this.props.getParam('name', 'no name'),
    //   type:this.props.getParam('type', 'no type'),
    //   material:this.props.getParam('material','no material'),
    //   DOP:this.props.getParam('DOP', 'no DOP'),
    //   POP: this.props.getParam('POP', 'no POP'),
    //   weight: this.props.getParam('weight', 'no weight')
    // })
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Proposed Loan To Value: $xxxx.xx</Text>
        <View 
          style={{ justifyContent: 'center', alignItems: 'center', 
          marginTop: 130, flexDirection: 'row' }}>
          <Button
              title='Pawn'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#ff0000'
              onPress={() => this.props.navigation.navigate('propose')}
            />
          <Button
              title='Sell'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#ff0000'
              onPress={() => this.props.navigation.navigate('sell')}
            />
            <Button
              title='Reject'
              color='white'
              borderRadius= {3}
              containerViewStyle={{height: 100, width: 80,}}
              backgroundColor='#ff0000'
              onPress={() => this.props.navigation.navigate('main')}
            />
        </View>
      </View>
    );
  }
}

export default PawnTicket;
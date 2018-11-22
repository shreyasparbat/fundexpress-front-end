import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import ContactUsForm from './ContactUsForm';
import ContactUsScreen from './ContactUs';

export default class InformationScreen extends Component{
  static navigationOptions = {
    title: "Contact Us",
    header:null,
      headerStyle: {
        backgroundColor: "white",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white"
      },
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
        <Tabs style={{marginTop:25}} tabBarUnderlineStyle={{backgroundColor:'#C00000'}} >
          <Tab heading={ <TabHeading style={{backgroundColor:'white',borderColor:'white'}} ><Icon name='md-help-circle' style={{color:'black'}}/><Text style={{color:'black'}}>Our Pawnshops</Text></TabHeading> }>
            <ContactUsScreen />
          </Tab>
          <Tab  heading={ <TabHeading style={{backgroundColor:'white',borderColor:'white'}}><Icon type='FontAwesome' name='phone'  style={{color:'black'}}/><Text style={{color:'black'}}>Contact us!</Text></TabHeading>}>
            <ContactUsForm />
          </Tab>
        </Tabs>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a9a9a9',
    color:'#ffffff',
  },
});

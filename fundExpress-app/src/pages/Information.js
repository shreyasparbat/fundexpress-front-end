import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import ContactUsForm from './ContactUsForm';
import ContactUsScreen from './ContactUs';

export default class InformationScreen extends Component{
  static navigationOptions = {
    title: "Information",
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
      <Container >

        <Tabs>
          <Tab heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}} ><Icon name='md-help-circle' style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}>Our Pawnshops</Text></TabHeading>}  >
            <ContactUsScreen />
          </Tab>
          <Tab  heading={ <TabHeading style={{backgroundColor:'#696969',borderColor:'#ffffff'}}><Icon name='call'  style={{color:'#ffffff'}}/><Text style={{color:'#ffffff'}}>Contact us!</Text></TabHeading>} activeTabStyle={{borderBottomColor:'#ffffff'}}>
            <ContactUsForm />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a9a9a9',
    color:'#ffffff',
  },
});

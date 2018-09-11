import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, } from 'native-base';
import FAQScreen from './faq';
import ContactUsScreen from './ContactUs';

export default class InformationScreen extends Component{
  static navigationOptions = {
    title: "Contact Us",
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
        <Tabs>
          <Tab  heading={ <TabHeading style={styles.container}><Icon name='md-help-circle'/><Text></Text></TabHeading>}
          >
            <FAQScreen />
          </Tab>
          <Tab  heading={ <TabHeading style={styles.container}><Icon name='call'/><Text>Contact us!</Text></TabHeading>}>
            <ContactUsScreen />
          </Tab>
        </Tabs>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff0000',

  },
});

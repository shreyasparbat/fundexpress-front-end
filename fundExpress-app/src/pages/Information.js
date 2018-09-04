import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import FAQScreen from './faq';
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
      <Container>

        <Tabs >
          <Tab  heading={ <TabHeading style={styles.container}><Icon name='md-help-circle'/><Text>FAQ</Text></TabHeading>}>
            <FAQScreen />
          </Tab>
          <Tab  heading={ <TabHeading style={styles.container}><Icon name='call'/><Text>Contact us!</Text></TabHeading>}>
            <ContactUsScreen />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a9a9a9',
  },
});

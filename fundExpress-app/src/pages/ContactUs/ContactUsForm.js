import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Linking, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Container, Content, Input, Item, Label, Textarea, Picker, Form, Icon} from 'native-base';
import { Button, FormLabel } from 'react-native-elements';
import email from 'react-native-email';

export default class ContactUsForm extends Component {
  //setting the state to contain empty fields of the form
  state = {
    name: '',
    email: '',
    contactNumber: '',
    subject: '',
    enquiry:'',
    error: '',
    loading: false
  };

  //this method will render the button
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={{width: 300, marginTop: 30}} >
        <Button
          title='Submit'
          color='white'
          backgroundColor='#696969'
          onPress={this.handleEmail}

          //onPress={() => this.onButtonPress()}
        />
      </View>
    );
  }
  submitForm() {
    //if else to determine whether a form gets submitted
  }
  handleEmail = () => {
      const to = ['fundexpressfyp@gmail.com']// string or array of email addresses
      email(to, {
          // Optional additional arguments
          cc: '' , // string or array of email addresses
          bcc: '', // string or array of email addresses
          subject: this.state.subject,
          body: this.state.enquiry
      }).catch(error) //console.error
  }
  render(){
      return (
        /*start of Form*/
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Content padder>
          <Text style={{textAlign:'center', fontSize: 20, fontWeight:'bold'}}> Do you have other enquiries? </Text>
          <Text style={{textAlign:'center', fontSize: 14}}> Fill out the form below and we will get back to you within 5 working days! </Text>
            <Form>
              <View>
                  <Item stackedLabel>
                    <Label>Name</Label>
                    <Input onChangeText={name => this.setState({ name })} returnKeyType='done' placeholder='John Tan'/>
                  </Item>
                  
                  <Item stackedLabel>
                    <Label>Email</Label>
                    <Input onChangeText={email => this.setState({ email })} returnKeyType='done' placeholder='john@example.com'/>

                  </Item>
                  <Item stackedLabel>
                    <Label>Contact Number</Label>
                    <Input onChangeText={contactNumber => this.setState({ contactNumber })} returnKeyType='done' placeholder='8123 4567'/>
                  </Item>

                  {/* <Item stackedLabel>
                    <Label>Subject</Label>
                    <Input onChangeText={subject => this.setState({ subject })} placeholder='Subject'/>
                  </Item> */}

                  <Item stackedLabel>
                    <Label>Your Enquiry</Label>
                    <Input onChangeText={enquiry => this.setState({ enquiry })} returnKeyType='done' placeholder='Your Enquiry Here'/>
                  </Item>

                  {/* <Textarea
                    bordered
                    rowSpan={5}
                    style={{padding:10}}
                    onChangeText={enquiry => this.setState({ enquiry })}
                    placeholder="Your enquiry"
                  /> */}

              </View>
              <View style={{padding:5}}>
                <Button
                  title='Submit'
                  backgroundColor='#C00000'
                  onPress={() => Linking.openURL(
                    'mailto:fundexpressfyp@gmail.com?subject='+this.state.subject+'&body=Name: ' + this.state.name + '\r\n Contact Number: ' + this.state.contactNumber + '\r\n Reply to: ' + this.state.email +'\r\n \r\n'+ this.state.enquiry
                  )}
                />
              </View>
            </Form>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
      );
    }

}

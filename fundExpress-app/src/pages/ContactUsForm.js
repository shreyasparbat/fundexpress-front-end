import React, {Component} from 'react';
import {View, Text } from 'react-native';
import {Container, Content, Input, Item, Label, Textarea, Form} from 'native-base';

export default class ContactUsForm extends Component {
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={{width: 300, marginTop: 30}} >
        <Button
          title='Submit'
          color='white'
          backgroundColor='#ff0000'
          onPress={() => this.props.navigation.navigate('ContactUs')}

          //onPress={() => this.onButtonPress()}
        />
      </View>
    );
  }
  submitForm() {
    if(this.state.email===this.props.navigation.getParam('email', '1') && this.state.password===this.props.navigation.getParam('password', '1')){
      this.setState( {error: '', loading: false });
      this.props.navigation.navigate('ContactUs',
      {
        email: this.props.navigation.getParam('email', ''),
        password: this.props.navigation.getParam('password',''),
        fullName: this.props.navigation.getParam('fullName','Test'),
        gender: this.props.navigation.getParam('gender',''),
        dateOfBirth: this.props.navigation.getParam('DOB',''),
        //age: this.state.age,
        ic: this.props.navigation.getParam('ic',''),
        mobileNumber: this.props.navigation.getParam('mobileNumber',''),
        landlineNumber: this.props.navigation.getParam('landlineNumber',''),
        //mobileNumber: this.state.mobileNumber,
        //landlineNumber: this.state.landNumber,
        address: this.props.navigation.getParam('address',''),
        citizenship: this.props.navigation.getParam('citizenship',''),
        nationality: this.props.navigation.getParam('nationality',''),
      });
    }else{
      this.onSubmitFail();
    }
  }

  render(){
      return (
        /*start of Form*/

        <Container>
          <Content padder>
          <Text style={{textAlign:'center', fontSize: 20, fontWeight:'bold'}}> Do you have other enquiries? </Text>
          <Text style={{textAlign:'center', fontSize: 14}}> Fill out the form below and we will get back to you within 5 working days! </Text>
            <Form>
              <View>
                  <Item stackedLabel>
                    <Label>Email</Label>
                    <Input placeholder='john@example.com'/>

                  </Item>
                  <Item stackedLabel>
                    <Label>Contact Number</Label>
                    <Input placeholder='8123 4567'/>
                  </Item>
                  <Textarea rowSpan={5} bordered placeholder="Your enquiry" />
              </View>

            </Form>
          </Content>
        </Container>
      );
    }

}

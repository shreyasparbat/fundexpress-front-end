import React from 'react';
import { AsyncStorage, View, ScrollView, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import moment from 'moment';
import navigator from 'react-navigation';
import { Picker, Icon, DatePicker } from 'native-base';
import { Permissions, Notifications } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

validateIC = (icNumber) => {
  //if the ic is valid, then return string
  //else return an error

  if(icNumber.length != 9) {
    return false
  }

  //get each individual character in the icNumber
  figOne = icNumber.charAt(0)
  digitOne = parseInt(icNumber.charAt(1))
  digitTwo = parseInt(icNumber.charAt(2))
  digitThree = parseInt(icNumber.charAt(3))
  digitFour = parseInt(icNumber.charAt(4))
  digitFive = parseInt(icNumber.charAt(5))
  digitSix = parseInt(icNumber.charAt(6))
  digitSeven = parseInt(icNumber.charAt(7))
  figTwo = icNumber.charAt(8)

  //hard coded verification algorithm

  //arrays for step 4
  localArray = ['J','Z','I','H','G','F','E','D','C','B','A']
  foreignArray = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K']
  /*
  1) Take for example I want to test the NRIC number S1234567. The first digit
   you multiply by 2, second multiply by 7, third by 6, fourth by 5,
   fifth by 4, sixth by 3, seventh by 2. Then you add the totals together.
   So,1×2 + 2×7 + 3×6 + 4×5 + 5×4 + 6×3 + 7×2 = 106.
   */

  numbers = digitOne*2 + digitTwo*7 + digitThree*6 + digitFour*5 + digitFive*4 + digitSix*3 + digitSeven*2

  //2) If the first letter of the NRIC starts with T or G, add 4 to the total.
  if (figOne == 'T' || figOne == 'G') {
      numbers += 4
  }
  //3) Then you divide the number by 11 and get the remainder. 106/11=9r7
  numbers = numbers%11

  /*
  4) You can get the alphabet depending on the IC type (the first letter in the IC) using the code below:
  If the IC starts with S or T: 0=J, 1=Z, 2=I, 3=H, 4=G, 5=F, 6=E, 7=D, 8=C, 9=B, 10=A
  */
  if (figOne == 'T' || figOne == 'G') {
      console.log(figTwo == foreignArray[numbers])
      if ((figTwo == foreignArray[numbers])==true){
        return icNumber
      } else {
        return 'SS'
      }
  } else {
      console.log(figTwo == localArray[numbers])
      if ((figTwo == localArray[numbers])==true){
        return icNumber
      } else {
        return 'SS'
      }
  }
}
class RegisterScreen extends React.Component {
  state = { email: '', password: '', fullName: '', gender: '', DOB: '', ic: '', mobileNumber: '' ,
  landlineNumber: '' ,address: '', nationality:'', citizenship: '', house: '', race: '' , ptoken: '', error:''};
  static navigationOptions = {
    title: 'Register',
      headerStyle: {
        backgroundColor: '#C00000',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
  };

  componentWillMount(){
    this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    this.setState({ ptoken : token });
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      console.log(key + " stored successfully");
    } catch (error) {
      console.log(error)
    }
  }

  submit() {
    //var moNumber = parseInt(this.state.mobileNumber);
    //var lanNumber = parseInt(this.state.landlineNumber);
    console.log('register pressed');
    console.log(JSON.stringify(this.state))
    fetch('http://206.189.145.2:3000/user/onboard',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        gender: this.state.gender,
        dateOfBirth: this.state.DOB,
        ic: this.state.ic,
        mobileNumber: parseInt(this.state.mobileNumber),
        nationality: this.state.nationality,
        citizenship: this.state.citizenship,
        landlineNumber: parseInt(this.state.landlineNumber),
        address: this.state.address,
        addressType: this.state.house,
        race: this.state.race,
        expoPushToken: this.state.ptoken,
    // "email": "averychong6@test.com",
    //"password": "pass1234",
    //"fullName": "AveryChong",
    // "gender": "M",
    // "dateOfBirth": "1994-05-23",
    // "ic": "S1234567A",
    // "mobileNumber": parseInt('91234567'),
    // "nationality": "Singaporean",
    // "citizenship": "Singapore",
    // "landlineNumber": parseInt('61234567'),
    // "address": "Singapore",
    // "addressType": "C",
    // "race": "Chinese",
    // expoPushToken: this.state.ptoken,
       
        
      }),
    })
    .then((response) => {
      //console.log(response)
      console.log(response.headers.get('x-auth'))
      if(response.headers.get('x-auth')==null){
        const errorResponse = response.json();
        console.log(errorResponse.body);
        this.setState({ error: 'error'})
      }else{
      this.storeData('auth',response.headers.get('x-auth'));
      console.log("Success")
      console.log(this.state.email + " logged in")
      this.props.navigation.navigate('Home');
      }
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
      this.setState({
        error: error,
        loading: false
      });
    })
  }


  render() {
    return (
      <GiftedForm
      formName='signupForm' // GiftedForm instances that use the same name will also share the same states
      openModal={(route) => {
        navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
      }}
      clearOnClose={false} // delete the values of the form when unmounted
      defaults={{
        /*
        username: 'Farid',
        'gender{M}': true,
        password: 'abcdefg',
        country: 'FR',
        birthday: new Date(((new Date()).getFullYear() - 18)+''),
        */
      }}
      validators={{
        fullName: {
          title: 'Full name',
          validate: [{
            validator: 'isLength',
            arguments: [1, 23],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
          }]
        },
        NRIC: {
          title: 'NRIC',
          validate: [{
            validator: 'isLength',
            arguments: [3, 16],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
          },{
            validator: 'matches',
            arguments: /^[a-zA-Z0-9]*$/,
            message: '{TITLE} can contains only alphanumeric characters'
          }]
        },
        password: {
          title: 'Password',
          validate: [{
            validator: 'isLength',
            arguments: [6, 16],
            message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
          }]
        },
        emailAddress: {
          title: 'Email address',
          validate: [{
            validator: 'isLength',
            arguments: [6, 255],
          },{
            validator: 'isEmail',
          }]
        },
        // bio: {
        //   title: 'Biography',
        //   validate: [{
        //     validator: 'isLength',
        //     arguments: [0, 512],
        //     message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
        //   }]
        // },
        // gender: {
        //   title: 'Gender',
        //   validate: [{
        //     validator: (...args) => {
        //       if (args[0] === undefined) {
        //         return false;
        //       }
        //       return true;
        //     },
        //     message: '{TITLE} is required',
        //   }]
        // },
        // birthday: {
        //   title: 'Birthday',
        //   validate: [{
        //     validator: 'isBefore',
        //     arguments: [moment().utc().subtract(18, 'years').format('YYYY-MM-DD')],
        //     message: 'You must be at least 18 years old'
        //   }, {
        //     validator: 'isAfter',
        //     arguments: [moment().utc().subtract(100, 'years').format('YYYY-MM-DD')],
        //     message: '{TITLE} is not valid'
        //   }]
        // },
        // country: {
        //   title: 'Country',
        //   validate: [{
        //     validator: 'isLength',
        //     arguments: [2],
        //     message: '{TITLE} is required'
        //   }]
        // },
      }}
    >
      <GiftedForm.SeparatorWidget />

      <GiftedForm.TextInputWidget
        name='fullName' // mandatory
        title='Full name'
        //image={require('../../assets/icons/color/user.png')}
        onChangeText={fullName => this.setState({ fullName })}
        placeholder='Marco Polo'
        clearButtonMode='while-editing'
      />

      <GiftedForm.TextInputWidget
        name='nric'
        title='NRIC'
        //image={require('../../assets/icons/color/contact_card.png')}
        placeholder='S1234567A'
        clearButtonMode='while-editing'
        // onTextInputFocus={(currentText = '') => {
        //   if (!currentText) {
        //     let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
        //     if (fullName) {
        //       return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
        //     }
        //   }
        //   return currentText;
        // }}
        onChangeText={ic => this.setState({ ic })}
      />

      <GiftedForm.TextInputWidget
        name='emailAddress' // mandatory
        title='Email address'
        placeholder='example@fundexpress.com'
        keyboardType='email-address'
        onChangeText={email => this.setState({ email })} 
        autoCapitalize='none'
        clearButtonMode='while-editing'
        //image={require('../../assets/icons/color/email.png')}
      />

      <GiftedForm.TextInputWidget
        name='password' // mandatory
        title='Password'
        placeholder='******'
        clearButtonMode='while-editing'
        autoCapitalize='none' 
        onChangeText={password => this.setState({ password })}
        secureTextEntry={true}
        //image={require('../../assets/icons/color/lock.png')}
      />

      <GiftedForm.SeparatorWidget />

      {/* <GiftedForm.ModalWidget
        title='Gender'
        displayValue='gender'
        //image={require('../../assets/icons/color/gender.png')}
      >
        <GiftedForm.SeparatorWidget /> */}

        {/* <GiftedForm.SelectWidget name='gender' title='Gender' multiple={false}>
          <GiftedForm.OptionWidget title='Female' value='F'/>
          <GiftedForm.OptionWidget title='Male' value='M'/> */}
          {/* <GiftedForm.OptionWidget image={require('../../assets/icons/color/female.png')} title='Female' value='F'/>
          <GiftedForm.OptionWidget image={require('../../assets/icons/color/male.png')} title='Male' value='M'/> */}
        {/* </GiftedForm.SelectWidget>
      </GiftedForm.ModalWidget> */}

      {/* <GiftedForm.ModalWidget
        title='Birthday'
        displayValue='birthday'
        //image={require('../../assets/icons/color/birthday.png')}
        scrollEnabled={false}
      >
        <GiftedForm.SeparatorWidget/>

        <GiftedForm.DatePickerIOSWidget
          name='birthday'
          mode='date'
          getDefaultDate={() => {
            return new Date(((new Date()).getFullYear() - 18)+'');
          }}
        />
      </GiftedForm.ModalWidget>

      <GiftedForm.ModalWidget
        title='Country'
        displayValue='country'
        //image={require('../../assets/icons/color/passport.png')}
        scrollEnabled={false}
      >
        <GiftedForm.SelectCountryWidget
          code='alpha2'
          name='country'
          title='Country'
          autoFocus={true}
        />
      </GiftedForm.ModalWidget>

      <GiftedForm.ModalWidget
        title='Biography'
        displayValue='bio'
        //image={require('../../assets/icons/color/book.png')}
        scrollEnabled={true} // true by default
      >
        <GiftedForm.SeparatorWidget/>

        <GiftedForm.TextAreaWidget
          name='bio'
          autoFocus={true}
          placeholder='Something interesting about yourself'
        />
      </GiftedForm.ModalWidget> */}

      <GiftedForm.ErrorsWidget/>

      <GiftedForm.SubmitWidget
        title='Sign up'
        widgetStyles={{
          submitButton: {
            backgroundColor: '#CC0000',
          }
        }}
        onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
          if (isValid === true) {
            // prepare object
            values.gender = values.gender[0];
            values.birthday = moment(values.birthday).format('YYYY-MM-DD');

            /* Implement the request to your server using values variable
            ** then you can do:
            ** postSubmit(); // disable the loader
            ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
            ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
            ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
            */
          }
        }}
      />

      <GiftedForm.NoticeWidget
        title='By signing up, you agree to the Terms of Service and Privacy Policity.'
      />

      <GiftedForm.HiddenWidget name='tos' value={true} />
    </GiftedForm>
    );
  }
}

export default RegisterScreen;

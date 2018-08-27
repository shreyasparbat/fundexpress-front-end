import React from 'react';
import {View, Image} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
//import { ImagePicker } from 'react-native-image-crop-picker';
import { ImagePicker } from 'expo';


class UploadScreen extends React.Component {

  state = { imageUploaded: false, image: null};

  static navigationOptions = {
    title: 'Upload Profile Picture',
      headerStyle: {
        backgroundColor: '#ff0000', 
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#ffffff'
      },
  };

  imagePick() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
    .then(image => {
      console.log(image);
    });
  }
  

  renderImage() {
    if(this.state.imageUploaded){
      return (
        <Avatar 
          xlarge
          source={{ uri: image }}
          onPress={imageUploaded => this.setState(true)}
          activeOpacity={0.7}
          containerStyle={{marginTop:15}}
        />
      )
    }else{
      return (
        <Avatar 
          xlarge
          icon={{name: 'camera-alt', color: 'grey'}}
          //onPress={() => this._pickImage()}
          onPress={()=> this.props.navigation.navigate('camera')}
          activeOpacity={0.7}
          containerStyle={{marginTop:15}}
        />
      )
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    //console.log(this.state.imageUploaded)
    return ( 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.renderImage()}
        <View style={{flexDirection:'row'}}>

          <Button
            title='Retry'
            color='white'
            backgroundColor='#ff0000'
            onPress={() => this.props.navigation.navigate('upload')}
            containerViewStyle={{marginTop:30,marginBottom:30}}      
          />

          <Button
            title='Next'
            color='white'
            backgroundColor='#ff0000'
            onPress={() => this.props.navigation.navigate('register')}
            containerViewStyle={{marginTop:30,marginBottom:30}}      
          />
        </View>
      </View>
    );
  }
}

export default UploadScreen;
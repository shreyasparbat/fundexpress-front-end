import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera, Permissions, MediaLibrary } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class UploadScreen extends React.Component {
  static navigationOptions = {
      headerStyle: {
        backgroundColor: "#C00000", 
      },
      headerTintColor: "#ffffff",
  }

  state = {
    cameraPermission: null,
    rollPermission: null,
    photo: '',
    type: this.props.navigation.getParam('type' , null),
    auth: ''
  };

  // state = {
  //   cameraPermission: null,
  //   rollPermission: null,
  // };

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA)
      .then(({ status }) =>
        this.setState({
          cameraPermission: status === 'granted'
        })
      );
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) =>
        this.setState({
          rollPermission: status === 'granted'
        })
      );
  }

  componentWillMount(){
    this.retrieveData().then((token) => {
      this.setState({auth:token})
    }).catch((error) => {
      console.log("error retrieving token")
      console.log(error)
    });
  }

//   render() {
//     const { cameraPermission } = this.state;

//     return (
//       <View style={styles.container}>
//         {cameraPermission === null ? (
//           <Text>Waiting for permission...</Text>
//         ) : cameraPermission === false ? (
//           <Text>Permission denied</Text>
//         ) : (
//           <Autoshoot/>
//         )}
//       </View>
//     );
//   }
// }

// class Autoshoot extends React.Component {

  // state = {
  //   photo: null,
  //   type: 'watch'
  // }

  takePicture = () => {
    this.camera.takePictureAsync({
      quality: 0.1,
      base64: true,
      exif: false
    }).then(photo => {
      this.setState({ photo });
      //console.log(photo);
      image = photo.base64;
      //MediaLibrary.createAssetAsync(photo.uri);
      //this.props.navigation.navigate('pawn', { uri : photo.uri })
      this.submit(photo);

    })
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      console.log("token retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      console.log(key + " stored successfully");
    } catch (error) {
      console.log(error)
    }
  }

  go = (ID) => {
    console.log(ID);
    //this.props.navigation.navigate('pawn', {itemID: ID});
    this.props.navigation.navigate('pawn');
  }

  submit= (photo) => {
    console.log('uploading photo');
    const type = this.state.type;
    const auth = this.state.auth;
    console.log(auth);
    console.log(type);
    const formData = new FormData();
      formData.append('front', {
        uri: photo.uri, // your file path string
        type: 'image/jpg',
        name: 'front.jpg'
      });
      formData.append('back', {
        uri: photo.uri, // your file path string
        type: 'image/jpg',
        name: 'back.jpg'
      });
    //console.log("form data");
    //console.log(formData);
    fetch('http://206.189.145.2:3000/item/uploadImage',{
      method: 'POST',
      headers: {
        'type' : type,
        'x-auth': auth,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
    // .then((response) => {
    //   if (response.ok) {
    //     return response
    //   } else {
    //     return Promise.reject(response.json())
    //   }
    // })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      console.log("/item/uploadImage Success");
      //console.log(response);
      console.log(response.itemID);
      this.storeData('itemID',response.itemID);
      this.storeData('photo',this.state.photo.uri);
      this.go(response.itemID);
    })
    .catch((error) => {
      console.log("error")
      console.log(error)
    })
  }

  render() {

    const { photo } = this.state;

    return (
      <View style={{ flex: 1, width: '100%' }}>
      {/* {photo ? (
       <ImageBackground
         style={{ flex: 1 }}
         source={{ uri: photo.uri }} />
      ) : ( */}

        <Camera
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
          ref={cam => this.camera = cam}>
          <View style={{ flex: 0.4, bottom: -10, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', left: 0, right: 0 }}>
          <TouchableOpacity
            onPress= {() => this.takePicture()}
            style={{ alignSelf: 'center' }}
          >
            <Ionicons name="ios-radio-button-on" size={70} color="white" />
          </TouchableOpacity>
        </View>
        </Camera>
     {/* ) */}
    }
    </View>
    )
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

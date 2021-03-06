import React from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Camera, Permissions, MediaLibrary } from 'expo';
import { Slider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import url from '../configs/config';
export default class UploadScreen extends React.Component {
  static navigationOptions = {
      headerStyle: {
        backgroundColor: "white",
      },
       headerTintColor:'black'
  }

  state = {
    cameraPermission: null,
    rollPermission: null,
    front: '',
    back:'',
    second:false,
    type: '',
    auth: '',
    showAlert: false,
    brand:'',
    weight:'',
    purity:'',
    zoom:0,
  }

  componentDidMount() {
  Permissions.askAsync(Permissions.CAMERA)
      .then(({ status }) =>
        this.setState({
          cameraPermission: status === 'granted'
        })
      )
  Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) =>
        this.setState({
          rollPermission: status === 'granted'
        })
      )
  }

  componentWillMount(){
    // console.log('from select type:' + this.props.navigation.getParam('type', ''))
    this.retrieveData().then((token) => {
      this.setState({
        auth:token,
        showAlert: true,
        type: this.props.navigation.getParam('type', ''),
        // alertTitle: 'Tutorial',
        alertMessage: 'Take an image of the front of your item',
        showProgress: false,
        showConfirmButton: true,
      })
    }).catch((error) => {
      // console.log("error retrieving token")
      // console.log(error)
    })
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
    this.setState({
      showAlert: true,
      alertTitle: "Please Wait",
      alertMessage: "This may take a few seconds",
      showProgress: true,
      showConfirmButton: false,
    })
    if(this.state.second==false){
      // console.log('if second==false, current second: ' + this.state.second)
      this.camera.takePictureAsync({
        quality: 0.9,
        base64: true,
        exif: false
      }).then(front => {
        this.setState({
          front: front,
          second: true,
        });
        this.storeData('front',this.state.front.uri)
        // console.log('front taken: ' + this.state.front)
        //console.log(photo);
        // image = photo.base64;
        //MediaLibrary.createAssetAsync(photo.uri);
        //this.props.navigation.navigate('pawn', { uri : photo.uri })
        this.setState({
          showAlert: true,
          alertTitle: 'Front Image Taken',
          alertMessage: 'Now take an image of the back of your item',
          showProgress: false,
          showConfirmButton: true,
        })
      })
    }else{
      // console.log('if second==true, current second: ' + this.state.second)
      this.camera.takePictureAsync({
        quality: 0.9,
        base64: true,
        exif: false
      }).then(back => {
        this.setState({
          back: back,
          second: false
        });
        // console.log("Back taken: " + this.state.back)
        this.storeData('back', this.state.back.uri)
        this.submit(this.state.front, this.state.back);
        //console.log(photo);
        // image = photo.base64;
        //MediaLibrary.createAssetAsync(photo.uri);
        //this.props.navigation.navigate('pawn', { uri : photo.uri })
      })
    }
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('auth');
      // console.log("token retrieved " + value);
      return value;
    } catch (error){
      throw error
    }
  }

  storeData = async (key,item) => {
    try{
      await AsyncStorage.setItem(key, item);
      // console.log(key + " stored successfully");
    } catch (error) {
      // console.log(error)
    }
  }

  go = (ID) => {
    // console.log(ID);
    this.setState({ showAlert: false})
    //this.props.navigation.navigate('pawn', {itemID: ID});
    // console.log('upload->pawn type: ' + this.state.type)
    // console.log('upload->pawn purity: ' + this.state.purity)
    // console.log('upload->pawn weight: ' + this.state.weight)
    // console.log('upload->pawn brand: ' + this.state.brand)
    this.props.navigation.navigate('pawn', {'type': this.state.type, 'weight': this.state.weight, 'purity':this.state.purity, 'brand':this.state.brand})
  }

  submit= (front, back) => {
    // console.log('uploading photo');
    const type = this.state.type;
    const auth = this.state.auth;
    // console.log(auth);
    // console.log(type);
    const formData = new FormData();
      formData.append('front', {
        uri: front.uri, // your file path string
        type: 'image/jpg',
        name: 'front.jpg'
      });
      formData.append('back', {
        uri: back.uri, // your file path string
        type: 'image/jpg',
        name: 'back.jpg'
      });
    //console.log("form data");
    //console.log(formData);
    fetch(url.url + 'item/uploadImage',{
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
      // console.log("/item/uploadImage Success");
      // console.log(response);
      // console.log(response.itemID);
      this.storeData('itemID',response.itemID);
      // console.log('from OCR brand: ' + response.brand)
      // console.log('from OCR weight: ' + response.weight)
      // console.log('from OCR purity: ' + response.purity)
      this.setState({
        brand: response.brand,
        weight: response.weight,
        purity: response.purity
      })
      // console.log("front URI: " + this.state.front.uri)
      // console.log('back URI: ' + this.state.back.uri)


      this.go(response.itemID);
    })
    .catch((error) => {
      // console.log("error")
      // console.log(error)
      this.setState({
        showAlert:false
      })
    })
  }

  render() {
    if(this.state.cameraPermission==false){
      return (
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text>Camera Permissions are required to use this feature, proceed to your device settings to enable camera permissions for FundExpress/Expo</Text>
        </View>
      );
  }else{
    return (
      <View style={{ flex: 1, width: '100%' }}>
      {/* {photo ? (
       <ImageBackground
         style={{ flex: 1 }}
         source={{ uri: photo.uri }} />
      ) : ( */}
        <Camera
          style={{ flex: 1 }}
          // style ={{height: Dimensions.get('screen').height, width: Dimensions.get('screen').width}}
          type={Camera.Constants.Type.back}
          zoom={this.state.zoom}
          ref={cam => this.camera = cam}>
          <View style={{padding:15}}>
          <Slider
            thumbTintColor='white'
            value={this.state.zoom}
            maximumTrackTintColor='white'
            minimumTrackTintColor='white'
            maximumValue={1}
            step = {0.001}
            onValueChange={(zoom) => this.setState({zoom})}/>
          </View>
          <View style={{ flex: 0.4, bottom: -3, position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', left: 0, right: 0 }}>
          <TouchableOpacity
            onPress= {() => this.takePicture()}
            style={{ alignSelf: 'center' }}
          >
            <Ionicons name="ios-radio-button-on" size={70} color="white" />
          </TouchableOpacity>
        </View>
        </Camera>
        <AwesomeAlert
          show= {this.state.showAlert}
          title= {this.state.alertTitle}
          message={this.state.alertMessage}
          showProgress={this.state.showProgress}
          showConfirmButton={this.state.showConfirmButton}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          confirmButtonColor="#C00000"
          confirmText="Ok!"
          onConfirmPressed={() => {
            this.setState({showAlert:false});
          }}
        />
     {/* ) */}
    </View>
    )


  }
  }
}

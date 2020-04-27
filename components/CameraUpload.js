// code altered from code from Abdul Karim Khan
// posted to StackOverflow: https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
} from 'react-native';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
export default class CameraUpload extends Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    let {
      image
    } = this.state;

    return (
      <View>
        <StatusBar barStyle="default" />

        <Button
          onPress={this._pickImage}
          title="Select from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        {/* {this._maybeRenderImage()} */}
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  // take photo or select image from roll
  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri });
        this.uploadImageAsync(pickerResult.uri);
      }

    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
      });


      if (!pickerResult.cancelled) {
        this.setState({ image: pickerResult.uri});
        this.uploadImageAsync(pickerResult.uri);
      }
    }
  };

  // upload image to db
 uploadImageAsync = async (pictureuri) => {
  let apiUrl = 'http://stump-around.herokuapp.com/profileImageUpload';

    var data = new FormData();  
    data.append('file', {  
      uri: pictureuri,
      name: 'file',
      type: 'image/jpg'
    })
    const token = await AsyncStorage.getItem('token');

    fetch(apiUrl, {  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': token,
      },
      method: 'POST',
      body: data
    }).then(
      response => response.json()
      ).then((responseJson) => {
        console.log(responseJson.photo)
        this.props.setUserState({ ...this.props.userState, photo: 'temporary' });
        this.props.setUserState({ ...this.props.userState, photo: responseJson.photo });
        this.props.setModalVisibleState(false);
        console.log('success')
      })
      .catch(err => {
        this.props.setModalVisibleState(false);
        console.log('error')
        console.log(err)

    } )

  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});
import React from "react";
import { Button, Platform, Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

import Constants from "expo-constants";
import * as Location from "expo-location";

import Toolbar from "./toolbar.component";
import Gallery from "./gallery.component";

import styles from "./styles";

export default class CameraExample extends React.Component {
  camera = null;
  state = {
    captures: [],
    // setting flash to be turned off by default
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    // start the back camera by default
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
    location: null,
    errorMessage: null,
    latitude: null,
    longitude: null,
    altitude: null
  };

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync();
    this.setState({
      capturing: false,
      captures: [photoData, ...this.state.captures]
    });
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures]
    });
  };

  tempSendPhoto = async () => {
    console.log(this.state.captures);
    const data = new FormData();

    data.append('name', 'avatar');
    data.append('fileData', {
     uri : response.uri,
     type: response.type,
     name: response.fileName
    });

    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };

    fetch("http://localhost:3000/upload", config).then((checkStatusAndGetJSONResponse)=>{
      console.log(checkStatusAndGetJSONResponse);
    }).catch((err)=>{console.log(err)});
  };

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      location,
      altitude: location.coords.altitude,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <React.Fragment>
          <View>
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={styles.preview}
              ref={camera => (this.camera = camera)}
            />
          </View>
          <View style={{ padding: 10, backgroundColor: "#000" }}>
            <Button title="Submit" onPress={() => this.tempSendPhoto()} />2
            <Text style={{ color: "white" }}>
              Altitude: {this.state.altitude}
            </Text>
            <Text style={{ color: "white" }}>
              Longitude: {this.state.longitude}
            </Text>
            <Text style={{ color: "white" }}>
              Latitude: {this.state.latitude}
            </Text>
          </View>
          {captures.length > 0 && <Gallery captures={captures} />}
          <Toolbar
            capturing={capturing}
            flashMode={flashMode}
            cameraType={cameraType}
            setFlashMode={this.setFlashMode}
            setCameraType={this.setCameraType}
            onCaptureIn={this.handleCaptureIn}
            onCaptureOut={this.handleCaptureOut}
            onLongCapture={this.handleLongCapture}
            onShortCapture={this.handleShortCapture}
          />
        </React.Fragment>
      );
    }
  }
}
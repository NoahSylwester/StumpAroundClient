import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  Text,
  Button,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { Constants } from 'expo';
import styles from '../constants/MainStyles';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";

export default function StumpScreen(props) {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [stump, setStump] = useState(props.navigation.getParam('stump',{}));
    const [textState, setTextState] = useState({
        name: '',
        summary: '',
        tag: '',
    });
    const [tags, setTags] = useState([]);
    const [coordinates, setCoordinates] = useState({
        latitude: null,
        longitude: null,
        altitude: null,
    })
    const [locationPermission, setLocationPermission] = useState(false);

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
          setLocationPermission(false);
        }
    
        let location = await Location.getCurrentPositionAsync({});
    
        setCoordinates({
          altitude: location.coords.altitude,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
      };

    useEffect(() => {
        _getLocationAsync()
    }, []);

    const _maybeRenderUploadingOverlay = (
            <View
              style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
              <ActivityIndicator color="#fff" size="large" />
            </View>
          );

    const _takePhoto = async () => {
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
            setImage(pickerResult.uri);
            // uploadImageAsync(pickerResult.uri);
          }
    
        }
      };
    
    const _pickImage = async () => {
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
            setImage( pickerResult.uri );
            // uploadImageAsync(pickerResult.uri);
          }
        }
      };

    const stumpCreationRequest = async () => {
        if (coordinates.latitude === null || coordinates.longitude === null) {
            return alert('Please enable location permissions to submit stumps.');
        }
        if (textState.name === '') {
            return alert('Please enter a name for your stump.');
        }
        if (textState.summary === '') {
            return alert('Please enter a summary for your stump.');
        }
        if (image === null) {
            return alert('Please upload a picture for your stump.');
        }
        const stumpId = await stumpPOST();
        const response = await stumpPhotoPUT(stumpId);
        return response;
    };

    const stumpPOST = async () => {
      let apiUrl = 'http://stump-around.herokuapp.com/stump/';
          const data = {
            name: textState.name,
            summary: textState.summary,
            ...coordinates,
            tags,
          }
          const token = await AsyncStorage.getItem('token');
          const response = await fetch(apiUrl, {  
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            method: 'POST',
            body: JSON.stringify(data)
          })
          return response.json();
    }

    const stumpPhotoPUT = async (stumpId) => {
      let apiUrl = 'http://stump-around.herokuapp.com/stump/image/' + stumpId;
      
          var data = new FormData();  
          data.append('file', {  
            uri: image,
            name: 'file',
            type: 'image/jpeg'
          })
          const token = await AsyncStorage.getItem('token');
          const response = await fetch(apiUrl, {  
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'x-access-token': token,
            },
            method: 'PUT',
            body: data
          });
          return response.json();
        };

    const _renderImage = (
                <Image source={{ uri: image }} style={styles.renderImage} />
          );

    return (
        <View style={styles.container} >
            <Text style={styles.hikesPageTitle}>
                Submit a Stump
            </Text>
            <ScrollView
                keyboardShouldPersistTaps='never'
                style={styles.hikePageBody}
                contentContainerStyle={styles.submitPageContentContainer}
            >
                {image ? _renderImage : <Image source={require('../assets/images/angelina-hoeppner-w79t8zUj2Yo-unsplash.jpg')} style={styles.renderImage} />}
                {uploading ? _maybeRenderUploadingOverlay : <View />}
             <View>
                <StatusBar barStyle="default" />
                <Button color='#00B100' onPress={_pickImage} title="Select from camera roll" />
                <Button color='#00B100' onPress={_takePhoto} title="Take a photo" />
            </View>
                <TextInput
                    style={styles.hikeTitle}
                    autoCapitalize='none'
                    id="name"
                    onChangeText={name => name.length <= 30 ? setTextState({ ...textState, name }) : alert('Name must not be more than thirty characters long.')}
                    placeholder={'Name your stump!'}
                    value={textState.name}
                />
                <TextInput
                    multiline={true}
                    style={{...styles.summary, textAlign: 'center', marginTop: 10 }}
                    autoCapitalize='none'
                    id="summary"
                    onChangeText={summary => setTextState({ ...textState, summary })}
                    placeholder={'Describe what this spot is.'}
                    value={textState.summary}
                />
                <View>
                    <View style={styles.tagContainer}>
                        {tags.length !== 0 ? tags.map((element, i) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => setTags([...tags.slice(0,i), ...tags.slice(i + 1)])}
                                    key={i}
                                    style={styles.tagWrapper}
                                >
                                    <Text style={styles.tagText}>
                                        {element}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }) : <View style={{justifyContent: 'center'}}><Text>No tags yet.</Text></View>}
                    </View>
                    <TextInput
                        style={{...styles.summary, textAlign: 'center', fontSize: 15 }}
                        autoCapitalize='none'
                        id="summary"
                        onChangeText={tag => setTextState({ ...textState, tag })}
                        placeholder={'New tag'}
                        value={textState.tag}
                    />
                    <Button
                        color='#00B100'
                        title="Add tag"
                        onPress={() => {
                            if (textState.tag !== '') {
                                setTags([...tags, textState.tag]);
                                setTextState({ ...textState, tag: '' })
                            }
                        }}
                    />
                </View>
                <View style={styles.submitStumpButtonWrapper}>
                    <Button 
                        color='#00B100'
                        onPress={stumpCreationRequest}
                        title="Submit your stump"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

StumpScreen.navigationOptions = {
  header: null,
};
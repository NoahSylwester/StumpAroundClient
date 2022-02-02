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
  Alert,
} from 'react-native';
import { Constants } from 'expo';
import styles from '../constants/MainStyles';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import Loading from '../components/Loading';


/* 
This screen renders components that handle information from users to create new
stump entries.
*/


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
    const [loading, setLoading] = useState(false);

    // get location of user
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

    const _maybeRenderUploadingOverlay = (
            <View
              style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
              <ActivityIndicator color="#fff" size="large" />
            </View>
          );

    // user phone camera to take or select picture from camera roll
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


    // handle stump creation click, validate info fields
    // this is a bundled function of requests, to handle multiple requests more easily
    // this way one request doesn't need to handle both json and an image file
    const stumpCreationRequest = async () => {
        setLoading(true);
        if (coordinates.latitude === null || coordinates.longitude === null) {
          setLoading(true);
          return alert('Please enable location permissions to submit stumps.');
        }
        if (textState.name === '') {
          setLoading(true)
          return alert('Please enter a name for your stump.');
        }
        if (textState.summary === '') {
          setLoading(true)
          return alert('Please enter a summary for your stump.');
        }
        if (image === null) {
          setLoading(true)
          return alert('Please upload a picture for your stump.');
        }
        const stumpId = await stumpPOST();
        const response = await stumpPhotoPUT(stumpId);
        console.log(response);
        if (response.success !== 1 ) {
          Alert.alert('Error', "There was an error submitting your stump. Please try again later.",
          [
            {text: 'Ok', onPress: () => {
              setLoading(false);
              props.navigation.navigate('Stumps');
            }},
          ]);
        }
        else {
          Alert.alert('Stump Around!', "Your stump was successfully created!",
          [
            {text: 'Ok', onPress: () => {
              setLoading(false);
              props.navigation.navigate('Stumps');
            }},
          ]);
        }
    };

    // post request for creating stump entry
    const stumpPOST = async () => {
      try {
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
        catch (err) {
          console.log(err);
          setLoading(false);
          alert('Something went wrong.')
        }
    }

    // update stump with photo
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

    useEffect(() => {
        _getLocationAsync()
    }, []);

    return (
        <View style={styles.container} >
          <Loading loading={loading} setLoading={setLoading} />
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
                <Button color='#24d36fff' onPress={_pickImage} title="Select from camera roll" />
                <Button color='#24d36fff' onPress={_takePhoto} title="Take a photo" />
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
                        id="tag"
                        onChangeText={tag => tag.length <= 25 ? setTextState({ ...textState, tag }) : alert('Tag must be between three and twenty-five characters.')}
                        placeholder={'New tag'}
                        value={textState.tag}
                    />
                    <Button
                        color='#24d36fff'
                        title="Add tag"
                        onPress={() => {
                            if (textState.tag.length < 3) {
                              alert('Tag must be between three and twenty-five characters.');
                            }
                            else {
                                setTags([...tags, textState.tag]);
                                setTextState({ ...textState, tag: '' })
                            }
                        }}
                    />
                </View>
                <View style={styles.submitStumpButtonWrapper}>
                    <Button 
                        color='#24d36fff'
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
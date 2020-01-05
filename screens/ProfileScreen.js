import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
import Camera from "./camerascreen";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
  Modal,
  TextInput,
} from 'react-native';
import styles from '../constants/MainStyles';
import CommentModal from '../components/CommentModal';
import CommentsBox from '../components/CommentsBox';
import FriendsBox from '../components/FriendsBox';

import { MonoText } from '../components/StyledText';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FavoriteHikes from '../components/FavoriteHikes';
import BioModal from '../components/BioModal';

export default function ProfileScreen(props) {

  const [usernameState, setUsernameState] = useState('');
  const [userState, setUserState] = useState({});
  const isPastInitialRender = useRef(false);
  const [modalVisibleState, setModalVisibleState] = useState(false);
  const [editBioState, setEditBioState] = useState(userState.bio);
  const [commentsModalVisibleState, setCommentsModalVisibleState] = useState(false);
  const [commentState, setCommentState] = useState('');

  const _retrieveId = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      console.log(username, token, email);
      if (username !== null) {
        setUsernameState(username);
        return;
      }
      else {
        setUsernameState(null);
        console.log('No async storage for "username"');
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const _storeData = async (id) => {
    try {
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('ProfileKey', props.navigation.state.key)
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  const _updateUser = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token)
    fetch(`https://stump-around.herokuapp.com/user/secure`, {
        method: 'POST',
        headers: {
          'x-access-token': token,
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        setUserState({
          ...responseJson,
        });
        _storeData(responseJson._id);
        setEditBioState(responseJson.bio);
        
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    _retrieveId();
  }, []);

  useEffect(() => {
    if (isPastInitialRender.current === true) {
      _updateUser();
    }
    isPastInitialRender.current = true;
  }, [usernameState, props.navigation.state]);

  const photoPUT = async (data) => {
    const token = await AsyncStorage.getItem('token');
    fetch(`https://stump-around.herokuapp.com/photo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((responseJson) => console.log(responseJSON))
      .catch((error) => {
        console.error(error);
      });
  };
  const bioPUT = async (data) => {
    const token = await AsyncStorage.getItem('token');
    console.log(props.navigation.state);
    fetch(`https://stump-around.herokuapp.com/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((responseJson) => console.log(responseJson))
      .catch((error) => {
        console.error(error);
      });
  };

  const commentPOST = async (data) => {
    const userId = await AsyncStorage.getItem('id');
    const newData = { ...data, user: userId };
    // console.log(newData);
    fetch(`https://stump-around.herokuapp.com/profileComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(newData),
      })
      .then((response) => response.json())
      .then((responseJson) => console.log('responseJson'))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <BioModal modalVisibleState={modalVisibleState} setModalVisibleState={setModalVisibleState} setEditBioState={setEditBioState} editBioState={editBioState} bioPUT={bioPUT} userState={userState} _updateUser={_updateUser} />
      <CommentModal setModalVisibleState={setCommentsModalVisibleState} modalVisibleState={commentsModalVisibleState} setCommentState={setCommentState} commentState={commentState} commentPOST={commentPOST} _updateHike={_updateUser} hike={{...userState, comments: userState.profileComments }} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          {/* <Image source={{ uri: "https://image.businessinsider.com/5a8c83d342e1cc57810ba9ee?width=1100&format=jpeg&auto=webp"}} style={styles.photo} /> */}
          <Image source={{ uri: userState.photo }} style={styles.photo} />
          <Button
            color='#00B100'
            title="Change photo" 
            onPress={() => props.navigation.navigate("Camera")}
            style={styles.commentButton}
          ></Button>
          <Text style={styles.username}>
            {userState.name}
          </Text>
          <Text>
            User since {userState.date_created}
          </Text>
          <Text style={styles.bio}>
            {userState.bio}
          </Text>
          <Button
            color='#00B100'
            title="Edit bio" 
            onPress={() => setModalVisibleState(true)}
            style={styles.commentButton}
          ></Button>
          <FriendsBox user={{...userState, friends: userState.friends || [] }} isPastInitialRender={isPastInitialRender} navigation={props.navigation} />
          <Text style={styles.hikesTitle}>
              Favorite Hikes
          </Text>
          <FavoriteHikes userState={userState} navigation={props.navigation} />
          <CommentsBox isPastInitialRender={isPastInitialRender} hike={{...userState, comments: userState.profileComments || [] }} navigation={props.navigation} setModalVisibleState={setCommentsModalVisibleState} />
          <Button
            color='#00B100'
            title="Logout" 
            onPress={async () => {
              await AsyncStorage.clear();
              props.navigation.navigate('Auth');
            }}
            style={styles.commentButton}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

ProfileScreen.navigationOptions = {
  header: null,
};
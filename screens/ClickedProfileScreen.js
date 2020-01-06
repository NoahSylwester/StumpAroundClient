import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
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

export default function ClickedProfileScreen(props) {

  const [usernameState, setUsernameState] = useState('');
  const [userState, setUserState] = useState(props.navigation.getParam('user',{}));
  const isPastInitialRender = useRef(false);
  const [commentsModalVisibleState, setCommentsModalVisibleState] = useState(false);
  const [commentState, setCommentState] = useState('');
  const [modalVisibleState, setModalVisibleState] = useState(false);

  const _updateUser = async () => {
    fetch(`https://stump-around.herokuapp.com/user/${userState.name}`, {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setUserState({
          ...responseJson,
        });
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }


  useEffect(() => {
    if (isPastInitialRender.current !== true) {
      _updateUser();
    }
    isPastInitialRender.current = true;
  }, [userState]);

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
      <CommentModal setModalVisibleState={setCommentsModalVisibleState} modalVisibleState={commentsModalVisibleState} setCommentState={setCommentState} commentState={commentState} commentPOST={commentPOST} _updateHike={_updateUser} hike={{...userState, comments: userState.profileComments }} />
      <ScrollView contentContainerStyle={styles.clickedProfileContentContainer}>
        <View style={styles.profileContainer}>
          {/* <Image source={{ uri: "https://image.businessinsider.com/5a8c83d342e1cc57810ba9ee?width=1100&format=jpeg&auto=webp"}} style={styles.photo} /> */}
          <Image source={{ uri: userState.photo }} style={styles.photo} />
          <Text style={styles.username}>
            {userState.name}
          </Text>
          <Text>
            User since {userState.date_created}
          </Text>
          <Text style={styles.bio}>
            {userState.bio}
          </Text>
          <FriendsBox user={{...userState, friends: userState.friends || [] }} isPastInitialRender={isPastInitialRender} navigation={props.navigation} />
          <Text style={styles.hikesTitle}>
            Favorite Hikes
          </Text>
          <FavoriteHikes userState={userState} navigation={props.navigation} />
          <CommentsBox isPastInitialRender={isPastInitialRender} hike={{...userState, comments: userState.profileComments || [] }} navigation={props.navigation} setModalVisibleState={setCommentsModalVisibleState} />
        </View>
      </ScrollView>
    </View>
  );
}

ClickedProfileScreen.navigationOptions = {
  header: null,
};
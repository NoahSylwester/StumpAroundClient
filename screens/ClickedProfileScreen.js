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
import ReplyModal from '../components/ReplyModal';
import CommentsBox from '../components/CommentsBox';
import FriendsBox from '../components/FriendsBox';

import { MonoText } from '../components/StyledText';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FavoriteHikes from '../components/FavoriteHikes';
import FavoriteStumps from '../components/FavoriteStumps';

export default function ClickedProfileScreen(props) {

  const [usernameState, setUsernameState] = useState('');
  const [userState, setUserState] = useState(props.navigation.getParam('user',{}));
  const isPastInitialRender = useRef(false);
  const [commentsModalVisibleState, setCommentsModalVisibleState] = useState(false);
  const [commentState, setCommentState] = useState('');
  const [modalVisibleState, setModalVisibleState] = useState(false);
  const [replyModalVisibleState, setReplyModalVisibleState] = useState(false);
  const [replyData, setReplyData] = useState({});

  const _updateUser = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch(`https://stump-around.herokuapp.com/user/${userState._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
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

  const replyPOST = async (data) => {
    // data should have property content, repliedTo, stump||hike||profile
    // {content: '', repliedTo: props.parent, [props.screen.type]: props.screen._id}
    const userId = await AsyncStorage.getItem('id');
    const newData = { ...data, user: userId };
    const response = await fetch(`https://stump-around.herokuapp.com/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData),
        })
    return response.json();
  };

  const sendRequestPOST = async (_id) => {

    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`https://stump-around.herokuapp.com/sendRequest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({_id}),
        });
    const responseJson = await response.json();
    alert(`Sent friend request to ${responseJson.name}!`);
  }

  return (
    <View style={styles.container}>
      <CommentModal setModalVisibleState={setCommentsModalVisibleState} modalVisibleState={commentsModalVisibleState} setCommentState={setCommentState} commentState={commentState} commentPOST={commentPOST} _updateHike={_updateUser} hike={{...userState, comments: userState.profileComments }} />
      <ReplyModal replyData={replyData} setReplyData={setReplyData} setModalVisibleState={setReplyModalVisibleState} modalVisibleState={replyModalVisibleState} setCommentState={setCommentState} commentState={commentState} replyPOST={replyPOST} _updateHike={_updateUser} hike={{...userState, comments: userState.profileComments }} />
      <ScrollView contentContainerStyle={styles.clickedProfileContentContainer}>
        <View style={styles.profileContainer}>
          {/* <Image source={{ uri: "https://image.businessinsider.com/5a8c83d342e1cc57810ba9ee?width=1100&format=jpeg&auto=webp"}} style={styles.photo} /> */}
          <Image source={{ uri: userState.photo }} style={styles.photo} />
          <Text style={styles.username}>
            {userState.name}
          </Text>
          <Text>
            User since {userState.date_created && (new Date(userState.date_created)).toUTCString()}
          </Text>
          <Text style={styles.bio}>
            {userState.bio}
          </Text>
          <FriendsBox user={{...userState, friends: userState.friends || [] }} isPastInitialRender={isPastInitialRender} navigation={props.navigation} />
          <Button title="Send friend request" onPress={() => sendRequestPOST(userState._id)} />
          <Text style={styles.hikesTitle}>
            Favorite Hikes
          </Text>
          <FavoriteHikes userState={userState} navigation={props.navigation} />
          <Text style={styles.hikesTitle}>
            Favorite Stumps
          </Text>
          <FavoriteStumps userState={userState} navigation={props.navigation} />
          <CommentsBox isPastInitialRender={isPastInitialRender} hike={{...userState, comments: userState.profileComments || [] }} navigation={props.navigation} setModalVisibleState={setCommentsModalVisibleState} screen={{ type: 'profile', _id: userState._id}} replyData={replyData} setReplyData={setReplyData} setReplyModalVisibleState={setReplyModalVisibleState} replyModalVisibleState={replyModalVisibleState} />
        </View>
      </ScrollView>
    </View>
  );
}

ClickedProfileScreen.navigationOptions = {
  header: null,
};
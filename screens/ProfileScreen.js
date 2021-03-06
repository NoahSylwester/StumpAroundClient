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
import FriendsBoxActionable from '../components/FriendsBoxActionable';
import FavoriteHikesActionable from '../components/FavoriteHikesActionable';
import FavoriteStumpsActionable from '../components/FavoriteStumpsActionable';

import { MonoText } from '../components/StyledText';
import { TouchableHighlight } from 'react-native-gesture-handler';
import BioModal from '../components/BioModal';
import ReplyModal from '../components/ReplyModal';
import CameraModal from '../components/CameraModal';


/* 
This is the is the page for the current user's profile. YOUR profile,
with edit privileges.
*/


export default function ProfileScreen(props) {

  const [usernameState, setUsernameState] = useState('');
  const [userState, setUserState] = useState({});
  const isPastInitialRender = useRef(false);
  const [modalVisibleState, setModalVisibleState] = useState(false);
  const [editBioState, setEditBioState] = useState(userState.bio);
  const [commentsModalVisibleState, setCommentsModalVisibleState] = useState(false);
  const [replyModalVisibleState, setReplyModalVisibleState] = useState(false);
  const [replyData, setReplyData] = useState({});
  const [commentState, setCommentState] = useState('');
  const [cameraModalVisibleState, setCameraModalVisibleState] = useState(false);

  // take info fom async storage
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
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  // store info in async storage
  const _storeData = async (id) => {
    try {
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('ProfileKey', props.navigation.state.key)
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  // refresh user
  const _updateUser = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch(`https://stump-around.herokuapp.com/user/secure`, {
        method: 'POST',
        headers: {
          'x-access-token': token,
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson0')
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

  // send request to update user bio
  const bioPUT = async (data) => {
    const token = await AsyncStorage.getItem('token');
    fetch(`https://stump-around.herokuapp.com/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((responseJson) => console.log(responseJson))
      .catch((error) => {
        console.error(error);
      });
  };

  // add comment to profile
  const commentPOST = async (data) => {
    const userId = await AsyncStorage.getItem('id');
    const newData = { ...data, user: userId };
    fetch(`https://stump-around.herokuapp.com/profileComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
      })
      .then((response) => response.json())
      .then((responseJson) => console.log('responseJson1'))
      .catch((error) => {
        console.error(error);
      });
  };

  // add reply to comment on profile
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

  // accept pending friend request
  const acceptRequestPOST = async (_id) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`https://stump-around.herokuapp.com/acceptRequest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({_id}),
        });
    const responseJson = await response.json();
    _updateUser();
    alert(`Accepted friend request from ${responseJson.name}!`);
  };

  // ignore and delete friend request from pending
  const requestDELETE = async (_id) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`https://stump-around.herokuapp.com/removeRequest`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({ _id }),
        });
    const responseJson = await response.json();
    _updateUser();
    alert(`Removed request.`);
  };

  // delete friend from friends
  const friendDELETE = async (_id) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`https://stump-around.herokuapp.com/removeFriend`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({ _id }),
        });
    const responseJson = await response.json();
    _updateUser();
    alert(`Removed ${responseJson.name} from friends list.`);
  };

  // delete hike from favorites
  const favoriteHikeDELETE = async (hikeId) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`https://stump-around.herokuapp.com/favorite`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({ hikeId }),
        });
    const responseJson = await response.json();
    _updateUser();
    alert(`Removed hike from favorites.`);
  };

  // delete stump from favorites
  const favoriteStumpDELETE = async (stumpId) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`https://stump-around.herokuapp.com/favorite/stump`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
            body: JSON.stringify({ stumpId }),
        });
    const responseJson = await response.json();
    _updateUser();
    alert(`Removed stump from favorites.`);
  };

  useEffect(() => {
    _retrieveId();
  }, []);

  useEffect(() => {
    if (isPastInitialRender.current === true) {
      _updateUser();
    }
    isPastInitialRender.current = true;
  }, [usernameState, props.navigation.state]);

  return (
    <View style={styles.container}>
      <BioModal modalVisibleState={modalVisibleState} setModalVisibleState={setModalVisibleState} setEditBioState={setEditBioState} editBioState={editBioState} bioPUT={bioPUT} userState={userState} _updateUser={_updateUser} />
      <CommentModal setModalVisibleState={setCommentsModalVisibleState} modalVisibleState={commentsModalVisibleState} setCommentState={setCommentState} commentState={commentState} commentPOST={commentPOST} _updateHike={_updateUser} hike={{...userState, comments: userState.profileComments }} />
      <ReplyModal replyData={replyData} setReplyData={setReplyData} setModalVisibleState={setReplyModalVisibleState} modalVisibleState={replyModalVisibleState} setCommentState={setCommentState} commentState={commentState} replyPOST={replyPOST} _updateHike={_updateUser} hike={{...userState, comments: userState.profileComments }} />
      <CameraModal modalVisibleState={cameraModalVisibleState} setModalVisibleState={setCameraModalVisibleState} setUserState={setUserState} userState={userState}/>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userState.photo }} style={styles.photo} />
          <Button
            color='#24d36fff'
            title="Change photo" 
            onPress={() => setCameraModalVisibleState(true)}
            style={styles.commentButton}
          ></Button>
          <Text style={styles.username}>
            {userState.name}
          </Text>
          <Text>
            User since {userState.date_created && (new Date(userState.date_created)).toUTCString()}
          </Text>
          <Text style={styles.bio}>
            {userState.bio}
          </Text>
          <Button
            color='#24d36fff'
            title="Edit bio" 
            onPress={() => setModalVisibleState(true)}
            style={styles.commentButton}
          ></Button>
          {(userState.receivedRequests !== undefined) && (userState.receivedRequests.length !== 0)
          ?
          <FriendsBoxActionable title="Friend requests" deny denyAction={requestDELETE} buttonTitle="Accept" action={acceptRequestPOST} user={{...userState, friends: userState.receivedRequests || [] }} isPastInitialRender={isPastInitialRender} navigation={props.navigation} />
          : <View />}
          <FriendsBoxActionable title="Friends" buttonTitle="Remove" action={friendDELETE} user={{...userState, friends: userState.friends || [] }} isPastInitialRender={isPastInitialRender} navigation={props.navigation} />
          <Text style={styles.hikesTitle}>
              Favorite Hikes
          </Text>
          <FavoriteHikesActionable action={favoriteHikeDELETE} userState={userState} navigation={props.navigation} />
          <Text style={styles.hikesTitle}>
              Favorite Stumps
          </Text>
          <FavoriteStumpsActionable action={favoriteStumpDELETE} userState={userState} navigation={props.navigation} />
          <CommentsBox isPastInitialRender={isPastInitialRender} hike={{...userState, comments: userState.profileComments || [] }} navigation={props.navigation} setModalVisibleState={setCommentsModalVisibleState} screen={{ type: 'profile', _id: userState._id}} replyData={replyData} setReplyData={setReplyData} setReplyModalVisibleState={setReplyModalVisibleState} replyModalVisibleState={replyModalVisibleState} />
          <Button
            color='#24d36fff'
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
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

// Stylesheet migrated to constants directory

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   profileContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   photo: {
//     marginTop: 30,
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//   },
//   username: {
//     fontSize: 30,
//     marginTop: 10,
//     textAlign: 'center'
//   },
//   bio: {
//     padding: 20,
//     fontSize: 20,
//     marginTop: 20,
//     textAlign: 'center'
//   },
//   clickedProfileContentContainer: {
//     paddingTop: 30,
//   },
//   codeHighlightText: {
//     color: 'rgba(96,100,109, 0.8)',
//   },
//   codeHighlightContainer: {
//     backgroundColor: 'rgba(0,0,0,0.05)',
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { width: 0, height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   hikesContainer: {
//     padding: 20,
//     paddingTop: 0,
//     paddingBottom: 0,
//     margin: 20,
//     borderColor: 'green',
//     borderWidth: 0.5,
//     borderRadius: 5,
//   },
//   hikesTitle: {
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 20,
//   },
//   hikesContainer: {
//     width: '100%',
//     maxHeight: 300,
//     padding: 20,
//     paddingTop: 0,
//     paddingBottom: 0,
//     margin: 20,
//     borderColor: 'green',
//     borderWidth: 0.5,
//     borderRadius: 5,
//   },
//   hikeContainer: {
//     flex: 1,
//     marginBottom: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
// },
//   hikeTag: {
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     position: 'absolute',
//     bottom: 20,
//     width: '100%',
//     paddingTop: 5,
//     paddingBottom: 5,
//   },
//   section: {
//     color: 'whitesmoke',
//     textAlign: 'center',
//   },
//   title: {
//     color: 'whitesmoke',
//     textShadowColor: 'rgba(255, 255, 255, 1)',
//     textShadowOffset: {width: 0, height: 0},
//     textShadowRadius: 10,
//     fontSize: 30,
//     textAlign: 'center',
//   },
//   commentsContainer: {
//     padding: 20,
//     paddingTop: 0,
//     paddingBottom: 0,
//     margin: 20,
//     borderColor: 'black',
//     borderWidth: 0.5,
//     borderRadius: 5,
//   },
//   comment: {
//     padding: 5,
//     borderColor: 'black',
//     borderWidth: 0.5,
//     borderRadius: 3,
//   },
//   commentHeader: {
//     padding: 2,
//     borderBottomColor: 'black',
//     borderBottomWidth: 0.5,
//   },
//   commentBody: {
//     padding: 2,
//   },
//   commentsTitle: {
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 20,
//   },
//   commentButton: {
//     margin: 20,
//   },
// });

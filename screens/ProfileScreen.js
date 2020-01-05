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
    fetch(`https://stump-around.herokuapp.com/user/secure`, {
        method: 'POST',
        headers: {
          'x-access-token': token,
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
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

  return (
    <View style={styles.container}>
      <BioModal modalVisibleState={modalVisibleState} setModalVisibleState={setModalVisibleState} setEditBioState={setEditBioState} editBioState={editBioState} bioPUT={bioPUT} userState={userState} _updateUser={_updateUser} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          {/* <Image source={{ uri: "https://image.businessinsider.com/5a8c83d342e1cc57810ba9ee?width=1100&format=jpeg&auto=webp"}} style={styles.photo} /> */}
          <Image source={{ uri: userState.photo }} style={styles.photo} />
          <Button 
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
            title="Edit bio" 
            onPress={() => setModalVisibleState(true)}
            style={styles.commentButton}
          ></Button>
          <Text style={styles.hikesTitle}>
              Favorite Hikes
          </Text>
          <FavoriteHikes userState={userState} navigation={props.navigation} />
          <View style={styles.commentsContainer}>
              <Text style={styles.commentsTitle}>
                Comments
              </Text>
              <View style={styles.comment}>
                <View style={styles.commentHeader}>
                  <Text>
                    [comment header]
                  </Text>
                </View>
                <View style={styles.commentBody}>
                  <Text>
                    [comment body]
                  </Text>
                </View>
              </View>
              <Button 
                title="New Comment" 
                onPress={() => alert('pressed')}
                style={styles.commentButton}
              ></Button>
          </View>
          <Button
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
//   contentContainer: {
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
//   hikesTitle: {
//     textAlign: 'center',
//     padding: 10,
//     fontSize: 20,
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

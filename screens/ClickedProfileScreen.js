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

import { MonoText } from '../components/StyledText';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function ClickedProfileScreen(props) {

  const [usernameState, setUsernameState] = useState('');
  const [userState, setUserState] = useState(props.navigation.getParam('user',{}));
  const isPastInitialRender = useRef(false);

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
    if (isPastInitialRender.current === true) {
      _updateUser();
    }
    isPastInitialRender.current = true;
  }, [userState]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
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
          <View style={styles.hikesContainer}>
              <Text style={styles.hikesTitle}>
                Favorite Hikes
              </Text>
              <View style={styles.hike}>

              </View>
          </View>
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
        </View>
      </ScrollView>
    </View>
  );
}

ClickedProfileScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    marginTop: 30,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  username: {
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center'
  },
  bio: {
    padding: 20,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 30,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  hikesContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 20,
    borderColor: 'green',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  hikesTitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  hike: {

  },
  commentsContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 20,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
  },
  comment: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  commentHeader: {
    padding: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  commentBody: {
    padding: 2,
  },
  commentsTitle: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  },
  commentButton: {
    margin: 20,
  },
});

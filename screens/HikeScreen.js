import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Text,
  Button,
  TextInput,
  Modal,
} from 'react-native';

import { MonoText } from '../components/StyledText';


export default function HikeScreen(props) {

    // props to be passed in:
    // name
    // photo
    // length
    // summary
    // comments
    // ****eventually location?

    const [hike, setHike] = useState(props.navigation.getParam('hike',{}));
    const [modalVisibleState, setModalVisibleState] = useState(false);
    const [commentState, setCommentState] = useState('');
    const isPastInitialRender = useRef(false);


    const addHikeToFavorites = async (hikeId) => {
      const userId = await AsyncStorage.getItem('id');
      console.log('here', hikeId, 'there', userId);
      fetch(`https://stump-around.herokuapp.com/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ hikeId, hikeId: userId }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          setHike(responseJson);
          console.log('res', responseJson);
          alert('Added to favorites');
        }
      )
      .catch((error) => {
        console.error(error);
        alert('Add failed');
      });
    }


    useEffect(() => _updateHike(), []);

    const commentPOST = async (data) => {
      const userId = await AsyncStorage.getItem('id');
      const newData = { ...data, user: userId };
      console.log(newData);
      fetch(`https://stump-around.herokuapp.com/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(newData),
        })
        .then((response) => response.json())
        .then((responseJson) => console.log(responseJson))
        .catch((error) => {
          console.error(error);
        });
    };

    const _updateHike = () => {
      isPastInitialRender.current = true;
      console.log('id', hike._id);
      fetch(`https://stump-around.herokuapp.com/hike/${hike._id}`, {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setHike(responseJson);
            console.log('res', responseJson);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <View style={styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibleState}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <TouchableOpacity activeOpacity={1} style={{marginTop: 22, height: "100%", backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                    setModalVisibleState(false);
                  }}>
              <View style={{backgroundColor: 'white', borderRadius: 5, padding: 20, width: '90%', margin: 20}}>
                <Text style={{textAlign: 'center'}}>Comment:</Text>
                <TextInput
                  style={{
                    padding: 10,
                    marginTop: 20,
                    textAlign: 'center',
                  }}
                  onChangeText={comment => setCommentState(comment)}
                  value={commentState}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <Button
                    title="Post"
                    onPress={() => {
                      commentPOST({ content: commentState, hike: hike._id })
                      .then(() => _updateHike());
                      setModalVisibleState(!modalVisibleState);
                    }}></Button>
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setModalVisibleState(!modalVisibleState);
                    }}>
                  </Button>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>

            <ScrollView
            keyboardShouldPersistTaps='never'
            style={styles.body}
            contentContainerStyle={styles.contentContainer}>
                {/* eventually source will be props.photo */}
                <Image source={{ uri: hike.photo }} style={{width: '100%', height: 300, resizeMode: 'cover'}} />
                <Text style={styles.hikeTitle}>
                    {hike.name}
                </Text>
                <Text style={styles.section}>
                    Length: {hike.length}
                </Text>
                <Button title="Add to favorites" onPress={() => {addHikeToFavorites(hike._id)}} color="blue" />
                <Text style={styles.summary}>
                    {hike.summary}
                </Text>
                <View style={styles.commentsContainer}>
                  <Text style={styles.commentsTitle}>
                    Comments
                  </Text>
                  {!isPastInitialRender.current ? <View /> : hike.comments.slice().reverse().map((element, i) => {
                    return (
                      <View style={styles.comment} key={i}>
                        <View style={styles.commentHeader}>
                          <Image source={{ uri: element.user.photo }} style={styles.photo} />
                          <View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('ClickedProfile', { user: element.user })}>
                              <Text style={styles.userLink}>
                                {element.user.name}
                              </Text>
                            </TouchableOpacity>
                            <Text style={styles.commentDate}>
                              {element.date_created}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.commentBody}>
                          <Text>
                            {element.content}
                          </Text>
                        </View>
                      </View>
                    )
                  })}
                  <Button 
                    title="New Comment" 
                    onPress={() => setModalVisibleState(true)}
                    style={styles.commentButton}
                  ></Button>
                </View>
            </ScrollView>
        </View>
    );
}

HikeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 20,
    justifyContent: 'space-between'
  },
  hikeTitle: {
    padding: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  section: {
    textAlign: 'center',
  },
  summary: {
      marginRight: '15%',
      marginLeft: '15%',
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
    flexDirection: 'row',
    alignItems: 'center',
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
  photo: {
    marginRight: 5,
    marginBottom: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userLink: {
    color: 'green',
  },
  commentButton: {
    margin: 20,
  },
  commentDate: {
    fontSize: 10,
  }
});

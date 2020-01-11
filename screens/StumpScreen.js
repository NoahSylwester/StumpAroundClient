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
import styles from '../constants/MainStyles';
import CommentsBox from '../components/CommentsBox';
import CommentModal from '../components/CommentModal';
import { NavigationActions } from 'react-navigation';
import Map from '../components/Map';


export default function StumpScreen(props) {

    // props to be passed in:
    // name
    // photo
    // length
    // summary
    // comments
    // ****eventually location?

    const [stump, setStump] = useState(props.navigation.getParam('stump',{}));
    const [modalVisibleState, setModalVisibleState] = useState(false);
    const [commentState, setCommentState] = useState('');
    const isPastInitialRender = useRef(false);
    const [ProfileKey, setProfileKey] = useState('');

    // useEffect(() => {
    //       console.log('***');
    //       console.log(ProfileKey);
    //       console.log('***');
    //       const setParamsAction = NavigationActions.setParams({
    //         params: { value: Math.random() },
    //         key: ProfileKey,
    //       });
    //       props.navigation.dispatch(setParamsAction);
    // }, [ProfileKey])

    // const _retrieveKey = async () => {
    //   try {
    //     const key = await AsyncStorage.getItem('ProfileKey');
    //     if (key !== null) {
    //       setProfileKey(key);
    //       return;
    //     }
    //     else {
    //       console.log('No async storage for "ProfileKey"');
    //     }
    //   } catch (error) {
    //     // Error retrieving data
    //     console.log(error);
    //   }
    // };

    // const addHikeToFavorites = async (hikeId) => {
    //   const userId = await AsyncStorage.getItem('id');
    //   fetch(`https://stump-around.herokuapp.com/favorite`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: JSON.stringify({ hikeId, userId }),
    //   })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //       // setHike(responseJson);
    //       console.log('res2', responseJson);
    //       alert('Added to favorites');
    //       _retrieveKey();
    //     }
    //   )
    //   .catch((error) => {
    //     console.error(error);
    //     alert('Add failed');
    //   });
    // }


    useEffect(() => {_updateStump();}, []);

    const commentPOST = async (data) => {
      const userId = await AsyncStorage.getItem('id');
      const newData = { ...data, user: userId };
      // console.log(newData);
      fetch(`https://stump-around.herokuapp.com/stumpComment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(newData),
        })
        .then((response) => {
          console.log(response);
          return response.json()
        }
        )
        .then((responseJson) => console.log(responseJson))
        .catch((error) => {
          console.error(error);
        });
    };

    const _updateStump = () => {
      isPastInitialRender.current = true;
      // console.log('id', hike._id);
      fetch(`https://stump-around.herokuapp.com/stump/${stump._id}`, {
          method: 'GET',
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setStump(responseJson);
            // console.log('res1', responseJson);
          }
        )
        .catch((error) => {
          console.error(error);
        });
    }

    return (
        <View style={styles.container}>
          <CommentModal setModalVisibleState={setModalVisibleState} modalVisibleState={modalVisibleState} setCommentState={setCommentState} commentState={commentState} commentPOST={commentPOST} _updateHike={_updateStump} hike={stump} />

            <ScrollView
            keyboardShouldPersistTaps='never'
            style={styles.hikePageBody}
            contentContainerStyle={styles.hikePageContentContainer}
            >
                {/* eventually source will be props.photo */}
                <Image source={{ uri: stump.photo }} style={{width: '100%', height: 300, resizeMode: 'cover'}} />
                <Text style={styles.hikeTitle}>
                    {stump.name}
                </Text>
                {/* <Button color="#00B100" title="Add to favorites" onPress={() => {addHikeToFavorites(stump._id)}} /> */}
                <Text style={styles.summary}>
                    {stump.summary}
                </Text>
                <CommentsBox isPastInitialRender={isPastInitialRender} hike={stump} navigation={props.navigation} setModalVisibleState={setModalVisibleState} />
                <Map name={stump.name} summary={stump.summary} latitude={stump.latitude} longitude={stump.longitude} />
            </ScrollView>
        </View>
    );
}

StumpScreen.navigationOptions = {
  header: null,
};

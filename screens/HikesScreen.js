import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
import styles from '../constants/MainStyles';

import { MonoText } from '../components/StyledText';


export default function HikesScreen(props) {

    // props to be passed in:
    // props.hikes, array of objects each with the following:
    // name
    // photo
    // length
    // summary
    // comments
    // ****eventually location?

    const [dataState, setDataState] = useState({
        hikes: [],
      })

    useEffect(() => {
      fetch('https://stump-around.herokuapp.com/hikes', {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataState({
          hikes: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }, [])
    

    return (
                <View style={styles.container}>
                    <ScrollView
                        keyboardShouldPersistTaps='never'
                        style={styles.hikePageBody}
                        contentContainerStyle={styles.contentContainer}>
                        <Text style={styles.pageTitle}>
                          Hikes
                        </Text>
                        {dataState.hikes.map((hike, i) => (
                            <View style={styles.hikeContainer} key={i}>
                                <Image source={{uri: hike.photo}} style={{ width: '100%', height: 200 }} />
                                <View style={styles.hikeTag}>
                                  <TouchableOpacity onPress={() => props.navigation.navigate('Hike', { hike: hike })}>
                                    <Text style={styles.title}>
                                      {hike.name}
                                    </Text>
                                  </TouchableOpacity>
                                  <Text style={styles.section}>
                                      Length: {hike.length}
                                  </Text>
                                  <Text style={styles.section}>
                                      {hike.location}
                                  </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
    )
}

HikesScreen.navigationOptions = {
  header: null,
};

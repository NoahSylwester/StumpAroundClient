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


export default function StumpsScreen(props) {


    const [dataState, setDataState] = useState({
        stumps: [],
      })

    useEffect(() => {
      fetch('https://stump-around.herokuapp.com/stumps', {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataState({
          stumps: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }, [])
    

    return (
              <View style={styles.container}>
                  <Text style={styles.stumpsPageTitle}>
                        Stumps
                  </Text>
                  <Button 
                    title="Submit a Stump"
                    onPress={() => props.navigation.navigate('Submit')}
                    style={styles.stumpsButton}
                    color='#00B100'
                  />
                  <ScrollView
                      keyboardShouldPersistTaps='never'
                      style={styles.hikePageBody}
                      contentContainerStyle={styles.hikesPageContentContainer}>
                      {/* <Text style={styles.pageTitle}>
                        Stumps
                      </Text> */}
                      {dataState.stumps.map((stump, i) => (
                          <View style={styles.hikeContainer} key={i}>
                              <Image source={{uri: stump.photo}} style={{ width: '100%', height: 200 }} />
                              <View style={styles.hikeTag}>
                                <TouchableOpacity onPress={() => props.navigation.push('Stump', { stump: stump })}>
                                  <Text style={styles.title}>
                                    {stump.name}
                                  </Text>
                                </TouchableOpacity>

                                <Text style={styles.section}>
                                    {stump.location}
                                </Text>
                              </View>
                          </View>
                      ))}
                  </ScrollView>
              </View>
    )
}

StumpsScreen.navigationOptions = {
  header: null,
};

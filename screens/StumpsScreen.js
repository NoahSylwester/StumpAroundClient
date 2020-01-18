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
import StumpsSearchModal from '../components/StumpsSearchModal';

import { MonoText } from '../components/StyledText';


export default function StumpsScreen(props) {


    const [dataState, setDataState] = useState({
        stumps: [],
      })
    const [modalVisibleState, setModalVisibleState] = useState(false);
    const [searchTermState, setSearchTermState] = useState('');
    const [fieldState, setFieldState] = useState('name');
    const [sortState, setSortState] = useState({ 
        field: 'name',
        order: 'ascending',
      });

      const stumpsGET = async () => {
        const response = await fetch(`https://stump-around.herokuapp.com/stumps/${fieldState}/${searchTermState}`, {
          method: 'GET',
        })
        const responseJson = await response.json();
        if (sortState.field === 'name') {
          responseJson.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              if (sortState.order === 'ascending') {
                return -1;
              }
              else if (sortState.order === 'descending') {
                return 1;
              }
            }
            if (nameA > nameB) {
              if (sortState.order === 'ascending') {
                return 1;
              }
              else if (sortState.order === 'descending') {
                return -1;
              }
            }
          
            // names must be equal
            return 0;
          });
        }
        else if (sortState.field === 'location') {
          responseJson.sort(function(a, b) {
            var nameA = a.location.toUpperCase(); // ignore upper and lowercase
            var nameB = b.location.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              if (sortState.order === 'ascending') {
                return -1;
              }
              else if (sortState.order === 'descending') {
                return 1;
              }
            }
            if (nameA > nameB) {
              if (sortState.order === 'ascending') {
                return 1;
              }
              else if (sortState.order === 'descending') {
                return -1;
              }
            }
          
            // names must be equal
            return 0;
          });
        }
        setModalVisibleState(false);
        setDataState({
          stumps: responseJson
        });
      }

    const randomGET = () => {
      fetch('https://stump-around.herokuapp.com/stumps/random', {
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
    }

    useEffect(() => {
      randomGET();
    }, [])
    

    return (
              <View style={styles.container}>
                  <StumpsSearchModal randomGET={randomGET} modalVisibleState={modalVisibleState} setModalVisibleState={setModalVisibleState} searchTermState={searchTermState} setSearchTermState={setSearchTermState} fieldState={fieldState} setFieldState={setFieldState} sortState={sortState} setSortState={setSortState} stumpsGET={stumpsGET} />
                  <Text style={styles.stumpsPageTitle}>
                        Stumps
                  </Text>
                  <Button 
                    title="Search Stumps"
                    onPress={() => setModalVisibleState(true)}
                    style={styles.stumpsButton}
                    color='#24d36fff'
                  />
                  <Button 
                    title="Submit a Stump"
                    onPress={() => props.navigation.navigate('Submit')}
                    style={styles.stumpsButton}
                    color='#24d36fff'
                  />
                  <ScrollView
                      keyboardShouldPersistTaps='never'
                      style={styles.hikePageBody}
                      contentContainerStyle={styles.hikesPageContentContainer}>
                      {/* <Text style={styles.pageTitle}>
                        Stumps
                      </Text> */}
                      {dataState.stumps.map((stump, i) => (
                          <View style={styles.hikeContainer} key={stump._id + i}>
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

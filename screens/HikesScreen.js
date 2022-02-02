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
import HikesSearchModal from '../components/HikesSearchModal';

import { MonoText } from '../components/StyledText';


/* 
This is the screen that renders the gallery of hikes.
*/


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
    const [modalVisibleState, setModalVisibleState] = useState(false);
    const [searchTermState, setSearchTermState] = useState('');
    const [fieldState, setFieldState] = useState('name');
    const [sortState, setSortState] = useState({ 
      field: 'name',
      order: 'ascending',
     });


    // get the gallery of hikes, handle searching
    const hikesGET = async () => {
      const response = await fetch(`https://stump-around.herokuapp.com/hikes/${fieldState}/${searchTermState}`, {
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
      else if (sortState.field === 'length') {
        responseJson.sort(function (a, b) {
          if (sortState.order === 'ascending') {
            return parseFloat(a.length) - parseFloat(b.length);
          }
          else if (sortState.order === 'descending') {
            return parseFloat(b.length) - parseFloat(a.length);
          }
        });
      }
      setModalVisibleState(false);
      setDataState({
        hikes: responseJson
      });
    }


    // get a random sample of 10 from hikes database
    const randomGET = () => {
      fetch('https://stump-around.herokuapp.com/hikes/random', {
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
    }

    useEffect(() => {
      randomGET()
    }, [])
    

    return (
                <View style={styles.hikesPage}>
                    <HikesSearchModal randomGET={randomGET} modalVisibleState={modalVisibleState} setModalVisibleState={setModalVisibleState} searchTermState={searchTermState} setSearchTermState={setSearchTermState} fieldState={fieldState} setFieldState={setFieldState} sortState={sortState} setSortState={setSortState} hikesGET={hikesGET} />
                    <Text style={styles.hikesPageTitle}>
                          Hikes
                    </Text>
                    <Button
                      title="Search Hikes"
                      onPress={() => setModalVisibleState(true)}
                      style={styles.stumpsButton}
                      color='#24d36fff'
                    />
                    <ScrollView
                        keyboardShouldPersistTaps='never'
                        style={styles.hikePageBody}
                        contentContainerStyle={styles.hikesPageContentContainer}>
                        {dataState.hikes.map((hike, i) => ( !hike ? <View key={i}/> :
                            <View style={styles.hikeContainer} key={hike._id + i}>
                                <Image source={{uri: hike && hike.photo}} style={{ width: '100%', height: 200 }} />
                                <View style={styles.hikeTag}>
                                  <TouchableOpacity onPress={() => props.navigation.push('Hike', { hike: hike })}>
                                    <Text style={styles.title}>
                                      {hike.name}
                                    </Text>
                                  </TouchableOpacity>
                                  <Text style={styles.section}>
                                      Length: {hike.length} mi
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

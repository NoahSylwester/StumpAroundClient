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
        method: 'GEt',
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
    }, [dataState])
    
    // dummy props object for testing
    const dummyProps = {
        hikes: [
            {
                name: 'first',
                photo: '',
                length: 5,
            },
            {
                name: 'second',
                photo: '',
                length: 5,
            },
            {
                name: 'third',
                photo: '',
                length: 5,
            },
            {
              name: 'third',
              photo: '',
              length: 5,
          },
          {
            name: 'third',
            photo: '',
            length: 5,
        },
        {
          name: 'third',
          photo: '',
          length: 5,
      },
      {
        name: 'third',
        photo: '',
        length: 5,
    },
    {
      name: 'third',
      photo: '',
      length: 5,
  },
  {
    name: 'third',
    photo: '',
    length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
{
  name: 'third',
  photo: '',
  length: 5,
},
        ]
    }

    return (
                <View style={styles.container}>
                    <ScrollView
                        keyboardShouldPersistTaps='never'
                        style={styles.body}
                        contentContainerStyle={styles.contentContainer}>
                        <Text style={styles.pageTitle}>
                          Hikes
                        </Text>
                        {dataState.hikes.map((hike, i) => (
                            <View style={styles.hikeContainer} key={i}>
                                <Image source={{uri: hike.photo}} style={{ width: '100%', height: 200 }} />
                                <View style={styles.hikeTag}>
                                  <Text style={styles.title}>
                                      {hike.name}
                                  </Text>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hikeContainer: {
    height: 300,
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
  hikeContainer: {
      flex: 1,
      marginBottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
  },
  hikeTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
  },
  pageTitle: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 50,
    textAlign: 'center',
  },
  title: {
    color: 'whitesmoke',
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  section: {
    color: 'whitesmoke',
    textAlign: 'center',
  },
  summary: {
      marginRight: '15%',
      marginLeft: '15%',
  },
  comments: {
    textAlign: 'center',
}
});

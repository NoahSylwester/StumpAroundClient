import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  Button
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

    const [textState, setTextState] = useState({
        text: '',
      })
    
    const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque sed eros eu gravida. In sit amet tortor dapibus, blandit arcu id, fringilla arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin consectetur rutrum leo sit amet semper. Mauris lobortis libero et ante sagittis, ac efficitur magna commodo. Aliquam neque lorem, convallis quis accumsan ut, commodo ac neque. Cras ut elit ut nibh tempus elementum et eget urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ex, iaculis ac iaculis id, cursus non purus. Vivamus eu dapibus elit. Aenean porta quam at scelerisque finibus. Nam in nunc at leo fermentum aliquet. Phasellus congue arcu quis tellus condimentum, sagittis pharetra diam luctus. Ut iaculis ultricies tellus sed ultrices. Morbi ac scelerisque ex.';

    return (
        <View style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps='never'
            style={styles.body}
            contentContainerStyle={styles.contentContainer}>
                {/* eventually source will be props.photo */}
                <Image source={require('../assets/images/katie-moum-GsVvcyoX6VY-unsplash.jpg')} style={{width: '100%', height: '50%'}} />
                <Text style={styles.title}>
                    NAME OF HIKE {props.name}
                </Text>
                <Text style={styles.section}>
                    Length: {props.length}
                </Text>
                <Button title="Add to favorites" onPress={() => alert('pressed')} color="blue" />
                <Text style={styles.summary}>
                    {dummyText} {props.summary}
                </Text>
                <View>
                    <Text style={styles.comments}>
                        [comments]
                    </Text>
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
  title: {
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
  comments: {
    textAlign: 'center',
}
});

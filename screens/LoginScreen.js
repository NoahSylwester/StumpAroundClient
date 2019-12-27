import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  ImageBackground,
  Platform,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage,
} from 'react-native';
import styles from '../constants/AuthStyles';


export default function LoginScreen(props) {

    const [textState, setTextState] = useState({
        username: '',
        password: '',
      });

    const signUpButton = (
        <Text onPress={() => props.navigation.navigate("SignUp")} style={{ color: '#009933', textShadowColor: 'black', textShadowRadius: 5, textShadowOffset: { width: 0, height: 0 } }}>
            Sign up
        </Text>
    );

    const _storeData = async (username) => {
      try {
        await AsyncStorage.setItem('username', username);
      } catch (error) {
        console.log(error);
        // Error saving data
      }
    };

    const signIn = (username) => {
      _storeData(username);
      props.navigation.navigate("Main")
    }

    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={require('../assets/images/katie-moum-GsVvcyoX6VY-unsplash.jpg')}>
            <ScrollView
            keyboardShouldPersistTaps='never'
            // style={styles.container}
            contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>
                    StumpAround
                </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={username => setTextState({...textState, username})}
                    placeholder={'Username'}
                    value={textState.username}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={password => setTextState({...textState, password})}
                    placeholder={'Password'}
                    value={textState.password}
                />
                <Button title="Sign in" onPress={() => signIn(textState.username)} color="#009933" />
                <Text style={styles.bottomText}>
                    Don't have an account? {signUpButton}
                </Text>
            </ScrollView>
        </ImageBackground>
    );
}

LoginScreen.navigationOptions = {
  header: null,
};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   body: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     paddingTop: 230,
//   },
//   appTitle: {
//     fontSize: 30,
//     textAlign: 'center',
//   },
// });

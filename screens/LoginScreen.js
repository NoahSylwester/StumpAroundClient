import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  ImageBackground,
  Platform,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  AsyncStorage,
  Alert,
} from 'react-native';
import Loading from '../components/Loading';
import styles from '../constants/AuthStyles';


/* 
This is the login screen for accepting user credentials.
Separate from the SignUpScreen.js, which handles new user data.
*/


export default function LoginScreen(props) {

    const [textState, setTextState] = useState({
        username: '',
        email: '',
        password: '',
      });

    const [loading, setLoading] = useState(false);


    // mini component for rendering signup button
    const signUpButton = (
        <Text onPress={() => props.navigation.navigate("SignUp")} style={{ color: '#24d36fff', textShadowColor: 'black', textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } }}>
            Sign up
        </Text>
    );

    // mini component for rendering signin button
    const signInButton = (
      <TouchableOpacity onPress={() => signIn()}>
        <Text style={{ padding: 10, fontSize: 18, color: '#24d36fff', textShadowColor: 'black', textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } }}>
          Sign in
        </Text>
      </TouchableOpacity>
  );

    const _storeData = async (username, email, token, id) => {
      try {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('username', username);
      } catch (error) {
        console.log(error);
        // Error saving data
      }
    };

    // handle signIn click
    const signIn = () => {
      setLoading(true);
      let username = textState.username;
      let email = textState.email;
      let password = textState.password;
      if (username === '') {
        username = "Bigfoot";
      }
      if (email === '') {
        email = "Basketball@nba.com";
      }
        fetch(`http://stump-around.herokuapp.com/api/authenticate`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error !== undefined) {
            Alert.alert('Error logging in', responseJson.error,
            [
              {text: 'Ok', onPress: () => setLoading(false)},
            ]);
          }
          else {
            _storeData(username, email, responseJson.token, responseJson.userId);
            setLoading(false);
            props.navigation.navigate("Main");
          }
        }
        )
        .catch((error) => {
            console.error(error);
            Alert.alert('Error logging in', "An error occurred. Try again later.",
            [
              {text: 'Ok', onPress: () => setLoading(false)},
            ]);
        });
    }

    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={require('../assets/images/katie-moum-GsVvcyoX6VY-unsplash.jpg')}>
        <Loading loading={loading} setLoading={setLoading} />
            <View
            keyboardShouldPersistTaps='never'
            style={styles.loginPageBody}
            >
              <View style={styles.formBox}>
                <Image source={require('../assets/images/stump.png')} style={styles.logo} />
                <Text style={styles.title}>
                    StumpAround
                </Text>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={email => setTextState({...textState, email})}
                    placeholder={'Email'}
                    value={textState.email}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={password => setTextState({...textState, password})}
                    placeholder={'Password'}
                    value={textState.password}
                />
                {signInButton}
                <Text style={styles.bottomText}>
                    Don't have an account? {signUpButton}
                </Text>
                </View>
            </View>
        </ImageBackground>
    );
}

LoginScreen.navigationOptions = {
  header: null,
};


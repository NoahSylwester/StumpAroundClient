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
} from 'react-native';
import styles from '../constants/AuthStyles';


export default function LoginScreen(props) {

    const [textState, setTextState] = useState({
        username: '',
        email: '',
        password: '',
      });

    const signUpButton = (
        <Text onPress={() => props.navigation.navigate("SignUp")} style={{ color: '#00B100', textShadowColor: 'black', textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } }}>
            Sign up
        </Text>
    );

    const signInButton = (
      <TouchableOpacity onPress={() => signIn()}>
        <Text style={{ padding: 10, fontSize: 18, color: '#00B100', textShadowColor: 'black', textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } }}>
          Sign in
        </Text>
      </TouchableOpacity>
      // <Button title="Sign in" onPress={() => signIn(textState.username)} color="#00B100" />
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

    const signIn = () => {
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
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error !== undefined) {
            alert(responseJson.error);
          }
          else {
            _storeData(username, email, responseJson.token, responseJson.userId);
            props.navigation.navigate("Main")
          }
        }
        )
        .catch((error) => {
            console.error(error);
            alert('Add failed');
        });
    }

    return (
      <ImageBackground style={{width: '100%', height: '100%'}} source={require('../assets/images/katie-moum-GsVvcyoX6VY-unsplash.jpg')}>
            <View
            keyboardShouldPersistTaps='never'
            style={styles.loginPageBody}
            // contentContainerStyle={styles.contentContainer}
            >
              <View style={styles.formBox}>
                <Image source={require('../assets/images/logoalt.png')} style={styles.logo} />
                <Text style={styles.title}>
                    StumpAround
                </Text>
                <TextInput
                    style={styles.textInput}
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
                {/* <Button title="Sign in" onPress={() => signIn(textState.username)} color="#00B100" /> */}
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

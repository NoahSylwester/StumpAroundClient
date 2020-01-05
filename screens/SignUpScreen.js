import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Button
} from 'react-native';

import { MonoText } from '../components/StyledText';
import styles from '../constants/AuthStyles';

export default function LoginScreen(props) {

    const [textState, setTextState] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
      })

    const [validateState, setValidateState] = useState({
        allFields: true,
        validEmail: true,
        confirmMatch: true,
    })

    const signUp = async () => {
        const { username, email, password, confirm } = textState;
        console.log(email.match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/g))
        if (username === '' || email === '' || password === '') {
            alert('All fields must be filled.');
            setValidateState({ ...validateState, allFields: false, })
            return;
        }
        else if (email.match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/g) === null) {
            alert('Please enter a valid email.')
            setValidateState({ ...validateState, validEmail: false, })
            return;
        }
        else if (password !== confirm) {
            alert('Passwords must match!')
            setValidateState({ ...validateState, confirmMatch: false, })
            return;
        }
        else {
            fetch(`https://stump-around.herokuapp.com/api/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ name: username, email, password }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                alert('Account created successfully');
                props.navigation.navigate("Login");
                }
            )
            .catch((error) => {
                console.error(error);
                alert('Add failed');
            });
        }
    }

    const signUpButton = (
        <TouchableOpacity>
            <Text onPress={() => signUp()} style={{ padding: 10, fontSize: 18, color: '#00B100', textShadowColor: 'black', textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } }}>
                Sign up
            </Text>
        </TouchableOpacity>
    )

    return (
      <ImageBackground source={require('../assets/images/katie-moum-GsVvcyoX6VY-unsplash.jpg')} style={{width: '100%', height: '100%'}}>
            <View
                keyboardShouldPersistTaps='never'
                style={styles.body}
            // contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.formBox}>
                <Image source={require('../assets/images/logoalt.png')} style={styles.logoSignUp} />
                    <Text style={styles.title}>
                        Sign up
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize='none'
                        id="username"
                        onChangeText={username => setTextState({ ...textState, username })}
                        placeholder={'Username'}
                        value={textState.username}
                    />
                    <TextInput
                        style={styles.textInput}
                        autoCapitalize='none'
                        id="email"
                        onChangeText={email => setTextState({ ...textState, email })}
                        placeholder={'Email'}
                        value={textState.email}
                    />
                    <TextInput
                        style={styles.textInput}
                        id="password"
                        secureTextEntry={true}
                        onChangeText={password => setTextState({ ...textState, password })}
                        placeholder={'Password'}
                        value={textState.password}
                    />
                    <TextInput
                        style={styles.textInput}
                        id="confirm"
                        secureTextEntry={true}
                        onChangeText={confirm => setTextState({ ...textState, confirm })}
                        placeholder={'Confirm password'}
                        value={textState.confirm}
                    />
                    {signUpButton}
                    {/* <Button title="Sign up" onPress={() => props.navigation.navigate("Login")} color="#00B100" /> */}
                </View>
            </View>
        </ImageBackground>
    );
}

LoginScreen.navigationOptions = {
  header: null,
};
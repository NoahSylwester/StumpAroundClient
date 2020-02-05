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
  Button,
  Alert,
} from 'react-native';
import Loading from '../components/Loading';

import { MonoText } from '../components/StyledText';
import styles from '../constants/AuthStyles';

export default function LoginScreen(props) {

    const [textState, setTextState] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
      })

    const [loading, setLoading] = useState(false);
      
    const [validateState, setValidateState] = useState({
        allFields: true,
        validEmail: true,
        confirmMatch: true,
    })

    const signUp = async () => {
        setLoading(true);
        const { username, email, password, confirm } = textState;
        console.log(email.match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/g))
        if (username === '' || email === '' || password === '') {
            Alert.alert('Error', 'All fields must be filled.',
            [
                {text: 'Ok', onPress: () => setLoading(false)},
            ]);
            setValidateState({ ...validateState, allFields: false, })
            return;
        }
        else if (email.match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/g) === null) {
            Alert.alert('Error', 'Please enter a valid email.',
            [
                {text: 'Ok', onPress: () => setLoading(false)},
            ]);
            setValidateState({ ...validateState, validEmail: false, })
            return;
        }
        else if (password !== confirm) {
            Alert.alert('Error', 'Passwords must match!',
            [
                {text: 'Ok', onPress: () => setLoading(false)},
            ]);
            setValidateState({ ...validateState, confirmMatch: false, })
            return;
        }
        else {
            fetch(`http://stump-around.herokuapp.com/api/register`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, email, password }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                Alert.alert('Success', 'Account created successfully!',
                [
                    {text: 'Ok', onPress: () => {
                        setLoading(false);
                        props.navigation.navigate("Login");
                    }
                    },
                ]);
                }
            )
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'Add failed. Try again later.',
                [
                    {text: 'Ok', onPress: () => setLoading(false)},
                ]);
            });
        }
    }

    const signUpButton = (
        <TouchableOpacity>
            <Text onPress={() => signUp()} style={{ padding: 10, fontSize: 18, color: '#24d36fff', textShadowColor: 'black', textShadowRadius: 8, textShadowOffset: { width: 0, height: 0 } }}>
                Sign up
            </Text>
        </TouchableOpacity>
    )

    return (
      <ImageBackground source={require('../assets/images/katie-moum-GsVvcyoX6VY-unsplash.jpg')} style={{width: '100%', height: '100%'}}>
          <Loading loading={loading} setLoading={setLoading} />
            <View
                keyboardShouldPersistTaps='never'
                style={styles.body}
            >
                <View style={styles.formBox}>
                <Image source={require('../assets/images/stump.png')} style={styles.logoSignUp} />
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
                </View>
            </View>
        </ImageBackground>
    );
}

LoginScreen.navigationOptions = {
  header: null,
};
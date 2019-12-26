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



export default function LoginScreen(props) {

    const [textState, setTextState] = useState({
        username: '',
        password: '',
      });

    const signUpButton = (
        <Text onPress={() => props.navigation.navigate("SignUp")} style={{ color: 'blue' }}>
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
        <View style={styles.container}>
            <ScrollView
            keyboardShouldPersistTaps='never'
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>
                    StumpAround
                </Text>
                <TextInput
                    style={{
                        padding: 10,
                        marginTop: 20,
                        textAlign: 'center',
                    }}
                    onChangeText={username => setTextState({...textState, username})}
                    placeholder={'Username'}
                    value={textState.username}
                />
                <TextInput
                    style={{
                        padding: 10,
                        margin: 10,
                        textAlign: 'center',
                    }}
                    secureTextEntry={true}
                    onChangeText={password => setTextState({...textState, password})}
                    placeholder={'Password'}
                    value={textState.password}
                />
                <Button title="Sign in" onPress={() => signIn(textState.username)} color="blue" />
                <Text style={{ 
                        fontSize: 8,
                        textAlign: 'center',
                        margin: 10,
                    }}>
                    Don't have an account? {signUpButton}
                </Text>
            </ScrollView>
        </View>
        </ImageBackground>
    );
}

LoginScreen.navigationOptions = {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 230,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loginPageBody: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    formBox: {
      height: '50%',
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    },
    logo: {
      position: 'absolute',
      top: -150,
      width: '50%',
      resizeMode: 'contain'
    },
    logoSignUp: {
      position: 'absolute',
      top: -180,
      width: '50%',
      resizeMode: 'contain'
    },
    body: {
      flex: 1,
      backgroundColor: 'rgba(255,255,255,0)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      // paddingTop: 230,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'whitesmoke',
      fontSize: 30,
      textAlign: 'center',
      textShadowColor: 'black',
      textShadowRadius: 7,
      textShadowOffset: { width: 0, height: 0 }
    },
    textInput: {
      width: '100%',
      borderRadius: 7,
      backgroundColor: 'rgba(255,255,255,1)',
      color: 'black',
      padding: 10,
      marginTop: 20,
      textAlign: 'center',
    },
    bottomText: {
      color: 'whitesmoke',
      padding: 10,
      textAlign: 'center',
    },
  });

  export default styles;
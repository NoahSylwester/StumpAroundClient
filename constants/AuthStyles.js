import { StyleSheet } from 'react-native';

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
      width: '50%',
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
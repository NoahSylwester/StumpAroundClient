import {
  Platform,
  StyleSheet,
} from 'react-native';

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
    hikePageBody: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pageTitle: {
      marginTop: 50,
      marginBottom: 50,
      fontSize: 50,
      textAlign: 'center',
    },
    hikesPageTitle: {
      marginTop: 60,
      marginBottom: 0,
      fontSize: 50,
      textAlign: 'center',
    },
    hikePageContentContainer: {
        paddingTop: 50,
        justifyContent: 'space-between'
    },
    hikesPageContentContainer: {
      justifyContent: 'space-between'
    },
    contentContainer: {
        paddingTop: 230,
    },
    appTitle: {
    fontSize: 30,
    textAlign: 'center',
    },
    profileContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photo: {
      marginTop: 30,
      width: 200,
      height: 200,
      // borderColor: "#001a13",
      // borderWidth: 2,
      borderRadius: 100,
    },
    username: {
        fontSize: 30,
        marginTop: 10,
        textAlign: 'center'
      },
    commentPhoto: {
        marginRight: 5,
        marginBottom: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    bio: {
      padding: 20,
      fontSize: 20,
      marginTop: 20,
      textAlign: 'center'
    },
    contentContainer: {
      paddingTop: 30,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    hikesContainer: {
      width: '100%',
      maxHeight: 300,
      padding: 20,
      paddingTop: 0,
      paddingBottom: 0,
      margin: 20,
      borderColor: 'black',
      borderWidth: 0.5,
      // borderRadius: 5,
    },
    hikeTitle: {
        padding: 10,
        fontSize: 30,
        textAlign: 'center',
    },
    hikeLength: {
        textAlign: 'center',
    },
    hikesTitle: {
      textAlign: 'center',
      padding: 10,
      fontSize: 20,
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
    section: {
      color: 'whitesmoke',
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
    summary: {
        marginRight: '15%',
        marginLeft: '15%',
    },
    commentsContainer: {
      width: '100%',
      padding: 20,
      paddingTop: 0,
      paddingBottom: 0,
      // borderColor: 'black',
      // borderWidth: 0.5,
      // borderRadius: 5,
    },
    commentContainer: {
      borderRadius: 3,
    },
    commentReplies: {
      marginLeft: 20,
    },
    comment: {
      marginTop: 4,
      padding: 5,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 3,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 2,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
    },
    commentBody: {
      padding: 5,
    },
    commentsTitle: {
      textAlign: 'center',
      padding: 10,
      fontSize: 20,
    },
    commentButton: {
      margin: 20,
    },
    commentDate: {
        fontSize: 10,
    },
    userLink: {
        fontSize: 16,
        color: '#00B100',
    },
    friendLink: {
      fontSize: 16,
      color: '#00B100',
  },
    friendsContainer: {
      width: '50%',
      maxHeight: 250,
      padding: 20,
      paddingTop: 0,
      paddingBottom: 0,
      margin: 20,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 5,
    },
    friend: {
      padding: 5,
      // borderColor: 'black',
      // borderWidth: 0.5,
      // borderRadius: 3,
    },
    friendHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 2,
    },
    friendPhoto: {
      marginRight: 5,
      marginBottom: 5,
      width: 60,
      height: 60,
      borderRadius: 30,
  },
  stumpsPageTitle: {
    marginTop: 60,
    marginBottom: 0,
    fontSize: 50,
    textAlign: 'center',
  },
  stumpsButton: {
    margin: 5,
  },
  submitPageContentContainer: {
    // paddingTop: 50,
    justifyContent: 'space-between'
  },
  renderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: '100%',
  },
  renderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  renderImage: {
    borderRadius: 3,
    // elevation: 2,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: '100%',
    height: 300,
    resizeMode: 'cover'
    },
    submitStumpButtonWrapper: {
      marginTop: 30,
    },
    tagContainer: {
      minHeight: 60,
      marginTop: 20,
      marginBottom: 10,
      padding: 10, 
      flexDirection: 'row', 
      justifyContent: 'center', 
      flexWrap: 'wrap' 
    },
    tagWrapper: { 
      textAlign: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      margin: 5,
      padding: 5,
      backgroundColor: "#00B100",
      // shadowColor: 'rgba(0,0,0,1)',
      // shadowOpacity: 0.2,
      // shadowOffset: {
      //   height: 0,
      //   width: 0,
      // },
      // shadowRadius: 5,
    },
    tagText: {
      color: 'white',
    },
  });
  
  export default styles;
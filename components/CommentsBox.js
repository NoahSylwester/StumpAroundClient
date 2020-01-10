import React, { useState, useEffect, useRef } from 'react';
import {
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    Text,
    Button,
    TextInput,
    Modal,
} from 'react-native';
import styles from '../constants/MainStyles';

export default function CommentsBox(props) {

    const commentGET = (comment) => {
        fetch(`https://stump-around.herokuapp.com/comment/${comment._id}`, {
            method: 'GET',
          })
          .then((response) => response.json())
          .then((responseJson) => {
              // setReplies(responseJson);
              // console.log('res1', responseJson);
            }
          )
          .catch((error) => {
            console.error(error);
          });
    }
    // console.log(props.hike);
    return (
        <View style={styles.commentsContainer}>
            <Text style={styles.commentsTitle}>
                Comments
            </Text>
            {props.isPastInitialRender.current ? props.hike.comments.slice().reverse().map((element, i) => {
                return (
                    <View style={styles.comment} key={i}>
                        <View style={styles.commentHeader}>
                            <Image source={{ uri: element.user.photo }} style={styles.commentPhoto} />
                            <View>
                                <TouchableOpacity onPress={() => props.navigation.navigate('ClickedProfile', { user: element.user })}>
                                    <Text style={styles.userLink}>
                                        {element.user.name}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.commentDate}>
                                    {element.date_created}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={commentGET} activeOpacity={1} style={styles.commentBody}>
                            <Text>
                                {element.content}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }) : <View />}
            <Button
                color='#00B100'
                title="New Comment"
                onPress={() => props.setModalVisibleState(true)}
                style={styles.commentButton}
            ></Button>
        </View>
    )
}